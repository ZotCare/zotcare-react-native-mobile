import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import {useInteractions} from '../../modules/interactions/service';
import InteractionCard from './components/interaction-card/interaction-card';

const HomeScreen = ({navigation}) => {
  const {data: interactions, status} = useInteractions();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {status === 'success' &&
          interactions.map(interaction => (
            <InteractionCard
              name={interaction.name}
              id={interaction.id}
              key={interaction.id}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    padding: '20@s',
  },
});
