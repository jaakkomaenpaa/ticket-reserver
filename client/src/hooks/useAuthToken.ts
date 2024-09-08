import { useContext } from 'react'
import { TokenContext } from '../contexts/TokenContext'

export const useAuthToken = () => useContext(TokenContext)
