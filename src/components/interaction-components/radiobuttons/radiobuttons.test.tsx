import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import React from 'react';

import Radiobuttons from './radiobuttons';

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
    render(<Radiobuttons {...defProps} />);
  };
  describe('Check RadioButton rendering', () => {
    afterAll(() => {
      cleanup();
    });
    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      onChange.mockReset();
    });

    it('RadioButton renders with text', () => {
      renderComponent();
      expect(screen.getByText('1')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
    });

    it('radio clickable', () => {
      renderComponent();
      const item = screen.getByText('1');
      fireEvent.press(item);
      expect(onChange).toBeCalledTimes(1);
    });

    // test matrix
    it('radiobuttons should match to snapshot - matrix', () => {
      renderComponent({mode: 'matrix'});
      expect(screen.queryByText('1')).toBeNull();
      expect(screen.queryByText('2')).toBeNull();
    });

    // Since no text will appear in matrix mode, we rely on label text to search for component
    it('checkboxes matrix clickable', () => {
      renderComponent();
      const item1 = screen.getByLabelText('1');
      fireEvent.press(item1);
      expect(onChange).toBeCalledTimes(1);
    });
  });
});
