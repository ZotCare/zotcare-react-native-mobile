import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import CategoryItem from '@app/components/CategoryItem/CategoryItem';
import {NavigationService} from '@app/navigation';

const categories = [
  {
    name: 'Tasks',
    id: 'tasks',
    icon: <FontAwesome5 name="tasks" size={45} />,
  },
  {
    name: 'Mood',
    id: 'mood',
    icon: <Octicons name="smiley" size={45} />,
  },
  {
    name: 'Sleep Diary',
    id: 'sleep_diary',
    icon: <MaterialCommunityIcons name="chat-sleep-outline" size={45} />,
  },
  {
    name: 'Assessments',
    id: 'assessments',
    icon: <Octicons name="checklist" size={45} />,
  },
];

const HomeScreen = () => {
  const navigateCategories = id => () => {
    NavigationService.navigate('category', {id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardsWrapper}>
        {categories.map((category, index) => {
          return (
            <CategoryItem
              key={index.toString()}
              title={category.name}
              Icon={category.icon}
              onPress={navigateCategories(category.id)}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '10@s',
    paddingTop: '20@vs',
  },
  cardsWrapper: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
