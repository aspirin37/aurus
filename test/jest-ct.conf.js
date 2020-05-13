const jestConfig = require('./jest.conf.js');

jestConfig.collectCoverage = true;
jestConfig.collectCoverageFrom = ['src/**/*.{js,vue}', '!**/node_modules/**'];
jestConfig.coverageReporters = ['text', 'cobertura'];
jestConfig.coverageDirectory = '_test-reports_';

module.exports = jestConfig;
