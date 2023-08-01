import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';

import NumberInput from './number-input';

jest.useFakeTimers();
describe('<NumberInput/>', () => {
  let onChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      default: 0,
      onChange,
      disabled: false,
      ...props,
    };
    render(<NumberInput {...defProps} />);
  };

  describe('Rendering', () => {
    it('Integer input', () => {
      renderComponent({default: 12});
      const input = screen.getByTestId('number-input');
      expect(input.props.value).toBe('12');
    });
  });
  describe('Changing text', () => {
    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      onChange.mockReset();
    });
    it('Integer input', () => {
      renderComponent();
      const input = screen.getByTestId('number-input');
      fireEvent.changeText(input, '12');
      expect(onChange).toHaveBeenCalledWith(12);
    });
    it('Float input', () => {
      renderComponent();
      const input = screen.getByTestId('number-input');
      fireEvent.changeText(input, '12.5');
      expect(onChange).toHaveBeenCalledWith(12.5);
    });
    it('Tailing dots', () => {
      renderComponent();
      const input = screen.getByTestId('number-input');
      fireEvent.changeText(input, '12.');
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
