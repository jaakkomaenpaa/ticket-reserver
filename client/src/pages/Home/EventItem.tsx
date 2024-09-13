import { MouseEvent, useState } from 'react'
import { ApiProduct } from '../../types'
import styles from './Home.module.css'
import Modal from '../../components/Modal'
import { formatDate } from '../../utils'
import { useEvent } from '../../hooks/useEvent'

interface EventItemProps {
  event: ApiProduct
}

const EventItem = ({ event }: EventItemProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalStyle, setModalStyle] = useState({ top: 0, left: 0 })
  const { setEventId } = useEvent()

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setModalStyle({
      top: rect.top - rect.height - 60,
      left: rect.left
    })
    setShowModal(true)
  }

  const handleMouseLeave = () => {
    setShowModal(false)
  }

  const setToReserve = () => {
    setEventId(event.id)
  }

  return (
    <div
      className={styles.eventContainer}
      onMouseEnter={e => handleMouseEnter(e)}
      onMouseLeave={handleMouseLeave}
      onClick={setToReserve}
    >
      {event.name}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        position={{ top: modalStyle.top, left: modalStyle.left }}
      >
        <div className={styles.eventContent}>
          <a href={`https://kide.app/events/${event.id}`} target='blank'>
            Link to event
          </a>
          <div>Date: {formatDate(new Date(event.dateActualFrom))}</div>
          <div>Place: {event.place}</div>
          <div>Sales: {formatDate(new Date(event.dateSalesFrom))}</div>
        </div>
      </Modal>
    </div>
  )
}

export default EventItem
