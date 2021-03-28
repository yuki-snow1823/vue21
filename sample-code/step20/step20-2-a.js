module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!vee-validate/dist/rules)'],
  setupFiles: ['jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest-setup.js'],
};
