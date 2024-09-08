import { Font } from '../types'

interface FontInfo {
  display: string
  value: string
}

export const fonts: Record<Font, FontInfo> = {
  [Font.Arial]: {
    display: 'Arial',
    value: 'Arial, Helvetica, sans-serif',
  },
  [Font.ComicSans]: {
    display: 'Comic Sans',
    value: 'cursive',
  },
  [Font.CourierNew]: {
    display: 'Courier New',
    value: '"Courier New", Courier, monospace',
  },
  [Font.GillSans]: {
    display: 'Gill Sans',
    value: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
  },
  [Font.LucidaSans]: {
    display: 'Lucida Sans',
    value: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif'
  },
  [Font.Monospace]: {
    display: 'Monospace',
    value: 'monospace',
  },
  [Font.SegoeUI]: {
    display: 'Segoe UI',
    value: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  [Font.TimesNewRoman]: {
    display: 'Times New Roman',
    value: '"Times New Roman", Times, serif',
  },
}
