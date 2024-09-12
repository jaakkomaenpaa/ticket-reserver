import { CSSProperties, ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  show: boolean
  onClose: () => void
  position: {
    top?: number
    left?: number
    right?: number
    bottom?: number
  }
  children: ReactNode
  includeCloseButton?: boolean
  customStyles?: CSSProperties
}

const Modal = ({
  show,
  onClose,
  position,
  children,
  includeCloseButton,
  customStyles,
}: ModalProps) => {
  if (!show) return null

  return (
    <div
      className={styles.modalOverlay}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        ...customStyles,
      }}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
        {includeCloseButton && (
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
        )}
      </div>
    </div>
  )
}

export default Modal
