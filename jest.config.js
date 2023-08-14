// eslint-disable-next-line
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  // testPathIgnorePatterns : 테스트 제외할 디렉터리 패턴
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/app'], // 모듈
  testEnvironment: 'jsdom', // 테스트 환경
};

module.exports = createJestConfig(customJestConfig);
