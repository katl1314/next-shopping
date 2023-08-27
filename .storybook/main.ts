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
  // 스토리북에서 tsconfig.json에 정의한 paths를 사용하기 위해서 추가로 설정해야한다.
  webpackFinal: async (config) => {
    if (config && config.resolve) {
      // storybook7의 경우 config.resolve.plugins가 undefined으로 나오는 현상으로 빈 배열로 초기화 한다.
      config.resolve.plugins = config.resolve?.plugins ?? [];

      config.resolve.plugins.push(new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }));
    }
    return config;
  },
};
export default config;
