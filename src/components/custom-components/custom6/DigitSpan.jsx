
import { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text, Modal, Image, Dimensions, TouchableOpacity } from 'react-native';

import Tile from './Tile';


// export const gameRules = {
//   gridSize: 3,
//   tileDelay: 500,  // Time between tiles lighting up in sequence
//   sequenceDelay: 1250,  // Time between sequences
// };


/**
 * Returns a 1D array of Tiles (key, coordinates, active or not)
 * @param {Number} size Length/height of grid (i.e. 3x3, 4x4, etc.)
 * @returns 
 */
const initTiles = (size) => {
  const tiles = [];
  for ( let i = 0; i < size; i++) {
    for ( let j = 0; j < size; j++) {
      tiles.push( {
        key: i.toString(10) + j.toString(10),
        x: i,
        y: j,
        active: false,
      });
    }
  }
  return tiles;
};

/**
 * Builds a sequence of tiles
 * @param {Number} length Desired size of sequence
 * @param {Number} gridSize Size of digit span grid
 */
const buildSequence = (length, gridSize) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const sequence = [];

  // Unused tiles in the range [0, gridSize)-- we pick random tiles from here
  // to make the sequence as unique as possible
  const unusedTiles = [];
  for ( let i = 0; i < gridSize; i++ ) {
    unusedTiles.push(i);
  }
  
  // Build the sequence by adding (length) amount of tiles to it
  for ( let i = 0; i < length; i++ ) {
    if ( unusedTiles.length != 0 ) {
      // If there are still unused tiles, add a random one to the sequence 
      const nextTileIndex = getRandomInt(unusedTiles.length);
      const nextTile = unusedTiles[ nextTileIndex ];
      sequence.push(nextTile);
  
      // Tile got used, remove it from list of unused tiles
      unusedTiles.splice(nextTileIndex, 1);
    } else {
      // If there were no more unused tiles, just use any random tiles
      const nextTile = getRandomInt(gridSize);
      sequence.push(nextTile);
    }
  }

  return sequence;
}

/**
 * Play the current sequence as long as possible
 * @param {Array} sequence Sequence of tiles to play (represented by index in
 * tiles array)
 */
const playSequence = (sequence, tiles, tileDelay, setTiles) => {

  const activateTile = (sequenceTileIndex) => {
    // We can safely assume that the index is in range [0, sequence.length),
    // so no need to do index range checks
    const tileToPlayIndex = displaySequence[sequenceTileIndex];

    // The tile to play is the one in the sequence we will activate
    // But if it's the terminator, we make the key=-1 so that all tiles
    // get deactivated and the sequence ends
    const tileToPlay = tileToPlayIndex != -1 ? tiles[tileToPlayIndex] : {
      key: '-1',
    }; 
    
    // Since index is safe, we can also just activate the tile

    // Light up the target in the array of tiles and update state to trigger
    // rerender
    const newTiles = tiles.map( (tile) => {
      return tile.key == tileToPlay.key ? 
        {...tile, active: true,} :  // If target, activate it
        {...tile, active: false,};  // Otherwise, unactivate it/ensure it's unactivate
    });
    setTiles(newTiles);
  }
  
  // End the sequence with a *terminator* value:
  // Allows for the last actual tile to be activated and unactivated properly
  const displaySequence = [...sequence, -1];

  // console.log(sequence);

  // Using a Promise allows us to await/.then() to wait until the interval 
  // is done playing before moving on
  return new Promise ( (resolve) => { 
    let sequenceTileIndex = 0;

    // Activate the first tile; This is necessary so that it starts w/o delay
    activateTile(sequenceTileIndex);
    
    // Activate the rest of the tiles in the sequence (including terminator)
    const seqInterval = setInterval( () => {

      sequenceTileIndex++;
      activateTile(sequenceTileIndex);

      // If there are no more tiles to activate after this one, move on
      if (sequenceTileIndex + 1 >= displaySequence.length) {
        clearInterval(seqInterval);
        resolve();
      }
    }, tileDelay);
  });

}

/**
 * Given two sequences (arrays), check if they hold the same values
 * @param {Array} a 
 * @param {Array} b 
 * @returns Whether or not the arrays match
 */
const sequencesMatch = (a, b) => {
  if (a == null || b == null) {return false;}
  if (a.length != b.length) {return false;}

  for (let i = 0; i < a.length; i++) {
    if ( a[i] !== b[i] ) {
      return false;
    }
  }
  return true;
}

/**
 * Pause execution of statements for a specified amount of time, after the pause 
 * allow execution to start again
 * @param {Number} delay Delay in milliseconds (ms)
 */
const wait = async (delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  // Continue with other code here after the delay is over
};

/**
 * Returns a RoundInfo object used for analytics-- tracks relevant data points
 * for each round of the game
 * @returns An new RoundInfo object
 */
const initRoundInfo = () => {
  return {
    sequenceStart: null,
    sequenceEnd: null,
    
    sequence: null,
    userSequence: null,

    roundWin: null,
    backwards: null,
  }
}

