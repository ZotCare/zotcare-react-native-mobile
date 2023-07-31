import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import RadioButtons from './radio-buttons';

describe('<Radiobuttons/>', () => {
  let onChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      options: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
      ],
      default: '1',
      onChange,
      ...props,
    };
    render(<RadioButtons {...defProps} />);
  };
  describe('Check RadioButton rendering', () => {
    afterAll(() => {
      cleanup();
    });
    it('In vertical mode', () => {
      renderComponent();
      expect(screen.getByText('1')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
    });
    it('In matrix mode', () => {
      renderComponent({mode: 'matrix'});
      expect(screen.queryByText('1')).toBeNull();
      expect(screen.queryByText('2')).toBeNull();
    });
  });
  describe('Selecting', () => {
    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      onChange.mockReset();
    });
    it('Vertical click event', () => {
      renderComponent();
      const item = screen.getByText('2');
      fireEvent.press(item);
      expect(onChange).toBeCalledWith('2');
    });
    it('Matrix click event', () => {
      renderComponent();
      const item1 = screen.getByLabelText('2');
      fireEvent.press(item1);
      expect(onChange).toBeCalledWith('2');
    });
  });
});
