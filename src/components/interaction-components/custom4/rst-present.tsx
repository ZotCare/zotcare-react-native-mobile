import PropTypes from 'prop-types';
import React from 'react';
import {Image, View} from 'react-native';
import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

type RstPresentProps = {
  object: string;
  position: 'left' | 'right';
  onPress: (position: 'left' | 'right') => () => void;
};

const rstPresent = (props: RstPresentProps) => {
  const {object, position, onPress} = props;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imagesRow,
          {flexDirection: position === 'right' ? 'row-reverse' : 'row'},
        ]}>
        <Image
          style={styles.image}
          source={{
            uri: object,
          }}
        />
      </View>
      <View style={styles.buttonsRow}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={onPress('left')}>
          {' '}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={onPress('right')}>
          {' '}
        </Button>
      </View>
    </View>
  );
};

rstPresent.propTypes = {
  object: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default rstPresent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    rowGap: 15,
  },
  imagesRow: {
    width: '100%',
  },
  image: {
    width: 120,
    height: 120,
  },
  buttonsRow: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    width: '30%',
  },
});
