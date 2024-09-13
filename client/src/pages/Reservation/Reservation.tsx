import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import config from '../../config'
import { initBot, startBot } from '../../bot/scripts'
import InfoBox from './InfoBox'
import styles from './Reservation.module.css'
import { useEvent } from '../../hooks/useEvent'
import { IoSend } from 'react-icons/io5'
import { useAuthToken } from '../../hooks/useAuthToken'

const Reservation = () => {
  const [accessAllowed, setAccessAllowed] = useState<boolean>(false)
  const [accessInput, setAccessInput] = useState<string>('')
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [saleStartTime, setSaleStartTime] = useState<Date | null>(null)
  const [statusList, setStatusList] = useState<string[]>([])
  const [eventUrl, setEventUrl] = useState<string>('')
  const [authToken, setAuthToken] = useState<string>('')
  const [ticketIndex, setTicketIndex] = useState<string>('')
  const [keyword, setKeyWord] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  const { eventId } = useEvent()
  const { savedToken } = useAuthToken()

  // Handle automatic event id and token placements
  useEffect(() => {
    if (eventId) {
      setEventUrl(eventId)
    }
    if (savedToken) {
      setAuthToken(savedToken)
    } else {
      setAuthToken('')
    }
  }, [eventId, savedToken])

  // Defina access and screen width
  useEffect(() => {
    if (window.localStorage.getItem(config.ACCESS_KEY) === 'true') {
      setAccessAllowed(true)
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Submit reservation and start bot
  const submit = async (event: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    event.preventDefault()
    if (!eventUrl || !authToken) {
      setError('Event url and auth token are required')
      return
    }
    setFormSubmitted(true)
    const userPreferences = {
      ticketIndex: parseInt(ticketIndex) || 0,
      keyword: keyword || '',
    }
    const bot = await initBot(eventUrl, authToken, userPreferences, sendStatusMessage)
    if (!bot) {
      return
    }

    setSaleStartTime(bot.saleStartTime)
    await startBot(bot)
  }

  const sendStatusMessage = (message: string) => {
    setStatusList(prevStatusList => [...prevStatusList, message])
  }

  // A very low-effort access control mechanism
  const handleAccess = () => {
    if (accessInput === config.ACCESS_CODE) {
      window.localStorage.setItem(config.ACCESS_KEY, 'true')
      setAccessAllowed(true)
      setError('')
    } else {
      setError('Incorrect access code')
    }
  }

  if (!accessAllowed) {
    return (
      <div className={styles.container}>
        <div className={styles.accessContainer}>
          <input
            className={styles.accessInput}
            type='text'
            value={accessInput}
            placeholder='Access code'
            onChange={event => setAccessInput(event.target.value)}
          />
          <button className={styles.accessButton} onClick={handleAccess}>
            <IoSend size={16} className={styles.arrowIcon} />
          </button>
        </div>
        <div className={styles.errorText}>{error}</div>
      </div>
    )
  }

  if (formSubmitted) {
    return (
      <div className={styles.container}>
        <InfoBox statusList={statusList} saleStartTime={saleStartTime} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <form className={styles.reservationForm} onSubmit={submit}>
        <p className={styles.header}>Reservation form</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              id='eventUrl'
              placeholder={isSmallScreen ? 'Event url' : ''}
              className={styles.input}
              type='text'
              value={eventUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEventUrl(e.target.value)
              }
            />
            <label htmlFor='eventUrl'>Event url</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id='authToken'
              placeholder={isSmallScreen ? 'Bearer token' : ''}
              className={styles.input}
              type='text'
              value={authToken}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAuthToken(e.target.value)
              }
            />
            <label htmlFor='authToken'>Bearer token</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id='ticketIndex'
              placeholder={isSmallScreen ? 'Ticket index' : ''}
              className={styles.input}
              type='text'
              value={ticketIndex}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTicketIndex(e.target.value)
              }
            />
            <label htmlFor='ticketIndex'>Ticket index</label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id='keyword'
              placeholder={isSmallScreen ? 'Keyword' : ''}
              className={styles.input}
              type='text'
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setKeyWord(e.target.value)
              }
            />
            <label htmlFor='keyword'>Keyword</label>
          </div>
        </div>
        <div className={styles.errorText}>{error}</div>
        <button type='submit' className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Reservation
