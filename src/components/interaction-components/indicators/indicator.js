import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const Indicator = props => {
  const {items, mode} = props;
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        if (mode === 'text') {
          return (
            <Text
              style={
                index === 0
                  ? styles.firstItem
                  : index === items.length - 1
                  ? styles.lastItem
                  : styles.item
              }
              key={index.toString()}>
              {item}
            </Text>
          );
        } else if (mode === 'image') {
          return (
            <Image
              style={
                index === 0
                  ? styles.firstItem
                  : index === items.length - 1
                  ? styles.lastItem
                  : styles.item
              }
              key={index.toString()}
              source={item}
            />
          );
        }
      })}
    </View>
  );
};

Indicator.propTypes = {
  items: PropTypes.array.isRequired,
  mode: PropTypes.string,
};

Indicator.defaultProps = {
  mode: 'text',
};

export default Indicator;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    textAlign: 'center',
  },
  firstItem: {
    flex: 1,
    textAlign: 'center',
  },
  lastItem: {
    flex: 1,
    textAlign: 'center',
  },
});
