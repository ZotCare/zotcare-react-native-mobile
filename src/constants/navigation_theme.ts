import {DefaultTheme, Theme} from '@react-navigation/native';

import paper_theme from './paper_theme';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    primary: paper_theme.colors.primary,
    background: paper_theme.colors.background,
    card: paper_theme.colors.surface,
    text: paper_theme.colors.onBackground,
    border: paper_theme.colors.outline,
    notification: paper_theme.colors.error,
  },
};

export default theme;
