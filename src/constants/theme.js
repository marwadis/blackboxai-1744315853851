import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#0066CC',     // Trust-building blue
  secondary: '#00A859',   // Success green
  accent: '#FF6B00',      // CTA orange
  background: '#FFFFFF',  // Clean white
  surface: '#F5F5F5',    // Light gray for cards
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    disabled: '#9E9E9E',
  },
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',
  info: '#17A2B8'
};

export const FONTS = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  light: 'Roboto-Light',
};

export const SIZES = {
  // Base sizing
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,

  // Spacing
  padding: {
    small: 10,
    medium: 15,
    large: 20,
    xlarge: 25,
  },

  // Radius
  radius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
  }
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.accent,
    background: COLORS.background,
    surface: COLORS.surface,
    text: COLORS.text.primary,
    error: COLORS.error,
  },
  fonts: FONTS,
  sizes: SIZES,
};
