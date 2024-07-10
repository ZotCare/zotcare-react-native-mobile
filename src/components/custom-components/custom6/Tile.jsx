import { TouchableOpacity, StyleSheet, Image, View, Dimensions } from "react-native";

const calcTileSize = (gridSize) => {
  return Math.ceil((Dimensions.get('window').height/(gridSize*2.5)));
}

const calcSpacing = (gridSize) => {
  return Math.ceil((Dimensions.get('window').width/(gridSize)));
}

function Tile({active, backwards, tile, gridSize, handleClick}) {

  // When the tile gets clicked, it'll pass its object/index to the parent
  // through handle click
  const handleTileClick = () => {
    handleClick(tile);
  }
  
  return (
    // Conditionally rendering the '.active' class allows us to conditionally apply
    // stylings
    <View style={styles.wrapper(gridSize)}>
      <TouchableOpacity style={[styles.tile(backwards, gridSize), active && styles.activeTile]}
        onPress={handleTileClick}>
        {<Image source={require('@assets/images/logo-200.png')} style={styles.tileImg}/> }
      </TouchableOpacity>
    </View>
    
  );
}

const forwardsColor = '#16309A';
const backwardsColor = '#C04000';
const activeColor = '#EAC117';
const styles = StyleSheet.create({
  tile: (backwards, gridSize) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: !backwards ? forwardsColor : backwardsColor,
    width: calcTileSize(gridSize),
    height: calcTileSize(gridSize),
    width: calcTileSize(gridSize),
    height: calcTileSize(gridSize),
    borderRadius: 12,
  }),
  wrapper: gridSize => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: calcSpacing(gridSize),
    height: calcSpacing(gridSize),
  }),
  activeTile: {
    backgroundColor: activeColor,

    // Box shadow for Android devices
    elevation: 5,

    // Theoretically this should create a color box shadow on Apple devices,
    // but I do not have an apple device to confirm
    shadowColor: activeColor,
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  tileImg: {
    objectFit: 'contain',
    width: '80%',
    height: '80%',
  },
});
  
export default Tile;