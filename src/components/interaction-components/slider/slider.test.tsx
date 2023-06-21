import {cleanup, render, screen} from '@testing-library/react-native';
import React from 'react';

import Slider from '@app/components/interaction-components/slider/slider';

describe('<Slider/>', () => {
  const onValueChange = jest.fn();
  const renderComponent = (props: any = {}) => {
    const defProps = {
      min: 0,
      max: 100,
      step: 10,
      default: 0,
      // indicator: {items: ['10', '100']},
      onValueChange,
      ...props,
    };
    render(<Slider {...defProps} />);
  };
  describe('Check Slider rendering', () => {
    afterAll(() => {
      cleanup();
    });
    it('Slider renders', () => {
      renderComponent();
    });

    it('Slider renders with Correct Slider Component', async () => {
      renderComponent();
      const slider = await screen.findByTestId('slider');
      expect(slider).toBeDefined();
    });
  });
});
