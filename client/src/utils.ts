import config from './config'
import { ApiProduct } from './types'

export const themeToCssVariables = (theme: Record<string, any>) => {
  const toCssVariables = (obj: Record<string, any>, prefix: string = '--') => {
    return Object.entries(obj)
      .map(([key, value]): string => {
        if (typeof value === 'object') {
          return toCssVariables(value, `${prefix}${key}-`)
        }
        return `${prefix}${key}: ${value};`
      })
      .join('\n')
  }
  return toCssVariables(theme)
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours}h ${minutes}m ${seconds}s`
}

export const formatDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if (hours.length === 1) {
    hours = '0' + hours
  }

  if (minutes.length === 1) {
    minutes += '0'
  }

  return `${day}.${month}.${year} @${hours}:${minutes}`
}

export const reverseString = (string: string): string => {
  return string.split('').reverse().join('')
}

export const getRequestId = (inventoryId: string): string => {
  const secret: string = config.SECRET
  return btoa(
    [...inventoryId.replace(/-/g, '')]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ secret.charCodeAt(i))
      )
      .join('')
  ).substring(0, 8)
}

// Get event id from full url
export const stripIdFromUrl = (url: string): string => {
  if (!url.includes('/')) {
    return url
  }
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export const processProducts = (products: ApiProduct[]) => {
  return products
    .filter((product: ApiProduct) => !product.salesStarted)
    .sort(
      (a: ApiProduct, b: ApiProduct) =>
        new Date(a.dateSalesFrom).getTime() - new Date(b.dateSalesFrom).getTime()
    )
}
