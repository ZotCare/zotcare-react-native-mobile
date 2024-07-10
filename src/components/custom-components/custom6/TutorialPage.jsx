// TutorialPage to display instructions & visual example
import React from 'react';
import { SafeAreaView, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

// onNext is a prop being passed between this TutorialPage & App
// so when 'Next' button is clicked it'll change to DigitSpan
const TutorialPage = ({ onNext }) => {

  // TODO: If we do a separate Backwards Page maybe don't need scrolling
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
      <Image source={require('@assets/images/InitialInstructions.jpg')} 
        style={{width: screenWidth, height: screenHeight + 200}}
        resizeMode="contain"/>
      </ScrollView>

      <Button style={styles.nextButton} title="Next" onPress={onNext}></Button>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default TutorialPage;
