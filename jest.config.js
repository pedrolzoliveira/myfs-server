/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './scripts/jest-setup.js',
  globalTeardown: './scripts/jest-teardown.js'
}
