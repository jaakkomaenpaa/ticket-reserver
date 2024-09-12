import { createContext, ReactNode, useState } from 'react'
import { Font, LocalStorageKey } from '../types'

interface FontContextType {
  font: Font
  setFont: (font: Font) => void
}

export const getFont = (): Font => {
  const font = window.localStorage.getItem(LocalStorageKey.Font)
  if (font) {
    return font as Font
  }
  return Font.SegoeUI
}

const defaultContextValue = {
  font: getFont(),
  setFont: (font: Font) => {},
}

export const FontContext = createContext<FontContextType>(defaultContextValue)

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFontLoc] = useState<Font>(defaultContextValue.font)

  const setFont = (font: Font) => {
    setFontLoc(font)
    document.documentElement.style.setProperty('--selected-font', font)
    window.localStorage.setItem(LocalStorageKey.Font, font)
  }

  return (
    <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>
  )
}
