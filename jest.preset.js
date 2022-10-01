const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: './results/coverage',
  reporters: process.env.CI
    ? [
      'default',
      [
        'jest-junit',
        {
          uniqueOutputName: 'true',
          outputDirectory: './results',
        },
      ],
    ]
    : ['default'],
};
