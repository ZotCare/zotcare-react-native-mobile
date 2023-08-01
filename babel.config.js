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
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
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
          '@test': './test',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  exclude: ['**/*.png', '**/*.jpg', '**/*.gif'],
};
