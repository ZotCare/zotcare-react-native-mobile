module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^@?\\w'],
          ['^'],
          ['^(@app|@assets|@constants|@components)(/.*|$)'],
          ['^\\.'],
        ],
      },
    ],
  },
};
