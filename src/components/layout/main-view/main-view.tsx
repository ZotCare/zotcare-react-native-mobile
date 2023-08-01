import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  children: React.ReactNode;
  hasHeader?: boolean;
  isPadded?: boolean;
};
const MainView = (props: Props) => {
  const {children, hasHeader, isPadded} = props;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          paddingTop: hasHeader ? undefined : insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={[styles.container, isPadded ? styles.padded : undefined]}>
        {children}
      </View>
    </View>
  );
};

MainView.propTypes = {
  children: PropTypes.node,
  hasHeader: PropTypes.bool,
  isPadded: PropTypes.bool,
};

MainView.defaultProps = {
  hasHeader: true,
  isPadded: true,
};

export default MainView;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingVertical: '10@s',
    paddingHorizontal: '10@s',
  },
});
