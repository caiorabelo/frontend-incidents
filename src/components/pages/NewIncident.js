import { useHistory } from 'react-router-dom'
import { useState} from 'react'
import IncidentForm from '../incident/IncidentForm'
import styles from './NewIncident.module.css'
import api from "../../services/api";

function NewIncident() {
  const history = useHistory()
  const [errors, setErrors] = useState({})

  function createIncident(incident) {
    api
      .post("/incidents", incident)
      .then(() => {
        setErrors({})
        history.push('/incidents', { message: 'Incidente criado com sucesso!' })
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
      });
  }

  return (
    <div className={styles.newincident_container}>
      <h1>Criar Incidente</h1>
      <p>Crie seu incidente para depois adicionar os serviços</p>
      <IncidentForm handleSubmit={createIncident} errors={errors} btnText="Criar Incidente" />
    </div>
  )
}

export default NewIncident

