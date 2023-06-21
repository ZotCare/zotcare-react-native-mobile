import {cleanup, render, screen} from '@testing-library/react-native';
import React from 'react';

import ThemedMarkdown from '@app/components/themed-markdown/themed-markdown';

describe('<ThemedMarkdown/>', () => {
  const renderComponent = (props: any = {}) => {
    const defProps = {
      children: '1',
      alignment: 'left',
      style: {},
      ...props,
    };
    render(<ThemedMarkdown {...defProps} />);
  };
  describe('Check ThemedMarkdown rendering', () => {
    afterAll(() => {
      cleanup();
    });
    it('ThemedMarkdown renders', () => {
      renderComponent();
    });
  });
});
