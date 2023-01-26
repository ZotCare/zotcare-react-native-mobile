import 'react-native';
import {RadioButton, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {View} from 'react-native';

const Radiobuttons = props => {
  const {options, default: def, onChange, disabled, mode} = props;
  const [value, setValue] = useState(def);
  const theme = useTheme();

  return mode === 'horizontal' ? (
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
            style={[styles.item, {borderColor: theme.colors.primary}]}>
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
  mode: PropTypes.oneOf(['horizontal', 'matrix']),
};

Radiobuttons.defaultProps = {
  options: [],
  default: undefined,
  onChange: () => {},
  disabled: false,
  mode: 'horizontal',
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
  },
});
