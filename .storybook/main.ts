import type { StorybookConfig } from '@storybook/nextjs';
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-property-in-object',
    ],
  }),
  // 스토리북의 웹팩 설정을 커스터마이징한다.
  // config:Config, configType : 'DEVELOPMENT' | 'PRODUCTION'
  webpackFinal: async (config, { configType }) => {
    config?.resolve?.plugins?.push(
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    );

    return config;
  },
};
export default config;
