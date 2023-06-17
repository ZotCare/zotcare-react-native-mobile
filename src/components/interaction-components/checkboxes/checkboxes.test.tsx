import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
// import userEvent from '@testing-library/user-event'
import React from 'react';

import Checkboxes from '@app/components/interaction-components/checkboxes/checkboxes';

describe('<Checkbox />', () => {
  let onChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      options: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
      ],
      default: ['1'],
      onChange,
      ...props,
    };
    render(<Checkboxes {...defProps} />);
  };
  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });
    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      onChange.mockReset();
    });

    it('render in vertical', () => {
      renderComponent();
      // screen.debug();
      expect(screen.getByLabelText('1')).toBeTruthy();
      expect(screen.getByLabelText('2')).toBeTruthy();
      expect(screen.getByLabelText('3')).toBeTruthy();
    });

    it('checkboxes verticle clickable', () => {
      renderComponent();
      const item1 = screen.getByLabelText('1');
      const item2 = screen.getByLabelText('2');
      fireEvent.press(item1);
      fireEvent.press(item2);
      expect(onChange).toBeCalledTimes(2);
    });

    it('checkboxes should match to snapshot - matrix', () => {
      renderComponent({mode: 'matrix'});
      // getBy will automatically throw an error is an element is not found
      // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
      expect(screen.queryByText('1')).toBeNull();
    });

    it('checkboxes matrix clickable', () => {
      renderComponent();
      const item1 = screen.getByLabelText('1');
      fireEvent.press(item1);
      expect(onChange).toBeCalledTimes(1);
    });
  });
});
