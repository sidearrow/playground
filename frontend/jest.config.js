module.exports = {
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  'setupFilesAfterEnv': ['<rootDir>/src/setupEnzyme.ts'],
}
