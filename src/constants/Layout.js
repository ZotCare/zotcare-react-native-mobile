import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  font: {
    //fontFamily: 'OpenSans-Regular'
  },
  paddingHorizontal: scale(15),
  marginHorizontal: scale(15)
};
