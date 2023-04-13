import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import {useInteractions} from '../../modules/interactions/service';
import InteractionCard from './components/interaction-card/interaction-card';

const HomeScreen = ({navigation}) => {
  const {data: interactions, status} = useInteractions();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        {status === 'success' &&
          interactions.map(interaction => (
            <InteractionCard
              name={interaction.name}
              id={interaction.id}
              key={interaction.id}
            />
          ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    padding: '20@s',
    gap: 10,
  },
});
