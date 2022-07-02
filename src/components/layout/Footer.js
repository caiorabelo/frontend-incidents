import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy_right}>
        <span>Incidentes</span> &copy; 2022
      </p>
    </footer>
  )
}

export default Footer
