import {TextInput} from 'react-native-paper';
import {useState} from 'react';
import PropTypes from 'prop-types';

const NumberInput = props => {
  const {default: def, disabled, onChange} = props;
  const [value, setValue] = useState(def.toString());

  const handleChange = text => {
    if (text.endsWith('.')) {
      if (text.match(/\./g).length <= 1) {
        setValue(text);
      } else {
        setValue(text.slice(0, -1));
      }
      return;
    }
    let num = Number(text.replace(/[^\d.-]/g, ''));
    setValue(num.toString());
    onChange(num);
  };

  return (
    <TextInput
      disabled={disabled}
      inputMode="numeric"
      keyboardType="numeric"
      defaultValue={def}
      value={value}
      onChangeText={handleChange}
    />
  );
};

NumberInput.propTypes = {
  default: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

NumberInput.defaultProps = {
  default: 0,
  disabled: false,
  onChange: () => {},
};

export default NumberInput;
