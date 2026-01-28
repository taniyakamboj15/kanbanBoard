import { COLUMN_COLOR_VARIANTS } from '../constants';
import { DEFAULT_COLUMN_THEMES } from '../constants/componentConfig';

export type ColumnTheme = {
  bg: string;
  border: string;
  text: string;
  badge: string;
  icon: string;
  label: string;
  button: string;
  swatch: string;
};

const DEFAULT_THEME = COLUMN_COLOR_VARIANTS.slate as ColumnTheme;
export const getColumnTheme = (id: string, color?: string): ColumnTheme => {
  const themeKey = DEFAULT_COLUMN_THEMES[id as keyof typeof DEFAULT_COLUMN_THEMES] ?? color;
  
  if (themeKey && themeKey in COLUMN_COLOR_VARIANTS) {
    return COLUMN_COLOR_VARIANTS[themeKey]!;
  }
  
  return DEFAULT_THEME;
};
