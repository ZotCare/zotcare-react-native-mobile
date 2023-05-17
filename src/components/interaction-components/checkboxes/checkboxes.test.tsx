import {cleanup, render, screen} from '@testing-library/react-native';

import Checkboxes from '@app/components/interaction-components/checkboxes/checkboxes';

describe('<Checkbox />', () => {
  const onChange = jest.fn();
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
    it('render in vertical', () => {
      renderComponent();
      screen.debug();
      expect(screen.getByText('1')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
      expect(screen.getByText('3')).toBeTruthy();
    });
    it('should match to snapshot - matrix', () => {
      renderComponent({mode: 'matrix'});
      expect(screen.getByText('1')).not.toBeTruthy();
    });
  });
});
