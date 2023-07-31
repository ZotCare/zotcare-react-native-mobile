import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGroupProfile} from '@services/group_profile/service';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import CategoryItem from '@app/components/CategoryItem/CategoryItem';
import {NavigatorParams} from '@app/navigation/navigator';
import {getLogo} from '@app/utils/logo';

type Props = NativeStackScreenProps<NavigatorParams, 'category'>;

const CategoryScreen = ({route, navigation}: Props) => {
  const {id: category} = route.params;
  const [content, setContent] = useState<any>(null);
  const {data: groupProfile, isSuccess} = useGroupProfile();

  useEffect(() => {
    if (isSuccess) {
      setContent(groupProfile.category_menus[category]);
      navigation.setOptions({
        title: groupProfile.category_menus[category].title,
      });
    }
  }, [groupProfile, isSuccess]);

  const navigateTo = (type: string, id: string) => () => {
    if (type === 'interaction') {
      navigation.push('interaction', {id});
    } else if (type === 'category') {
      navigation.push('category', {id});
    }
  };

  return content ? (
    <ScrollView bounces={false} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.container}>
        <View style={styles.cardsWrapper}>
          {content.children.map((child: any, index: number) => {
            if (child.icon) {
              const icon = getLogo(child.icon.type, child.icon.name);
              return (
                <CategoryItem
                  key={index.toString()}
                  title={child.title}
                  Icon={icon}
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
  ) : (
    <></>
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
