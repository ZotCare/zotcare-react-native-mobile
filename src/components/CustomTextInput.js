import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Layout from '../constants/Layout'


export default CustomTextInput = ({ placeholder, keyboardType, style, onChangeText, secureTextEntry, value }) => {
  const [focus, setFocused] = useState(false)
  const inputElementRef = useRef(null)
  useEffect(() => {
    if (inputElementRef && Platform.OS == "android") {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: "roboto-regular" }
        });
    }
  }, [secureTextEntry]);
  return (
    <View style={styles.container}>
      <TextInput
        ref={inputElementRef}
        placeholderTextColor={!focus?"#6F6F6F":"#111747"}
        placeholder={placeholder ?? ""}
        value={value}
        keyboardType={keyboardType ?? "default"}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
        underlineColorAndroid="white"
        style={[!focus ? styles.textInput : styles.focusInput, style]}
        onChangeText={onChangeText}
        underlineColorAndroid={!focus ? "#F7F7F7" : "#FFFFFF"}
        secureTextEntry={secureTextEntry ?? false}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
    container: {
      height: "40@vs",
      marginHorizontal: Layout.marginHorizontal,
      marginVertical: "5@vs"
    },
    textInput: {
      height: "40@vs",
      borderRadius: "20@vs",
      paddingHorizontal: Layout.paddingHorizontal,
      fontSize: 16,
      backgroundColor: "#F7F7F7",
      color: "#000",
      fontWeight: "700"
    },
    focusInput:{
      height: "40@vs",
      borderRadius: "20@vs",
      fontSize: 16,
      paddingHorizontal: Layout.paddingHorizontal,
      backgroundColor: "#FFFFFF",
      color: "#000",
      fontWeight: "700"
    }
  })