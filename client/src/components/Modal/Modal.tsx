import { ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  show: boolean
  onClose: () => void
  position: {
    top: number
    left: number
  }
  children: ReactNode
}

const Modal = ({ show, onClose, position, children }: ModalProps) => {
  if (!show) return null

  return (
    <div
      className={styles.modalOverlay}
      style={{ position: 'fixed', top: position.top, left: position.left }}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
