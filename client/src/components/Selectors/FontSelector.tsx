import { CSSProperties } from 'react'
import styles from './Selectors.module.css'
import '../../index.css'
import { Font } from '../../types'
import { fonts } from '../../data/fonts'
import { useFont } from '../../hooks/useFont'

interface FontSelectorProps {
  customStyles?: CSSProperties
}

const FontSelector = ({ customStyles }: FontSelectorProps) => {
  const { font, setFont } = useFont()

  return (
    <select
      className={styles.itemSelect}
      onChange={e => setFont(e.target.value as Font)}
      value={font}
      style={customStyles}
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
