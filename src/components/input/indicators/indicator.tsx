import PropTypes from 'prop-types';
import {Dimensions, Image, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  items: Array<string>;
  mode?: 'text' | 'image';
};

const Indicator = (props: Props) => {
  const {items, mode} = props;
  const theme = useTheme();

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = (screenWidth - 20) / items.length;

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      {items.map((item, index) => {
        if (mode === 'text') {
          return (
            <Text style={styles.item} key={index.toString()}>
              {item}
            </Text>
          );
        } else if (mode === 'image') {
          return (
            <Image
              style={{
                width: imageWidth,
                height: 40,
                resizeMode: 'contain',
              }}
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
    backgroundColor: "#769FB6",
  },
  item: {
    flex: 1,
    textAlign: 'center',
    maxWidth: 100,
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
