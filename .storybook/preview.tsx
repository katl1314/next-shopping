import type { Preview } from '@storybook/react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../app/theme';
import * as NextImage from 'next/image';
import React from 'react';

// 추가
const themeDecorator = (story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [themeDecorator], // addDecorator 대체
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// 전역 스타일을 적용하는 함수
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: 0.25s;
    color: #000;
  }
`;

// storybook은 이미지 최적화를 위한 이미지 컴포넌트를 사용할 수 없기 때문에 대체한다.
// storybook 7.2에서 아래 코드에는 문제가 있음.
// 참조 사이트 : https://github.com/storybookjs/storybook/issues/23684
// const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props) =>
//     typeof props.src === 'string' ? (
//       <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
//     ) : (
//       <OriginalNextImage {...props} unoptimized />
//     ),
// });

export default preview;
