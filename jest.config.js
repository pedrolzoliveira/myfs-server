/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './scripts/reset-db.js',
  globalTeardown: './scripts/delete-temp-files.js'
}
