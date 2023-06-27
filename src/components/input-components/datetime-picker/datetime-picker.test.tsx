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
      default: 1686204936249, //June 8, 2023
      onValueChange,
      ...props,
    };
    render(<DateTimePicker {...defProps} />);
  };
  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });
    beforeEach(() => {
      onValueChange = jest.fn();
    });
    afterEach(() => {
      onValueChange.mockReset();
    });

    it('DateTimePicker renders', () => {
      renderComponent();
      screen.debug();
    });

    it('Test Date Picker', async () => {
      renderComponent();
      const today = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: today}});
    });
    // These are mainly for IOS (Andoid has additional Button - test later)
    it('Test Date Picker Value Change', async () => {
      renderComponent();
      const today = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: today}});
      expect(onValueChange).toHaveBeenCalledTimes(1);
      const newDate = new Date('2023-01-01');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: newDate}});
      expect(onValueChange).toHaveBeenCalledTimes(2);
    });

    it('Test Date Picker - Time', async () => {
      renderComponent({mode: 'time'});
      const time = new Date();
      const timePicker = await screen.findByTestId('dateTimePicker');
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: time}});
      time.setHours(10);
      time.setTime(20);
      fireEvent(timePicker, 'onChange', {nativeEvent: {timestamp: time}});
      expect(onValueChange).toHaveBeenCalledTimes(2);
    });
  });
});
