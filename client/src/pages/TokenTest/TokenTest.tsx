import { useEffect, useState } from 'react'
import { IoSend, IoTrashOutline } from 'react-icons/io5'
import styles from './TokenTest.module.css'
import { ApiTicketVariant, ProductInfo, ReservationStatus } from '../../types'
import { testAuthToken } from '../../bot/scripts'
import config from '../../config'
import kideService from '../../services/kide'
import { formatDate } from '../../utils'
import { useAuthToken } from '../../hooks/useAuthToken'
import Loader from '../../components/Loader'

const TokenTest = () => {
  const [authToken, setAuthToken] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false)
  const [testStatusText, setTestStatusText] = useState<string>('')
  const [isTestOk, setIsTestOk] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { savedToken, setSavedToken, removeSavedToken } = useAuthToken()

  useEffect(() => {
    const getTestStatus = async () => {
      const event: ProductInfo | null = await kideService.getEvent(
        config.TEST_EVENT_URL
      )

      // No event or sales not open
      if (!event || new Date().getTime() > event.salesUntil.getTime()) {
        setTestStatusText('Invalid')
        setIsTestOk(false)
        return
      }

      // No tickets available
      if (
        event.variants.every(
          (variant: ApiTicketVariant) => variant.availability === 0
        )
      ) {
        setTestStatusText('Invalid')
        setIsTestOk(false)
        return
      }

      setTestStatusText(`Valid until ${formatDate(event.salesUntil)} at latest`)
      setIsTestOk(true)
    }
    getTestStatus()

    if (savedToken) {
      setAuthToken(savedToken)
    } else {
      setAuthToken('')
    }
  }, [savedToken])

  const testToken = async () => {
    if (authToken.length === 0) {
      setErrorMessage('')
      return
    }

    setIsLoading(true)
    const status: ReservationStatus = await testAuthToken(authToken, setErrorMessage)

    if (status === ReservationStatus.Success) {
      setIsTokenValid(true)
      setSavedToken(authToken)
      setErrorMessage('')
    } else {
      setIsTokenValid(false)
      removeSavedToken()
    }

    setIsLoading(false)
  }

  const clearToken = async () => {
    removeSavedToken()
    setAuthToken('')
    setErrorMessage('')
    setIsTokenValid(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <p className={styles.header}>Test bearer token (optional)</p>
        <div className={styles.infoText}>
          <p className={styles.infoLabel}>Test status:</p>
          <p className={isTestOk ? styles.statusTextValid : styles.statusTextInvalid}>
            {testStatusText}
          </p>
        </div>
      </div>

      <div className={styles.testContainer}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.testInput}
            type='text'
            value={authToken}
            placeholder='Bearer token'
            onChange={event => setAuthToken(event.target.value)}
          />
          <button className={styles.clearButton} onClick={clearToken}>
            <IoTrashOutline size={20} className={styles.trashIcon} />
          </button>
        </div>

        <button className={styles.testButton} onClick={testToken}>
          <IoSend size={16} className={styles.arrowIcon} />
        </button>
      </div>
      <div className={styles.tokenStatus}>
        {isLoading ? (
          <Loader size={20} />
        ) : (
          <div className={isTokenValid ? styles.successMessage : styles.errorText}>
            {isTokenValid ? 'Token is valid!' : `${errorMessage}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenTest
