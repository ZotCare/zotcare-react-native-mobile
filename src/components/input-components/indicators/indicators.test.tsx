import {cleanup, render, screen} from '@testing-library/react-native';
import React from 'react';

import Indicator from '@components/input-components/indicators/indicator';

describe('<Indicators/>', () => {
  const renderComponent = (props: any = {}) => {
    const defProps = {
      items: ['1', '2', '3'],
      mode: 'text',
      ...props,
    };
    render(<Indicator {...defProps} />);
  };
  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });
    it('Indicator renders', () => {
      renderComponent();
      expect(screen.getByText('1')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
      expect(screen.getByText('3')).toBeTruthy();
    });
  });
});
