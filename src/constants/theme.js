import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#2563EB',     // Modern blue
  secondary: '#10B981',   // Fresh green
  accent: '#F59E0B',      // Warm orange
  background: '#FFFFFF',  
  surface: '#F8FAFC',    // Light gray background
  text: {
    primary: '#1E293B',   // Slate-900
    secondary: '#64748B', // Slate-500
    disabled: '#CBD5E1',  // Slate-300
  },
  error: '#EF4444',      // Red-500
  success: '#10B981',    // Green-500
  warning: '#F59E0B',    // Amber-500
  info: '#3B82F6',       // Blue-500
  card: {
    background: '#FFFFFF',
    border: '#E2E8F0',   // Slate-200
    shadow: 'rgba(0, 0, 0, 0.1)',
  }
};

export const FONTS = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
  light: 'Inter-Light',
};

export const SIZES = {
  // Base sizing
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,

  // Spacing
  padding: {
    small: 10,
    medium: 15,
    large: 20,
    xlarge: 25,
    xxlarge: 30,
  },

  // Radius
  radius: {
    small: 6,
    medium: 12,
    large: 16,
    xlarge: 24,
    full: 9999,
  }
};

// Shadows
export const SHADOWS = {
  small: {
    shadowColor: COLORS.card.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.card.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.card.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
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
  shadows: SHADOWS,
};
