import {cleanup, render, screen} from '@testing-library/react-native';
import React from 'react';

import Slider from '@components/input-components/slider/slider';

describe('<Slider/>', () => {
  let onValueChange = jest.fn();
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
  describe('Rendering', () => {
    afterAll(() => {
      cleanup();
    });
    it('Renders with default', async () => {
      renderComponent();
      const slider = await screen.findByTestId('slider');
      expect(slider).toBeDefined();
      expect(slider.props.value).toEqual(0);
    });
  });
});
