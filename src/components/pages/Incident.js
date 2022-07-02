import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Incident.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import IncidentForm from '../incident/IncidentForm'
import Message from '../layout/Message'

import api from "../../services/api";


function Incident() {
  let { id } = useParams()
  const [errors, setErrors] = useState({})
  const [incident, setIncident] = useState([])
  const [showIncidentForm, setShowIncidentForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  useEffect(() => {
    getIncident(id)
  }, [id])

  function getIncident(id) {
    api
      .get(`/incidents/${id}`)
      .then((res) => {
        setIncident(res.data)
      })
  }

  function editPost(incident) {
    api
      .put(`/incidents/${incident.id}`, incident)
      .then((res) => {
        getIncident(incident.id)
        setErrors({})
        setShowIncidentForm(!showIncidentForm)
        setMessage('Incidente atualizado!')
        setType('success')
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
      });
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
                    errors={errors ?? null}
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
