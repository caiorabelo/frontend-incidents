import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import Switch from '../form/Switch'
import SubmitButton from '../form/SubmitButton'

import styles from './IncidentForm.module.css'

function IncidentForm({ handleSubmit, btnText, incidentData }) {
  const defaultIncident = {
    title: '',
    description: '',
    criticality_id: null,
    type_id: null,
    status: true
  }
  const [incident, setIncident] = useState(incidentData || defaultIncident)
  const [criticalities, setCriticalities] = useState([])
  const [types, setTypes] = useState([])
  const [status, setStatus] = useState(incident.status)

  useEffect(() => {
    fetch('http://localhost:8000/api/criticalities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCriticalities(data)
      })

    fetch('http://localhost:8000/api/types', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTypes(data)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(incident)
    console.log(incident)
  }

  function handleChange(e) {
    setIncident({ ...incident, [e.target.name]: e.target.value })
  }

  function handleChangeSelect(e) {
    setIncident({
      ...incident,
      [e.target.name]: e.target.value
    })
  }

  function handleStatus(e) {
    let statusUpdated = !status
    setStatus(statusUpdated)
    setIncident({
      ...incident,
      status: statusUpdated
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Título"
        name="title"
        placeholder="Insira o título do incidente"
        handleOnChange={handleChange}
        value={incident.title}
      />
      <Input
        type="text"
        text="Descrição"
        name="description"
        placeholder="Insira a descrição do incidente"
        handleOnChange={handleChange}
        value={incident.description}
      />
      <Select
        name="criticality_id"
        text="Selecione a criticidade"
        options={criticalities}
        handleOnChange={handleChangeSelect}
        value={incident.criticality_id}
      />
      <Select
        name="type_id"
        text="Selecione um tipo"
        options={types}
        handleOnChange={handleChangeSelect}
        value={incident.type_id}
      />

      <Switch
        name="status"
        id="status"
        checked={status ? "checked" : ""}
        handleOnChange={handleStatus}
        value={status}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default IncidentForm
