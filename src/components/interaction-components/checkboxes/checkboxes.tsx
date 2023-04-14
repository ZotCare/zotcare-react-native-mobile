import 'react-native';

import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {Checkbox, useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

function listToState(
  options: Array<string | {value: string; label: string}>,
  def: string[] | undefined,
) {
  const state: any = {};
  options.forEach((option: string | {value: string; label: string}) => {
    if (typeof option === 'string') {
      state[option] = def?.includes(option);
    } else {
      state[option.value] = def?.includes(option.value);
    }
  });
  return state;
}

function stateToList(selected: any) {
  return Object.keys(selected).filter(key => selected[key]);
}

type Props = {
  options: Array<string | {value: string; label: string}>;
  default?: Array<string>;
  onChange?: (selected: Array<string>) => void;
  mode?: 'vertical' | 'matrix';
};

const Checkboxes = (props: Props) => {
  const {options, default: def, onChange, mode} = props;
  const [selected, setSelected] = useState<any>(listToState(options, def));
  const theme = useTheme();
  const isChecked = (option: string) => {
    return selected[option] ? 'checked' : 'unchecked';
  };

  const toggleOption = (option: string) => () => {
    selected[option] = !selected[option];
    setSelected({...selected});
    onChange(stateToList(selected));
  };

  return mode === 'vertical' ? (
    options.map((option, index: number) => {
      return (
        <Checkbox.Item
          key={typeof option === 'string' ? option : option.value}
          label={typeof option === 'string' ? option : option.label}
          labelVariant="bodySmall"
          status={isChecked(typeof option === 'string' ? option : option.value)}
          mode="android"
          style={{
            backgroundColor: index % 2 ? theme.colors.backdrop : 'transparent',
          }}
          onPress={toggleOption(
            typeof option === 'string' ? option : option.value,
          )}
        />
      );
    })
  ) : (
    <View style={styles.matrixContainer}>
      {options.map(option => {
        return (
          <View
            key={
              typeof option === 'string'
                ? option + '_view'
                : option.value + '_view'
            }
            style={[
              styles.item,
              {borderColor: theme.colors.primary},
              Platform.OS === 'android' && styles.itemAndroid,
            ]}>
            <Checkbox
              status={isChecked(
                typeof option === 'string' ? option : option.value,
              )}
              onPress={toggleOption(
                typeof option === 'string' ? option : option.value,
              )}
            />
          </View>
        );
      })}
    </View>
  );
};

Checkboxes.propTypes = {
  options: PropTypes.array.isRequired,
  default: PropTypes.array,
  onChange: PropTypes.func,
  mode: PropTypes.oneOf(['vertical', 'matrix']),
};

Checkboxes.defaultProps = {
  options: [],
  default: [],
  onChange: () => {},
  mode: 'vertical',
};

export default Checkboxes;

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
    width: '60@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemAndroid: {
    textAlign: 'center',
    borderRadius: 18,
    borderWidth: 0,
  },
});
