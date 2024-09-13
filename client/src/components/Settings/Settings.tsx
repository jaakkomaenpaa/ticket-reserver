import { useEffect, useState } from 'react'
import styles from './Settings.module.css'
import { IoSettingsOutline } from 'react-icons/io5'
import Modal from '../Modal'
import { FontSelector, ThemeSelector } from '../Selectors'
import { LocalStorageKey, ReserveMode } from '../../types'

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [reserveMode, setReserveMode] = useState<ReserveMode>(ReserveMode.Default)

  useEffect(() => {
    const mode = window.localStorage.getItem(LocalStorageKey.ReservationMode)
    if (mode) {
      setReserveMode(mode as ReserveMode)
    }
  }, [])

  const position = {
    top: 40,
    right: 0,
  }

  const openModal = () => {
    setIsOpen(!isOpen)
  }

  const handleCheckbox = () => {
    const newMode =
      reserveMode === ReserveMode.Default ? ReserveMode.Test : ReserveMode.Default
    setReserveMode(newMode)
    window.localStorage.setItem(LocalStorageKey.ReservationMode, newMode)
  }

  return (
    <div className={styles.container}>
      <IoSettingsOutline
        size={30}
        className={isOpen ? styles.settingsIconActive : styles.settingsIcon}
        onClick={openModal}
      />
      <Modal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        customStyles={{
          position: 'absolute',
        }}
        includeCloseButton={true}
      >
        <div className={styles.modalContent}>
          {' '}
          <span className={styles.settingContainer}>
            <div className={styles.settingKey}>Font: </div>
            <div className={styles.settingValue}>
              <FontSelector customStyles={{ width: '150px' }} />
            </div>
          </span>
          <span className={styles.settingContainer}>
            <div className={styles.settingKey}>Theme:</div>
            <div className={styles.settingValue}>
              <ThemeSelector customStyles={{ width: '150px' }} />
            </div>
          </span>
          <span className={styles.settingContainer}>
            <div className={styles.settingKey}>Test mode?</div>
            <input
              className={styles.checkbox}
              type='checkbox'
              checked={reserveMode === ReserveMode.Test}
              onChange={handleCheckbox}
            />
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default Settings
