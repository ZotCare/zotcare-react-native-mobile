import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import DateTimePicker from '@components/input-components/datetime-picker/datetime-picker';

describe('<DateTimePicker/>', () => {
  let onValueChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      mode: 'date',
      default: new Date().getTime(),
      onValueChange,
      ...props,
    };
    render(<DateTimePicker {...defProps} />);
  };
  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });

    it('Renders default value', async () => {
      renderComponent();
      const timePicker = await screen.findByTestId('dateTimePicker');
      const today = new Date();
      const timePickerDate = new Date(timePicker.props.date).toDateString();
      expect(timePickerDate).toEqual(today.toDateString());
    });
  });
  describe('Selecting', () => {
    beforeEach(() => {
      onValueChange = jest.fn();
    });
    afterEach(() => {
      onValueChange.mockReset();
    });
    it('Initial Date', async () => {
      renderComponent();
      const today = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: today}});
      expect(timePicker.props.date).toEqual(today.getTime());
    });
    it('Date Picker Value Change', async () => {
      renderComponent();
      const today = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: today}});
      const newDate = new Date('2023-01-01');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: newDate}});
      expect(timePicker.props.date).toEqual(newDate.getTime());
    });

    it('Test Date Picker - Time', async () => {
      renderComponent({mode: 'time'});
      const time = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: time}});
      time.setHours(10);
      time.setMinutes(20);
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: time}});
      expect(timePicker.props.date).toEqual(time.getTime());
    });
  });
});
