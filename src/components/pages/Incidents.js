import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Container from '../layout/Container'
import Loading from '../layout/Loading'

import LinkButton from '../layout/LinkButton'
import IncidentCard from '../incident/IncidentCard'
import Message from '../layout/Message'

import styles from './Incidents.module.css'

function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [incidentMessage, setIncidentMessage] = useState('')

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch('http://localhost:8000/api/incidents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setIncidents(data)
            setRemoveLoading(true)
          }),
      100,
    )
  }, [])

  async function removeIncident(id) {
    await fetch(`http://localhost:8000/api/incidents/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIncidents(incidents.filter((incident) => incident.id !== id))
        setIncidentMessage('Incidente removido com sucesso!')
      })
  }

  return (
    <div className={styles.incident_container}>
      <div className={styles.title_container}>
        <h1>Incidentes</h1>
        <LinkButton to="/newincident" text="Criar incidente" />
      </div>
      {message && <Message type="success" msg={message} />}
      {incidentMessage && <Message type="success" msg={incidentMessage} />}
      <Container>
        {incidents.length > 0 &&
          incidents.map((incident) => (
            <IncidentCard
              id={incident.id}
              title={incident.title}
              description={incident.description}
              criticality={incident.criticality}
              type={incident.type}
              status={incident.status}
              key={incident.id}
              handleRemove={removeIncident}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && incidents.length === 0 && (
          <p>Não há incidentes cadastrados!</p>
        )}
      </Container>
    </div>
  )
}

export default Incidents