/**
 * Give a sequence of tiles, return an array of those tiles' locations (in order)
 * @param {Array} sequence A sequence of indices to be used in tiles
 * @param {Array} tiles A collection of tiles used by the game
 */
const sequenceToLocations = (sequence, tiles) => {
  let ret = [];
  sequence.forEach((index) => {
    ret.push([tiles[index].x, tiles[index].y])
  })
  return ret;
}

function DigitSpan(props) {  
  // Level starts at level 2; May need to become state variable later in order
  // to indicate to users what level they are at 
  const level = useRef(2);
  const roundsLeft = useRef(2);  // How many rounds per level a user has left
  const userCanAdvance = useRef(false); // If a user has won at least once per level, they can advance to next level
  const {gridSize, tileDelay, sequenceDelay, onEnd} = props;

  const [backwards, setBackwards] = useState(false);
  const [modalOpen, setModalOpen ] = useState(false);
  const [gameAnim, setGameAnim] = useState(null);

  /*
    Tiles is an array of tiles that each have info on:
    - Coordinates (.x, .y) in the grid
    - Whether it's lit up or not (.active)
  */
  const [tiles, setTiles] = useState(initTiles(gridSize));
  const [sequence, setSequence] = useState(  // Current sequence to match to
    buildSequence(level.current, gridSize**2)
  );

  // TODO: Remove this; demo purposes only
  const [gameStarted, setGameStarted] = useState(false);
  
  const [userCanClick, setUserCanClick] = useState(false);
  const [userSequence, setUserSequence] = useState([]);
  
  // Data analytics :)
  const resultRef = useRef({
    gridSize: gridSize,
    roundInfoArray: [],  // Array of info for each round played (sequence, length, user sequence, etc.)
    clicks: [],  // Every click made by the user (time + location)
  });

  const currRoundInfo = useRef(initRoundInfo());

  useEffect( () => { 
    if (gameStarted) {  // Only run if the game has been started

      // Make sure user can't input while sequence plays
      setUserCanClick(false);

      wait(sequenceDelay).then( () => {

        currRoundInfo.current.sequenceStart = new Date().getTime();
        
        currRoundInfo.current.sequence = sequenceToLocations(sequence, tiles);;
        currRoundInfo.current.backwards = backwards;

        // Play the newly built sequence
        playSequence(sequence, tiles, tileDelay, setTiles).then( () => {
          
          currRoundInfo.current.sequenceEnd = new Date().getTime();
          // After the sequence is done, do some other stuff 
          // console.log("after sequence");
          
          // Stop game/sequence + allow for user input
          setUserCanClick(true);
          setGameStarted(false);
  
          // At this point, the user is allowed to input the sequence
        })
      })

    }     
  }, [gameStarted]);

  // Compare the user sequence to the actual sequence and returns a boolean
  // indicating if a new round should start or not + updates state accordingly
  // Also reports analytics details (user sequence, round win/loss, etc.)
  const handleRoundOutcome = (userSequence, actualSequence, backwardsFlag) => {
    const sequenceToCompare = !backwardsFlag ? 
      actualSequence :  // If not backwards sequence, just give the sequence
      [...actualSequence].reverse();  // Otherwise reverse it
    
    // If sequences match so far
    if (sequencesMatch(userSequence, sequenceToCompare.slice(0, userSequence.length))) {
      // If user sequence matches given sequence in its entirety
      if (sequencesMatch(userSequence, sequenceToCompare)) {

        // Report round results (analytics)
        currRoundInfo.current.roundWin = true;
        currRoundInfo.current.userSequence = sequenceToLocations(userSequence, tiles);
        resultRef.current.roundInfoArray.push(currRoundInfo.current);

        // User has succeeded this round, a new round should start
        // + that they can advance for this upcoming level
        roundsLeft.current -= 1;
        userCanAdvance.current = true;

        // Play the appropriate animation (and reset it for later)
        setGameAnim('success');
        setTimeout(() => {setGameAnim(null);}, sequenceDelay*.4);
    

        return true;
      }
      return false;  // If not a full match, new round shouldn't start
    } else {
      // Report round results
      currRoundInfo.current.roundWin = false;
      currRoundInfo.current.userSequence = sequenceToLocations(userSequence, tiles);
      resultRef.current.roundInfoArray.push(currRoundInfo.current);

      // User has lost this round, a new round should start
      roundsLeft.current -= 1;

      // Play the appropriate animation (and reset it for later)
      setGameAnim('error');
      setTimeout(() => {setGameAnim(null);}, sequenceDelay*.4);

      return true;
    }
  }

  // Resetting the necessary variables for the start of a new round
  const resetRoundState = () => {
    setSequence(buildSequence(level.current, gridSize**2));
    setUserSequence([]);
    setUserCanClick(false); 
    currRoundInfo.current = initRoundInfo();
    // setGameStarted(true);
  }

  // Resets all game variables to default-- this may not be necessary in final 
  // version; this just allows us to use the 'Start Game' button to reset the
  // game
  const gameOver = () => {
    setSequence(buildSequence(level.current, gridSize**2));
    setUserSequence([]);
    setUserCanClick(false);
    setGameStarted(false);
    console.log(resultRef.current); // final results
    onEnd(resultRef.current, true);
  }

  // When the level ends, allow them to advance to the next level (if they won
  // at least one round)
  // OR start the backwards sequence/ end the entire game (if they lost both)
  const handleLevelEnd = () => {
    if (userCanAdvance.current) {
      // User won at least 1 round this level, they can advance to next level 
      // console.log("User won at least once, new level");
      level.current += 1;

    } else {
      if (!backwards) {
        // User lost both rounds this level, they have to start the 
        // backwards sequence now (if they weren't on backwards sequence already)
        // console.log("Backwards sequence started");

        setModalOpen(true);
        // TODO: pause game when modal is up, when closed they continue game
        
        setBackwards(true);
        level.current = 2;  // Start from level 2 again
      } else {
        // If they were on backwards sequences and lost both rounds,
        // the entire game is over now
        // console.log("Game over");
        gameOver();  // Reset game state to default (just in case)
      }
    }

    // Reset state for the next level
    roundsLeft.current = 2;
    userCanAdvance.current = false;
  }
  
  // If the user can click, the tiles they have clicked so far (userSequence)
  // gets compared to the actual sequence.
  // If it matches/doesn't match, the sequences gets reset and no further input
  // is allowed
  const handleClick = (userTile) => {

    // Report the click for analytics
    resultRef.current.clicks.push({
      coordinates: [tiles[userTile].x, tiles[userTile].y],
      time: new Date().getTime(),
      allowedToClick: userCanClick,
    })

    if (userCanClick) {

      // Update user's sequence based on tile they clicked
      const newUserSequence = [...userSequence, userTile]; 
      setUserSequence(newUserSequence);
      // console.log(`user: ${newUserSequence}`);

      // Compare the user sequence to the actual one:
      //    - If full match, new round starts + user is allowed to advance level
      //    - If mistake, new round starts 
      let shouldResetRoundState = handleRoundOutcome(newUserSequence, sequence, 
        backwards);

      // Round should start automatically most of the time, except when the user
      // starts backwards sequence/gets a game over
      let shouldStartNewRoundAutomatically = shouldResetRoundState;

      // If they ran out of tries for this level, the level has ended
      if (roundsLeft.current == 0) {
        // If the game is fully over, make sure a new round can't start
        if (!userCanAdvance.current && backwards) shouldResetRoundState = false;
        
        // If the user cannot advance (i.e. backwards sequence/game over)
        // then this prevents the round from starting automatically
        shouldStartNewRoundAutomatically = userCanAdvance.current;
        
        /// When the level ends, allow them to advance to the next level 
        // (if they won at least one round)
        // Otherwise, start the backwards sequence/ end the entire game
        handleLevelEnd();
      }

      // If user input caused them to succeed/fail the round, a new round has
      // to start; Reset state for the new round
      // If level ending didn't cause backwards sequence/game over, start
      // the round automatically
      if (shouldResetRoundState) resetRoundState();
      if (shouldStartNewRoundAutomatically) setGameStarted(true);
    }
  }

  // Stuff for Styling / Formatting
  const renderRow = (rowTiles, rowIndex) => (
    <View style={styles.row} key={rowIndex}>
      {rowTiles.map((tile, columnIndex) => {
        const index = rowIndex * gridSize + columnIndex;
        return (
          <Tile
            active={tile.active}
            backwards={backwards}
            tile={index}
            gridSize={gridSize}
            handleClick={() => handleClick(index)}
            key={tile.key}
          >
            {tile.x}, {tile.y}, {index}
          </Tile>
        );
      })}
    </View>
  );

  const groupedTiles = tiles.reduce((acc, tile) => {
    const key = tile.x;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tile);
    return acc;
  }, {});

  const rows = Object.values(groupedTiles);

  return (
    <>
      <GameInfo>
          <Text style={styles.levelText}>Level</Text>
          <Text style={styles.levelNumberText}>{level.current}</Text>
      </GameInfo>

      <View style={[
          styles.container,
          gameAnim != null && styles.containerAnim(gameAnim),
        ] }>
        {rows.map(renderRow)}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setGameStarted(true)}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalOpen}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('@assets/images/BackwardsInstructions.jpg')} style={styles.modalImg} />
            <Button
              title='Ready to go?'
              onPress={() => {
                setModalOpen(false);
                setGameStarted(true);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}


const GameInfo = ({children}) => {
  return (
    <View style={[styles.gameInfo]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderStyle: 'solid',  // borderRadius doesn't work unless this is defined??
  },
  containerAnim: gameAnim => ({
    backgroundColor: gameAnim == 'success' ? '#6CBB3C' : "#E42217",
  }),
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gameInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    // paddingVertical: 16,
  },
  levelText: {
    fontSize: Dimensions.get('window').width*0.05,
  },
  levelNumberText: {
    fontSize: Dimensions.get('window').width*0.06,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#B6D0E2',
    padding: 10,
    borderRadius: 5,
  },
  startText: {
    fontSize: Dimensions.get('window').width*0.045,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 32,
    margin: 32,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImg: {
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').width*0.8,
    margin: 16,
  },
});

export default DigitSpan;
