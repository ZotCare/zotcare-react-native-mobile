module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './src',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@components': './src/components',
          '@services': './src/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      '@babel/plugin-proposal-private-property-in-object',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
  ],
  exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
};
