import 'styled-components';

type ThemeType = typeof import('@/utils').colors.dark;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
