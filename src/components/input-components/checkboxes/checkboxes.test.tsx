import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import Checkboxes from './checkboxes';

describe('<Checkbox />', () => {
  let onChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      options: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
      ],
      default: undefined,
      onChange,
      ...props,
    };
    render(<Checkboxes {...defProps} />);
  };

  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });

    it('In vertical mode', () => {
      renderComponent();
      expect(screen.getByLabelText('1')).toBeTruthy();
      expect(screen.getByLabelText('2')).toBeTruthy();
      expect(screen.getByLabelText('3')).toBeTruthy();
    });

    it('In matrix mode', () => {
      renderComponent({mode: 'matrix'});
      expect(screen.queryByText('1')).toBeNull();
      expect(screen.queryByText('2')).toBeNull();
      expect(screen.queryByText('3')).toBeNull();
    });

    it('With single value options', () => {
      renderComponent({options: ['1', '2', {label: '3', value: '3'}]});
      expect(screen.getByLabelText('1')).toBeTruthy();
      expect(screen.getByLabelText('2')).toBeTruthy();
      expect(screen.getByLabelText('3')).toBeTruthy();
    });
  });

  describe('Selecting', () => {
    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      onChange.mockReset();
    });

    it('Click event', () => {
      renderComponent();
      const item1 = screen.getByLabelText('1');
      fireEvent.press(item1);
      expect(onChange).toBeCalledWith(['1']);
    });

    it('Click with default', () => {
      renderComponent({default: ['1', '2']});
      const item1 = screen.getByLabelText('1');
      fireEvent.press(item1);
      expect(onChange).toBeCalledWith(['2']);
    });
  });
});
