import { useState } from 'react'
import styles from './Settings.module.css'
import { IoSettingsOutline } from 'react-icons/io5'
import Modal from '../Modal'
import { FontSelector, ThemeSelector } from '../Selectors'

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const position = {
    top: 40,
    right: 0,
  }

  const openModal = () => {
    setIsOpen(!isOpen)
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
          <div className={styles.fontContainer}>
            <div className={styles.settingKey}>Font: </div>
            <div className={styles.settingValue}>
              <FontSelector customStyles={{ width: '150px' }} />
            </div>
          </div>
          <div className={styles.themeContainer}>
            <div className={styles.settingKey}>Theme:</div>
            <div className={styles.settingValue}>
              <ThemeSelector customStyles={{ width: '150px' }} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Settings
