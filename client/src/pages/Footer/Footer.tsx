import styles from './Footer.module.css'
import config from '../../config'

const Footer = () => {
  return <div className={styles.container}>Version {config.CURRENT_VERSION}</div>
}

export default Footer
