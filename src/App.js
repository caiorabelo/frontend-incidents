import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Home from './components/pages/Home'
import Incidents from './components/pages/Incidents'
import NewIncident from './components/pages/NewIncident'
import Incident from './components/pages/Incident'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/incidents">
            <Incidents />
          </Route>
          <Route path="/newincident">
            <NewIncident />
          </Route>
          <Route path="/incident/:id">
            <Incident />
          </Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
