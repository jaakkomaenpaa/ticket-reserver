import { createContext, ReactNode, useState } from 'react'
import { LocalStorageKey } from '../types'

interface TokenContextType {
  savedToken: string
  setSavedToken: (token: string) => void
  removeSavedToken: () => void
}

const getToken = () => {
  const token = window.localStorage.getItem(LocalStorageKey.KideAuthToken)
  if (token) {
    return token
  }
  return ''
}

const defaultContextValue: TokenContextType = {
  savedToken: getToken(),
  setSavedToken: (token: string) => {},
  removeSavedToken: () => {},
}

export const TokenContext = createContext<TokenContextType>(defaultContextValue)

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [savedToken, setSavedTokenLoc] = useState<string>(
    defaultContextValue.savedToken
  )

  const setSavedToken = (token: string) => {
    setSavedTokenLoc(token)
    window.localStorage.setItem(LocalStorageKey.KideAuthToken, token)
  }

  const removeSavedToken = async () => {
    setSavedTokenLoc('')
    window.localStorage.removeItem(LocalStorageKey.KideAuthToken)
  }

  return (
    <TokenContext.Provider value={{ savedToken, setSavedToken, removeSavedToken }}>
      {children}
    </TokenContext.Provider>
  )
}
