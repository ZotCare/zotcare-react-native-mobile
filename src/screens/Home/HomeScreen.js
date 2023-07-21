import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import CategoryItem from '@app/components/CategoryItem/CategoryItem';
import {useGroupProfile} from '@app/modules/group_profile/service';
import {NavigationService} from '@app/navigation';
import {getLogo} from '@app/utils/logo';

const HomeScreen = () => {
  const {data: groupProfile, isSuccess} = useGroupProfile();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setCategories(
        groupProfile.home_menu.map(category => {
          return {
            name: category.name,
            id: category.to,
            icon: getLogo(category.icon.type, category.icon.name),
          };
        }),
      );
    }
  }, [groupProfile, isSuccess]);

  const navigateCategories = id => () => {
    NavigationService.navigate('category', {id});
  };

  return (
    isSuccess && (
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
    )
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
