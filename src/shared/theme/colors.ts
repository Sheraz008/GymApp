export const colors = {
  // Primary colors
  primary: '#28A745',
  primaryDark: '#E55D00',
  primaryLight: '#FF8533',
  
  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#121212',
  card: '#F5F5F5',
  cardDark: '#1E1E1E',
  
  // Text colors
  text: '#1A1A1A',
  textDark: '#FFFFFF',
  textSecondary: '#666666',
  textSecondaryDark: '#B3B3B3',
  
  // UI colors
  border: '#E0E0E0',
  borderDark: '#333333',
  success: '#28A745',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
};

export type ColorScheme = 'light' | 'dark';

export const getThemeColors = (scheme: ColorScheme) => ({
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  primaryLight: colors.primaryLight,
  background: scheme === 'dark' ? colors.backgroundDark : colors.background,
  card: scheme === 'dark' ? colors.cardDark : colors.card,
  text: scheme === 'dark' ? colors.textDark : colors.text,
  textSecondary: scheme === 'dark' ? colors.textSecondaryDark : colors.textSecondary,
  border: scheme === 'dark' ? colors.borderDark : colors.border,
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
  info: colors.info,
  white: colors.white,
  black: colors.black,
});
