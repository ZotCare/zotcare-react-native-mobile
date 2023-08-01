import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import React from 'react';
import {useState} from 'react';
import {Platform, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const DatetimePicker = (props: any) => {
  const {mode, onValueChange, default: def, min, max, disabled} = props;
  const [value, setValue] = useState(new Date(def) || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    setShow(false);
    if (event.type === 'set' && date) {
      setValue(date);
      onValueChange(date?.getTime());
    }
  };

  const chosenValue = () => {
    if (mode === 'date') {
      return value.toDateString();
    } else {
      return value.toLocaleTimeString();
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <>
          <Text>Selected: {chosenValue()}</Text>
          <Button
            disabled={disabled}
            mode="outlined"
            onPress={() => setShow(true)}>
            Change
          </Button>
        </>
      )}
      {(show || Platform.OS === 'ios') && (
        <RNDateTimePicker
          value={value}
          mode={mode}
          minimumDate={min ? new Date(min) : undefined}
          maximumDate={max ? new Date(max) : undefined}
          onChange={onChange}
          disabled={disabled}
          testID={'dateTimePicker'}
        />
      )}
    </View>
  );
};

DatetimePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'time']),
  onValueChange: PropTypes.func.isRequired,
  default: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
};

DatetimePicker.defaultProps = {
  mode: 'date',
  default: new Date().getTime(),
  disabled: false,
};

export default DatetimePicker;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5@s',
  },
});
