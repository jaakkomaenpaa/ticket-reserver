import { useState, useEffect } from 'react'
import { formatTime, sleep } from '../../utils'
import styles from './Timer.module.css'

interface TimerProps {
  saleStartTime: Date
}

// Displays a timer that starts a countdown until the sale starting time
const Timer = ({ saleStartTime }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    saleStartTime.getTime() - new Date().getTime()
  )

  useEffect(() => {
    const countdown = async () => {
      if (timeLeft > 0) {
        await sleep(1000)
        setTimeLeft(saleStartTime.getTime() - new Date().getTime())
      }
    }
    countdown()
  }, [timeLeft, saleStartTime])

  return (
    <div className={styles.timer}>
      {timeLeft <= 0 ? 'Sale has started' : `Sale starts in: ${formatTime(timeLeft)}`}
    </div>
  )
}

export default Timer
