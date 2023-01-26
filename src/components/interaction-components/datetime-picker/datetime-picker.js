import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {useState} from 'react';

const DatetimePicker = props => {
  const {mode, onValueChange, default: def} = props;
  const [value, setValue] = useState(def || new Date());
  const onChange = (event: DateTimePickerEvent, date: Date) => {
    if (event === 'set') {
      setValue(date);
      onValueChange(date);
    }
  };

  return <RNDateTimePicker value={value} mode={mode} onChange={onChange} />;
};

DatetimePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'time']),
  onValueChange: PropTypes.func.isRequired,
  default: PropTypes.instanceOf(Date),
};

DatetimePicker.defaultProps = {
  mode: 'date',
  default: new Date(),
};

export default DatetimePicker;
