
module.exports = {
  "preset": "react-native",
  "setupFiles": [
    "<rootDir>/test/setup.ts"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@ronradtke/react-native-markdown-display|react-native-paper)"
  ]
}
