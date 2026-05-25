export const Colors = {
  primary: '#1A3C6E',    // ITB deep navy
  secondary: '#2D7DD2',  // medium blue
  accent: '#F5A623',     // warm amber
  background: '#F7F8FA', // off-white
  surface: '#FFFFFF',    // white
  textDark: '#1C1C1E',
  textMuted: '#8E8E93',
  success: '#34C759',
  error: '#FF3B30',
  divider: '#E5E5EA',

  // Themed color sets (used by template components: ThemedText, ThemedView, Collapsible)
  light: {
    text: '#1C1C1E',
    background: '#F7F8FA',
    tint: '#1A3C6E',
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#1A3C6E',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#ABC7FF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ABC7FF',
  },
};

export const Fonts = {
  mono: 'Inter-Regular',
  rounded: 'Inter-Bold',
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.textDark,
  },
  h2: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.textDark,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.textDark,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
  },
  button: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: Colors.surface,
  },
};

export const Radius = {
  card: 16,
  input: 12,
  chip: 8,
  full: 999,
};

export const Shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    // Web-compatible shadow using boxShadow
    ...(typeof window !== 'undefined' ? {
      boxShadow: 'rgba(0, 0, 0, 0.07) 0px 2px 12px'
    } : {})
  },
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};
