import PropTypes from 'prop-types';
import React from 'react';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';

type Props = {
  default?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
};

const NumberInput = (props: Props) => {
  const {default: def, disabled, onChange} = {default: 0, ...props};
  const [value, setValue] = useState(def.toString());

  const handleChange = (text: string) => {
    if (text && text.endsWith('.')) {
      // @ts-ignore
      if (text.match(/\./g).length <= 1) {
        setValue(text);
      } else {
        setValue(text.slice(0, -1));
      }
      return;
    }
    let num = Number(text.replace(/[^\d.-]/g, ''));
    setValue(num.toString());
    if (onChange) {
      onChange(num);
    }
  };

  return (
    <TextInput
      disabled={disabled}
      inputMode="numeric"
      keyboardType="numeric"
      defaultValue={def.toString()}
      value={value}
      onChangeText={handleChange}
      testID={'number-input'}
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
