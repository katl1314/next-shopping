import theme from '../theme';
import type { Responsive, ResponsiveProp } from '../types';

// Theme타입
type AppTheme = typeof theme;
type SpaceThemeKeys = keyof typeof theme.spaces;
type ColorThemeKeys = keyof typeof theme.colors;
type FontSizeThemeKeys = keyof typeof theme.fontSizes;
type LineHeightThemeKeys = keyof typeof theme.lineHeights;
type LetterSpacingsKeys = keyof typeof theme.letterSpacings;

// 타입 가드
function isSpaceThemeKey(value: unknown, theme: AppTheme): value is SpaceThemeKeys {
  // 전달하는 value가 theme.spaces에 존재하는지 체크 존재하면 values는 SpaceThemeKeys이다.
  return Object.keys(theme.spaces).filter(space => space === value).length > 0;
}

function isColorThemeKey(value: unknown, theme: AppTheme): value is ColorThemeKeys {
  return Object.keys(theme.colors).filter(color => color === value).length > 0;
}

function isFontSizesThemeKey(value: unknown, theme: AppTheme): value is FontSizeThemeKeys {
  return Object.keys(theme.fontSizes).filter(fontSize => fontSize === value).length > 0;
}

function isLineHeightThemeKey(value: unknown, theme: AppTheme): value is LineHeightThemeKeys {
  return Object.keys(theme.lineHeights).filter(lineHeight => lineHeight === value).length > 0;
}

function isLetterSpacingKey(value: unknown, theme: AppTheme): value is LetterSpacingsKeys {
  return (
    Object.keys(theme.letterSpacings).filter(letterSpacing => letterSpacing === value).length > 0
  );
}

// 각 Theme의 키의 타입
// eslint-disable-next-line
export type Space = SpaceThemeKeys;
// eslint-disable-next-line
export type Color = ColorThemeKeys;
// eslint-disable-next-line
export type FontSize = FontSizeThemeKeys;
// eslint-disable-next-line
export type LineHeight = LineHeightThemeKeys;
// eslint-disable-next-line
export type letterSpacings = LetterSpacingsKeys;

// 브레이크 포인트
const BREAKPOINTS: { [unit: string]: string } = {
  sm: '640px', // 640px 이상,
  md: '768px', // 768px이상
  lg: '1024px', // 1024px이상
  xl: '1280px', // 1280px이상
};

/**
 * Responsive 타입을 css 속성과 그 값을 반환
 * @param propKey Css 속성
 * @param prop Responsive 타입
 * @param theme theme AppTheme
 * @returns CSS속성과 그 값 (style 속성...)
 */
export function toPropValue<T>(propKey: string, prop?: ResponsiveProp<T>, theme?: AppTheme) {
  if (prop === undefined) {
    return prop;
  }

  // 반응형 타입인지 확인하는 함수
  if (isResponsivePropType(prop)) {
    const result = [];
    for (const responsiveKey in prop) {
      switch (responsiveKey) {
        case 'base':
          result.push(`${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)}`);
          break;
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl': {
          // 미디어 쿼리 스타일
          const breakPoints = BREAKPOINTS[responsiveKey]; // unit에 맞은 최소 너비값을 할당한다.
          const style = `${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)}`; // 스타일을 만든다?
          result.push(`@media screen and (min-width: ${breakPoints}) {${style}}`);
          break;
        }
      }
    }
    return result.join('\n');
  }

  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)}`;
}

// 여백
const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-left',
  'margin-right',
  'margin-bottom',
  'padding',
  'padding-top',
  'padding-left',
  'padding-right',
  'padding-bottom',
]);

const COLOR_KEYS = new Set(['color', 'background-color']); // 색상
const FONT_SIZE_KEYS = new Set(['font-size']); // 글자 크기
const LETTER_SPACE_KEYS = new Set(['letter-spacing']); // 글자 사이 간격
const LINE_HEIGHT_KEYS = new Set(['line-height']); // 줄 높이

function toThemeValueIfNeeded<T>(propKey: string, prop?: Responsive<T>, theme?: AppTheme) {
  if (theme == undefined) return;

  if (theme.spaces && SPACE_KEYS.has(propKey) && isSpaceThemeKey(prop, theme)) {
    return theme.spaces[prop];
  } else if (theme.colors && COLOR_KEYS.has(propKey) && isColorThemeKey(prop, theme)) {
    return theme.colors[prop];
  } else if (theme.fontSizes && FONT_SIZE_KEYS.has(propKey) && isFontSizesThemeKey(prop, theme)) {
    return theme.fontSizes[prop];
  } else if (
    theme.letterSpacings &&
    LETTER_SPACE_KEYS.has(propKey) &&
    isLetterSpacingKey(prop, theme)
  ) {
    return theme.letterSpacings[prop];
  } else if (
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKey(prop, theme)
  ) {
    return theme.lineHeights[prop];
  }
}

// base, sm, md, lg, xl속성을 prop객체에서 가지고 있으면 반응형 타입
function isResponsivePropType<T>(prop: ResponsiveProp<T>): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  );
}
