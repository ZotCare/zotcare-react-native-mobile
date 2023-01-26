import 'react-native';
import {Checkbox, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

function listToState(options, def) {
  const state = {};
  options.forEach(option => {
    state[option] = def?.includes(option);
  });
  return state;
}

function stateToList(selected) {
  return Object.keys(selected).filter(key => selected[key]);
}

const Checkboxes = props => {
  const {options, default: def, onChange, mode} = props;
  const [selected, setSelected] = useState(listToState(options, def));
  const theme = useTheme();
  const isChecked = option => {
    return selected[option] ? 'checked' : 'unchecked';
  };

  const toggleOption = option => () => {
    selected[option] = !selected[option];
    setSelected({...selected});
    onChange(stateToList(selected));
  };

  return mode === 'vertical' ? (
    options.map(option => {
      return (
        <Checkbox.Item
          key={typeof option === 'string' ? option : option.value}
          label={typeof option === 'string' ? option : option.label}
          labelVariant="bodySmall"
          status={isChecked(typeof option === 'string' ? option : option.value)}
          onPress={toggleOption(
            typeof option === 'string' ? option : option.value,
          )}
        />
      );
    })
  ) : (
    <View style={styles.matrixContainer}>
      {options.map((option, index) => {
        return (
          <View style={[styles.item, {borderColor: theme.colors.primary}]}>
            <Checkbox
              key={typeof option === 'string' ? option : option.value}
              labelVariant="bodySmall"
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
  },
});
