import {render, screen} from '@test/helper';
import React from 'react';

import InfoScreen from '@app/screens/info/info-screen';

describe('<InfoScreen />', () => {
  const renderComponent = () => {
    render(<InfoScreen />);
  };
  describe('Rendering', () => {
    it('Should render correctly', () => {
      renderComponent();
      expect(screen.getByText('Log Out')).toBeTruthy();
    });
  });
});
