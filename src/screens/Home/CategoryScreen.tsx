import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import CategoryItem from '@app/components/CategoryItem/CategoryItem';
import {NavigatorParams} from '@app/navigation/navigator';

const categories = {
  tasks: {
    title: 'Tasks',
    children: [
      {
        title: 'Finger-Tapping',
        type: 'interaction',
        id: '6409396d0476803383a6ec48',
        icon: <FontAwesome5 name="fingerprint" size={45} />,
      },
      {
        title: 'Word-Pairs',
        type: 'interaction',
        id: '641a270c93b91393f02af7fe',
        icon: <FontAwesome5 name="font" size={45} />,
      },
      {
        title: 'Letters & Numbers',
        type: 'interaction',
        id: '641b614475f22ff73136d720',
        icon: <Octicons name="number" size={45} />,
      },
      {
        title: 'Rule Switching',
        type: 'interaction',
        id: '642c8c61cfa7eec6336ad49d',
        icon: <FontAwesome5 name="shapes" size={45} />,
      },
    ],
  },
  mood: {
    title: 'Mood',
    children: [
      {
        title: 'Mood Check',
        type: 'interaction',
        id: '642a0d8d4e2ef8792f5c1458',
      },
    ],
  },
  sleep_diary: {
    title: 'Sleep Diary',
    children: [
      {
        title: 'Sleep Diary Morning',
        type: 'interaction',
        id: '642a120d08e298bd4bcea5a5',
      },
      {
        title: 'Sleep Diary Evening',
        type: 'interaction',
        id: '642a11b34e2ef8792f5c145d',
      },
      {
        title: "I forgot, here's yesterday's Sleep Morning Diary",
        type: 'interaction',
        id: '6442f90a525961a063724212',
      },
      {
        title: "I forgot, here's yesterday's Sleep Evening Diary",
        type: 'interaction',
        id: '6442f8eb418d84dcaf38042c',
      },
    ],
  },
  assessments: {
    title: 'Assessments',
    children: [
      {
        title: 'Parent',
        type: 'category',
        id: 'parent',
        icon: <MaterialCommunityIcons name="human-handsdown" size={45} />,
      },
      {
        title: 'Youth',
        type: 'category',
        id: 'youth',
        icon: <MaterialCommunityIcons name="human-child" size={45} />,
      },
    ],
  },
  parent: {
    title: 'Parent Assessment',
    children: [
      {
        title: 'APQ',
        type: 'interaction',
        id: '642a05a508e298bd4bcea59e',
      },
      {
        title: 'CSB',
        type: 'interaction',
        id: '642a0c054e2ef8792f5c1457',
      },
      {
        title: 'FSS',
        type: 'interaction',
        id: '642a0c9c08e298bd4bcea5a1',
      },
      {
        title: 'VGE',
        type: 'interaction',
        id: '642a0e274e2ef8792f5c1459',
      },
      {
        title: 'PSAM',
        type: 'interaction',
        id: '642a0f2f4e2ef8792f5c145b',
      },
    ],
  },
  youth: {
    title: 'Child Assessments',
    children: [
      {
        title: 'APQ',
        type: 'interaction',
        id: '642a040208e298bd4bcea59d',
      },
      {
        title: 'CES-D',
        type: 'interaction',
        id: '642a064d08e298bd4bcea59f',
      },
      {
        title: 'SRCF',
        type: 'interaction',
        id: '642a112108e298bd4bcea5a4',
      },
      {
        title: 'CASSS',
        type: 'interaction',
        id: '642a08db08e298bd4bcea5a0',
      },
      {
        title: 'PDS',
        type: 'interaction',
        id: '642a0f9008e298bd4bcea5a3',
      },
      {
        title: 'GAD-7',
        type: 'interaction',
        id: '642a0e7a4e2ef8792f5c145a',
      },
      {
        title: 'IPPA',
        type: 'interaction',
        id: '642a0ee908e298bd4bcea5a2',
      },
      {
        title: 'PSS',
        type: 'interaction',
        id: '642a0fd04e2ef8792f5c145c',
      },
    ],
  },
};

type Props = NativeStackScreenProps<NavigatorParams, 'category'>;

const CategoryScreen = ({route, navigation}: Props) => {
  const {id: category} = route.params;
  const content = categories[category as keyof typeof categories];

  const navigateTo = (type: string, id: string) => () => {
    if (type === 'interaction') {
      navigation.push('interaction', {id});
    } else if (type === 'category') {
      navigation.push('category', {id});
    }
  };

  useEffect(() => {
    navigation.setOptions({title: content.title});
  }, []);

  return (
    <ScrollView bounces={false} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <View style={styles.cardsWrapper}>
          {content.children.map((child: any, index: number) => {
            if (child.icon) {
              return (
                <CategoryItem
                  key={index.toString()}
                  title={child.title}
                  Icon={child.icon}
                  onPress={navigateTo(child.type, child.id)}
                />
              );
            } else {
              return (
                <Card key={index.toString()} style={styles.card}>
                  <Card.Title titleNumberOfLines={5} title={child.title} />
                  <Card.Actions>
                    <Button onPress={navigateTo(child.type, child.id)}>
                      Take
                    </Button>
                  </Card.Actions>
                </Card>
              );
            }
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CategoryScreen;

const styles = ScaledSheet.create({
  container: {
    padding: 20,
  },
  cardsWrapper: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 150,
  },
});
