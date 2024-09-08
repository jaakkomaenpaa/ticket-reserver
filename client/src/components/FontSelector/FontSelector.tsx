import { ChangeEvent, useEffect, useState } from 'react'
import styles from './FontSelector.module.css'
import '../../index.css'
import { Font, LocalStorageKey } from '../../types'
import { fonts } from '../../data/fonts'

const FontSelector = () => {
  const [currentFont, setCurrentFont] = useState<Font>(Font.ComicSans)

  useEffect(() => {
    const font = window.localStorage.getItem(LocalStorageKey.Font)
    if (font) {
      setCurrentFont(font as Font)
      document.documentElement.style.setProperty('--selected-font', font as Font)
    }
  }, [])

  const handleFontChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value as Font
    setCurrentFont(selectedFont)
    document.documentElement.style.setProperty('--selected-font', selectedFont)
    window.localStorage.setItem(LocalStorageKey.Font, selectedFont)
  }

  return (
    <select
      className={styles.fontSelect}
      value={currentFont}
      onChange={handleFontChange}
    >
      {Object.values(Font).map((font: Font) => (
        <option
          key={font}
          value={fonts[font].value}
          style={{ fontFamily: fonts[font].value }}
        >
          {fonts[font].display}
        </option>
      ))}
    </select>
  )
}

export default FontSelector
