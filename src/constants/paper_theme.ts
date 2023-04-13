import {configureFonts, MD3LightTheme, MD3Theme} from 'react-native-paper';

const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    primary: 'rgb(0, 104, 124)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(176, 236, 255)',
    onPrimaryContainer: 'rgb(0, 31, 39)',
    secondary: 'rgb(75, 98, 105)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(206, 231, 239)',
    onSecondaryContainer: 'rgb(6, 30, 37)',
    tertiary: 'rgb(88, 92, 126)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(222, 224, 255)',
    onTertiaryContainer: 'rgb(20, 25, 55)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(251, 252, 254)',
    onBackground: 'rgb(25, 28, 29)',
    surface: 'rgb(251, 252, 254)',
    onSurface: 'rgb(25, 28, 29)',
    surfaceVariant: 'rgb(219, 228, 231)',
    onSurfaceVariant: 'rgb(64, 72, 75)',
    outline: 'rgb(112, 120, 124)',
    outlineVariant: 'rgb(191, 200, 203)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(46, 49, 50)',
    inverseOnSurface: 'rgb(239, 241, 242)',
    inversePrimary: 'rgb(87, 214, 247)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 245, 248)',
      level2: 'rgb(231, 240, 244)',
      level3: 'rgb(223, 236, 240)',
      level4: 'rgb(221, 234, 238)',
      level5: 'rgb(216, 231, 236)',
    },
    surfaceDisabled: 'rgba(25, 28, 29, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 29, 0.38)',
    backdrop: 'rgba(41,50,53,0.2)',
  },
  fonts: configureFonts({
    config: {
      labelLarge: {
        lineHeight: 22,
        fontSize: 17,
      },
    },
    isV3: true,
  }),
};

export default theme;
