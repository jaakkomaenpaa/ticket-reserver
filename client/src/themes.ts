export const themeDefaults = {
  fontSizes: {
    body: '14px',
    subheading: '16px',
    header: '20px',
  },
  fontWeights: {
    bold: '700',
  },
} as const

export const themes = {
  ...themeDefaults,
  colors: {
    primary: '#6A0DAD',
    secondary: '#D3BCE5',
    section1: '#D3BCE5',
    section2: '#E6E6FA',
    section3: '#C8A2C8',
    background: '#F4F8FB',
    tertiary: '#E6E6FA',
    accent: '#4B0082',
    defaultText: '#333333',
    accentText: '#F4F8FB',
    primaryBorderShadow: 'rgba(106, 13, 173, 0.5)',
    error: '#cf0000',
  },
} as const
