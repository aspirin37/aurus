const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '_test-reports_',
        outputName: 'test-jest-junit.xml',
      },
    ],
  ],
};
