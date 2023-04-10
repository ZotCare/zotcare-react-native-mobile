import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const CategoryItem = (props: any) => {
  const {title, Icon, onPress} = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: theme.colors.primaryContainer},
      ]}
      onPress={onPress}>
      {Icon}
      <Text variant={'titleSmall'}> {title} </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = ScaledSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
