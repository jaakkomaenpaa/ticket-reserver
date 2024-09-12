import { useContext } from 'react'
import { FontContext } from '../contexts/FontContext'

export const useFont = () => useContext(FontContext)
