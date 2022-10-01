import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  coverageDirectory: './results/coverage',
  reporters: process.env.CI ? ['default', 'jest-junit'] : ['default'],
};
