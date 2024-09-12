import { createContext, ReactNode, useState } from 'react'
import { LocalStorageKey, Theme } from '../types'
import { themeToCssVariables } from '../utils'
import { themes } from '../themes'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const getTheme = () => {
  const theme = window.localStorage.getItem(LocalStorageKey.Theme)
  if (theme) {
    return theme as Theme
  }
  return Theme.Purple
}

const defaultContextValue = {
  theme: getTheme(),
  setTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeLoc] = useState<Theme>(defaultContextValue.theme)

  const setTheme = (theme: Theme) => {
    setThemeLoc(theme)
    const cssVariables = themeToCssVariables(themes[theme])

    const styleElement = document.createElement('style')
    styleElement.textContent = `:root { ${cssVariables} }`
    document.head.appendChild(styleElement)

    window.localStorage.setItem(LocalStorageKey.Theme, theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
