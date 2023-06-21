import 'react-native';

import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {RadioButton, useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

type Props = {
  options: Array<string | {label: string; value: string}>;
  default?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  mode?: 'vertical' | 'matrix';
};

const Radiobuttons = (props: Props) => {
  const {options, default: def, onChange, disabled, mode} = props;
  const [value, setValue] = useState(def);
  const theme = useTheme();

  return mode === 'vertical' ? (
    <RadioButton.Group
      disabled={disabled}
      onValueChange={newValue => {
        setValue(newValue);
        onChange(newValue);
      }}
      value={value}>
      {options.map((option, index) => (
        <RadioButton.Item
          key={index}
          label={typeof option === 'string' ? option : option.label}
          labelVariant="bodySmall"
          value={typeof option === 'string' ? option : option.value}
          mode={'android'}
          style={{
            backgroundColor: index % 2 ? theme.colors.backdrop : 'transparent',
          }}
        />
      ))}
    </RadioButton.Group>
  ) : (
    <RadioButton.Group
      disabled={disabled}
      onValueChange={newValue => {
        setValue(newValue);
        onChange(newValue);
      }}
      value={value}>
      <View style={styles.matrixContainer}>
        {options.map((option, index) => (
          <View
            key={index}
            style={[
              styles.item,
              {borderColor: theme.colors.primary},
              Platform.OS === 'android' && styles.itemAndroid,
            ]}>
            <RadioButton
              key={index}
              value={typeof option === 'string' ? option : option.value}
            />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

Radiobuttons.propTypes = {
  options: PropTypes.array.isRequired,
  default: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(['vertical', 'matrix']),
};

Radiobuttons.defaultProps = {
  options: [],
  default: undefined,
  onChange: () => {},
  disabled: false,
  mode: 'vertical',
};

export default Radiobuttons;

const styles = ScaledSheet.create({
  matrixContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  item: {
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 1,
    width: '55@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemAndroid: {
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 0,
  },
});
