import { ChangeEvent, CSSProperties } from 'react'
import { Theme } from '../../types'
import styles from './Selectors.module.css'
import { useTheme } from '../../hooks/useTheme'

interface ThemeSelectorProps {
  customStyles?: CSSProperties
}

const ThemeSelector = ({ customStyles }: ThemeSelectorProps) => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value as Theme
    setTheme(selectedTheme)
  }

  return (
    <select
      className={styles.itemSelect}
      onChange={e => handleThemeChange(e)}
      value={theme}
      style={customStyles}
    >
      {Object.values(Theme).map((theme: Theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector
