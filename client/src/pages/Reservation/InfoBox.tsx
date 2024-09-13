import Card from '../../components/Card'
import Timer from '../../components/Timer'
import styles from './Reservation.module.css'

interface InfoBoxProps {
  statusList: string[]
  saleStartTime: Date | null
}

// Holds a list of status messages that occur during reservation process
const InfoBox = ({ statusList, saleStartTime }: InfoBoxProps) => {
  return (
    <Card customStyles={{ alignItems: 'center',  width: '80%'}}>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          Refreshing the page will stop the reservation process.
        </p>
        {saleStartTime !== null ? <Timer saleStartTime={saleStartTime} /> : null}
        <div className={styles.statusList}>
          {statusList.map(message => (
            <div className={styles.statusMessage} key={message}>
              {message}
            </div>
          ))}
        </div>
        <button
          className={styles.stopButton}
          onClick={() => window.location.reload()}
        >
          Stop
        </button>
      </div>
    </Card>
  )
}

export default InfoBox
