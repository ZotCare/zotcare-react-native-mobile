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
  const {mode, onValueChange, default: def, min, max} = props;
  const [value, setValue] = useState(def || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set') {
      setValue(date);
      onValueChange(date);
    }
    setShow(false);
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
          <Button mode="outlined" onPress={() => setShow(true)}>
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
        />
      )}
    </View>
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '5@s',
  },
});
