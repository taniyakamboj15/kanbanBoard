export interface ThemeColors {
  primary: Record<number, string>;
}

export interface ColumnTheme {
  bg: string;
  border: string;
  text: string;
  badge: string;
  icon: string;
  label: string;
  button: string;
  swatch: string;
}

export type ColumnColorVariant = Record<string, ColumnTheme>;
