import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Incident.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import IncidentForm from '../incident/IncidentForm'
import Message from '../layout/Message'


function Incident() {
  let { id } = useParams()
  const [incident, setIncident] = useState([])
  const [showIncidentForm, setShowIncidentForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:8000/api/incidents/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setIncident(data)
          }),
      0,
    )
  }, [id])

  function editPost(incident) {
    fetch(`http://localhost:8000/api/incidents/${incident.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incident),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Retorno da autalização',data)
        // setIncident(data)
        setShowIncidentForm(!showIncidentForm)
        setMessage('Incidente atualizado!')
        setType('success')
      })
  }

  function toggleIncidentForm() {
    setShowIncidentForm(!showIncidentForm)
  }

  return (
    <>
      {incident.title ? (
        <div className={styles.incident_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Incidente: {incident.title}</h1>
              <button className={styles.btn} onClick={toggleIncidentForm}>
                {!showIncidentForm ? 'Editar incidente' : 'Fechar'}
              </button>
              {!showIncidentForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Descrição:</span> {incident.description}
                  </p>
                  <p>
                    <span>Criticidade:</span> {incident.criticalityName}
                  </p>
                  <p>
                    <span>Tipo:</span> {incident.typeName}
                  </p>
                  <p>
                    <span>Status:</span> {incident.status ? "Ativo" : "Inativo"}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <IncidentForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    incidentData={incident}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Incident
