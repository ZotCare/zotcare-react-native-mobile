import {render, RenderOptions} from '@testing-library/react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import store from '@app/store';

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>{children}</Provider>
    </SafeAreaProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
