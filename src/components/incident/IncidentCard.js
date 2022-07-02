import { Link } from 'react-router-dom'
import styles from './IncidentCard.module.css'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function IncidentCard({ id, title, description, criticality, type, status, handleRemove }) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }

  return (
    <div className={styles.incident_card}>
      <h4>{title}</h4>
      <p>
        <span>Descrição:</span> {description}
      </p>
      <p>
        <span>Criticidade:</span> {criticality}
      </p>
      <p>
        <span>Tipo:</span> {type}
      </p>
      <p>
        <span>Status:</span> {status ? "Ativo" : "Inativo"}
      </p>
      
      <div className={styles.incident_card_actions}>
        <Link to={'/incident/' + id}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default IncidentCard
