import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from 'react';

const DatetimePicker = props => {
  const {mode, onValueChange, default: def, min, max} = props;
  const [value, setValue] = useState(def || new Date());
  const onChange = (event: DateTimePickerEvent, date: Date) => {
    if (event === 'set') {
      setValue(date);
      onValueChange(date);
    }
  };

  return (
    <RNDateTimePicker
      value={value}
      mode={mode}
      minimumDate={min ? new Date(min) : undefined}
      maximumDate={max ? new Date(max) : undefined}
      onChange={onChange}
    />
  );
};

DatetimePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'time']),
  onValueChange: PropTypes.func.isRequired,
  default: PropTypes.instanceOf(Date),
  min: PropTypes.number,
  max: PropTypes.number,
};

DatetimePicker.defaultProps = {
  mode: 'date',
  default: new Date(),
};

export default DatetimePicker;
