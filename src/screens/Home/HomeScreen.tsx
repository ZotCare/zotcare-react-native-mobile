import {useGroupProfile} from '@services/group_profile/service';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import CategoryItem from '@app/components/CategoryItem/CategoryItem';
import {navigate} from '@app/navigation/services';
import {getLogo} from '@app/utils/logo';

const HomeScreen = () => {
  const {data: groupProfile, isSuccess} = useGroupProfile();
  const [categories, setCategories] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isSuccess) {
      setCategories(
        groupProfile.home_menu.map((category: any) => {
          return {
            name: category.name,
            id: category.to,
            type: category.type ?? 'category',
            icon: getLogo(category.icon.type, category.icon.name),
          };
        }),
      );
    }
  }, [groupProfile, isSuccess]);

  const navigateCategories = (type: string, id: string) => () => {
    if (type === 'interaction') {
      navigate('interaction', {id});
    } else if (type === 'category') {
      navigate('category', {id});
    }
  };

  return (
    (isSuccess && categories && (
      <View
        style={[
          {
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
          styles.container,
        ]}>
        <View style={styles.cardsWrapper}>
          {categories.map((category: any, index) => {
            return (
              <CategoryItem
                key={index.toString()}
                title={category.name}
                Icon={category.icon}
                onPress={navigateCategories(category.type, category.id)}
              />
            );
          })}
        </View>
      </View>
    )) || <Text>Loading...</Text>
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
