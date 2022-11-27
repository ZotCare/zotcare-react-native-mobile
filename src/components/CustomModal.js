import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Colors from "../constants/Colors";
import { Surface } from "react-native-paper";
import mainStyles from '../views/Styles'

export default CustomModal = ({ hasButtons, visible, whiteText, pinkText, onWhiteButtonPress, onPinkButtonPress, onBackdropPress, component }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
    >
        <Surface style={[styles.surface, mainStyles.borderRadius, {height: verticalScale(130)}]}>            
          {component}
          {hasButtons && <View style={styles.buttonsView}>
            <CustomButton
              text={pinkText}
              buttonColor={Colors.main_colors.secondaryColor}  
              onPress={onPinkButtonPress}
              style={{flex: 1}}
            /> 
            <CustomButton
              text={whiteText}
              buttonColor={Colors.main_colors.secondaryColor} 
              onPress={onWhiteButtonPress}
              style={{flex: 1}}
            />                
          </View>}
        </Surface>
    </Modal>
  )
}

const styles = ScaledSheet.create({
  surface: {
    // marginHorizontal: "20@s",
     // paddingTop: "10@vs",
     backgroundColor: Colors.main_colors.modalBoxColor,
    //  height: "150@ms",
     alignItems: 'stretch',
     justifyContent: 'center',
     paddingHorizontal: "20@s",
    //  paddingTop: "20@vs",
     elevation: 2,
   },
   buttonsView: {
     marginTop: "20@vs",
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "center"
   }
})