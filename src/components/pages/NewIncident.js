import { useHistory } from 'react-router-dom'
import IncidentForm from '../incident/IncidentForm'
import styles from './NewIncident.module.css'
import api from "../../services/api";

function NewIncident() {
  const history = useHistory()

  function createIncident(incident) {
    api
      .post("/incidents", incident,{
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => history.push('/incidents', { message: 'Incidente criado com sucesso!' }))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

    // fetch('http://localhost:8000/api/incidents', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(incident),
    // })
    //   .then((data) => {
    //     console.log('Retorno Incident Post', data)
    //     if (data.errors) {
    //       alert(data.message);
    //     } else {
    //       history.push('/incidents', { message: 'Incidente criado com sucesso!' })
    //     }
    //   })
  }

  return (
    <div className={styles.newincident_container}>
      <h1>Criar Incidente</h1>
      <p>Crie seu incidente para depois adicionar os serviços</p>
      <IncidentForm handleSubmit={createIncident} btnText="Criar Incidente" />
    </div>
  )
}

export default NewIncident

