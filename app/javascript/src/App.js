import React, { Component } from 'react'
import { signIn, signUp, signOut } from './api/auth'
import { getDecodedToken } from './api/token'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import { loadPanels, createPanel, updatePanel, deletePanel } from './api/panels'
import { loadInstruments } from './api/instruments'
import { emailPanelDesign } from './api/emailSubmission'
import ModalWindow from './components/ModalWindow'
import Configurator from './components/Configurator'


class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    instruments: null, //hash of all instruments from server (key=id)
    templateName: null, //which template? a22, a22digital, a32, a32digital
    modalWindow: null //display sign in/up to save panel window
  }

  onSignIn = ({ email, password }) => {
    this.setState({ error: null })
    const data = {
      user: {
        email: email,
        password: password
      }
    }
    signIn({data})
    .then((decodedToken) => {
      this.setState({ decodedToken, modalWindow: "selectPanel"})
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  loadPanelList = () => {
    loadPanels({user: this.state.decodedToken.sub})
    .then((panelList) => {
      this.setState({ panelList: panelList})
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onRegister = ({ email, password, passwordConfirmation }) => {
    const data = {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    }
    signUp(data)
    .then((decodedToken) => {
      this.setState({ decodedToken })
    })
    .catch((error) => {
      if (/ 422/.test(error.message)) {
        this.setState({ error: {message: "This user is exists already, please try another." }})
      }
      else {
        this.setState({ error })
      }
    })
  }

  onSaveRegister = ({ name, email, password }) => {
    const signedIn = !!this.state.decodedToken
    this.setState({ error: null })
    const data = {
      user: {
        email: email,
        password: password,
        password_confirmation: password
      }
    }
    if (!signedIn) {
      signUp(data)
      .then((decodedToken) => {
        this.setState({ decodedToken, panelName: name })
        this.doSave({name})
      })
      .catch((error) => {
        // User has already been taken
        if (/ 422/.test(error.message)) {
          return signIn(data)
          .then((decodedToken) => {
            this.setState({ decodedToken })
            this.doSave({ name })
          })
        }
        else {
          throw error
        }
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
    else if (signedIn && !!this.state.panelName) {
      const panelName = this.state.panelName
      this.doSave({ name: panelName })
    }
    else {
      this.doSave({ name })
    }
  }

  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null, error: null, templateName: null, panelName: null, panelId: null })
    const key = "paneldata"
    //localStorage.removeItem(key)
  }

  doModalWindow = ({ name }) => {
    this.setState({ modalWindow: name })
  }

  onExitModal = () => {
    this.setState({ modalWindow: null })
  }

  onSelectTemplate = (templateName) => {
    this.setState({
      templateName: templateName,
    })
  }


// { modal &&
// <ModalWindow
// window={ modalWindow }
// onExit={ this.onExitModal }
// onSignIn={ this.onSignIn }
// onSaveRegister={ this.onSaveRegister }
// loadPanelList={ this.loadPanelList }
// panelList={ this.state.panelList }
// onSelectPanel={ this.onSelectPanel }
// errMsg={ !!error ? error.message : null }
// signedIn={ signedIn }
// />
// }

// panelId={ panelId }
// onSave={ this.onSave }
// onSubmit={ this.submitPanel }
// onSelectSlot={ this.onSelectSlot }
// onClearPanel={ this.onClearCurrentPanel }
// onSignOut={ this.onSignOut }
// onInstrumentSelection={ this.onInstrumentSelection }
// assignInstrumentToSelectedSlot={ this.assignInstrumentToSelectedSlot }
// sidebarClose={ this.onSidebarClose }
// onBackClick={ this.onBackClick }
// onRefreshApp={ this.onRefreshApp }
// onDeletePanel={ this.onDeletePanel }

  render() {
    const {
      decodedToken,
      instruments,
      modalWindow,
      templateName
    } = this.state

    const signedIn = !!decodedToken
    const modal = !!modalWindow

    return (
        <Router>
          <div className="App">
            <Switch>
              <Route path='/' exact render={ () => (
                  !templateName ? (
                      <WelcomePage
                          onSignOut={ this.onSignOut }
                          doModalWindow={ this.doModalWindow }
                          signedIn={ signedIn }
                          email={ signedIn && decodedToken.email }
                          onSelectTemplate={this.onSelectTemplate}
                      /> ) : (
                      <Redirect to='/app' />
                  )
              )}/>

              <Route path='/app' exact render={ () => (
                  !!templateName ? (
                      <Configurator
                          instruments={ instruments }
                          templateName={ templateName }
                          signedIn={ signedIn }
                          decodedToken={ decodedToken }
                          onSelectTemplate={this.onSelectTemplate}
                      />
                  ):(
                      <Redirect to='/' />
                  )
              )}/>

            </Switch>


          </div>
        </Router>
    )
  }


  // When this App first appears on screen
  componentDidMount() {
    this.doLoadInstruments()
    //this.restoreFromLocalStorage()
  }

  doLoadInstruments() {
    loadInstruments()
    .then((instruments) => {
      let list = {}
      instruments.map((instrument) => {
        list[instrument.id] = instrument
      })
      this.setState({ instruments: list })
    })
    .catch(() => {
      this.setState({ instruments: null })
    })
  }

  //restoreFromLocalStorage() {
  //  let obj
  //  if (!!this.state.decodedToken) {
  //    const key = "paneldata"
  //    obj = JSON.parse(localStorage.getItem(key))
  //    !!obj && this.setState({
  //      templateName: obj.templateName,
  //      panelName: obj.panelName,
  //      panelId: obj.panelId,
  //      slots: obj.slots
  //    })
  //  }
  //}

}

export default App