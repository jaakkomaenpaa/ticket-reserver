import { Theme } from "./types"

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
  [Theme.Purple]: {
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
  },
  [Theme.Blue]: {
    ...themeDefaults,
    colors: {
      primary: '#0D47A1',
      secondary: '#BBDEFB',
      section1: '#BBDEFB',
      section2: '#E3F2FD',
      section3: '#90CAF9',
      background: '#F4F8FB',
      tertiary: '#E3F2FD ',
      accent: '#1565C0',
      defaultText: '#333333',
      accentText: '#F4F8FB',
      primaryBorderShadow: 'rgba(13, 71, 161, 0.5)',
      error: '#cf0000',
    },
  },
  [Theme.Orange]: {
    ...themeDefaults,
    colors: {
      primary: '#FF6F00',
      secondary: '#FFE0B2',
      section1: '#FFE0B2',
      section2: '#FFF3E0',
      section3: '#FFB74D',
      background: '#F4F8FB',
      tertiary: '#FFF3E0',
      accent: '#FF6F00',
      defaultText: '#333333',
      accentText: '#F4F8FB',
      primaryBorderShadow: 'rgba(255, 111, 0, 0.5)',
      error: '#cf0000',
    },
  },
  [Theme.Green]: {
    ...themeDefaults,
    colors: {
      primary: '#2E7D32',
      secondary: '#C8E6C9',
      section1: '#C8E6C9',
      section2: '#E8F5E9',
      section3: '#A5D6A7',
      background: '#F4F8FB',
      tertiary: '#E8F5E9',
      accent: '#1B5E20',
      defaultText: '#333333',
      accentText: '#F4F8FB',
      primaryBorderShadow: 'rgba(46, 125, 50, 0.5)',
      error: '#cf0000',
    },
  }  
} as const
