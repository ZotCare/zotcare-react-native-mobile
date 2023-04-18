import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  items: Array<string>;
  mode?: 'text' | 'image';
};

const Indicator = (props: Props) => {
  const {items, mode} = props;
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
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
              source={{uri: item}}
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
