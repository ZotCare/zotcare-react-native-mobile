import {cleanup, render} from '@testing-library/react-native';
import React from 'react';

import ThemedMarkdown from '@app/components/themed-markdown/themed-markdown';

describe('<ThemedMarkdown/>', () => {
  const renderComponent = (
    props: any = {},
    children: string = 'Hello World!',
  ) => {
    const defProps = {
      alignment: 'left',
      style: {},
      ...props,
    };
    render(<ThemedMarkdown {...defProps}> {children} </ThemedMarkdown>);
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
