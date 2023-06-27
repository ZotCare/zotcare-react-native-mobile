import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import {useInteractions} from '@app/modules/interactions/service';

import InteractionCard from './components/interaction-card/interaction-card';

const HomeScreen = () => {
  const {data: interactions, status} = useInteractions();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={[
          {
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
          styles.container,
        ]}>
        {status === 'success' &&
          interactions.map(interaction => (
            <InteractionCard
              name={interaction.name}
              id={interaction.id}
              key={interaction.id}
            />
          ))}
      </View>
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
