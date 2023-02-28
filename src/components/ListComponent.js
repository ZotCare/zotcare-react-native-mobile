import React from 'react';
import {Text, View} from 'react-native';
import {Badge} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';

import Colors from '../constants/Colors';
import {numberWithCommas} from '../libs/utils';
import mainStyles from '../views/Styles';
import CustomAvatar from './CustomAvatar';

export default ({name, image, score, rank, style}) => {
  return (
    <View style={[styles.container, mainStyles.borderRadius, style]}>
      <View style={{flex: 0.3, marginRight: scale(10)}}>
        {!!rank && <Badge style={styles.badge}>{rank}</Badge>}
        <CustomAvatar
          name={name}
          image={{uri: image}}
          size={50}
          fontSize={20}
        />
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.scoreText}>{numberWithCommas(score ?? 0)}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    // height: "40@vs",
    marginVertical: '5@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.main_colors.boxesBackground,
    padding: '15@ms',
  },
  nameText: {
    fontWeight: '900',
    fontSize: '15@ms',
    flex: 0.7,
    color: Colors.main_colors.whiteText,
  },
  scoreText: {
    fontWeight: '900',
    fontSize: '24@ms',
    flex: 1,
    color: Colors.main_colors.whiteText,
    textAlign: 'right',
  },
  badge: {
    position: 'absolute',
    top: -3,
    left: 0,
    backgroundColor: '#343434',
    color: Colors.main_colors.whiteText,
    fontWeight: '900',
    zIndex: 1000,
  },
});
