import styles from './Home.module.css'
import incident from '../../img/incident.png'

import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao <span>Sistema de Incidentes</span>
      </h1>
      <p>Comece a gerenciar os incidentes agora!</p>
      <LinkButton to="/newincident" text="Novo Incidente" />
      <img src={incident} alt="Incident"/>
    </section>
  )
}

export default Home
