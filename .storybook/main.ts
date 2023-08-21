import type { StorybookConfig } from '@storybook/nextjs';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const config: StorybookConfig = {
  staticDirs: ['public'], // 정적 파일이 위치한 디렉터리
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  babel: async (options) => ({
    ...options,
    // plugins: [
    //   '@babel/plugin-proposal-class-properties',
    //   '@babel/plugin-proposal-private-methods',
    //   '@babel/plugin-proposal-property-in-object',
    // ],
  }),
  // 스토리북의 웹팩 설정을 커스터마이징한다.
  // config:Config, configType : 'DEVELOPMENT' | 'PRODUCTION'
  // 현재 상대경로의 경우 가독성이 떨어지는 문제로 Path Alias를 이용하여 처리를 하려고 한다.
  // tsconfig.json만 수정했을때, storybook은 별도로 설정해야한다.
  // tsconfig-paths-webpack-plugin을 먼저 설치한다.
  webpackFinal: async (config) => {
    // https://dev.to/lico/storybook-plugins-push-of-undefined-error-in-webpackfinal-after-upgrading-from-webpack4-to-webpack5-4280
    // webpack에서 config.resolve.plugins가 undefined으로 표시됨.
    if (config && config.resolve) {
      config.resolve.plugins = config.resolve?.plugins ?? [];

      config.resolve.plugins.push(new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }));
    }
    return config;
  },
};
export default config;
