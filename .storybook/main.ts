import type { StorybookConfig } from '@storybook/nextjs';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const config: StorybookConfig = {
  staticDirs: ['./public'], // 정적 파일이 위치한 디렉터리
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
  webpackFinal: async (config) => {
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
