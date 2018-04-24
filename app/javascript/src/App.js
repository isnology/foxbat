import React, { Component, Fragment, createContext } from 'react'
import { signIn, signUp, signOut } from './api/auth'
import { getDecodedToken } from './api/token'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Selection from './components/selection/Selection'
import { loadInstruments } from './api/instruments'
import Panel from './components/panel/Panel'
import SignIn from './components/modalWindows/SignIn'


// Initialize a context
const Context = createContext()

// This context contains two interesting components
const { Provider, Consumer } = Context


class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    instruments: null, //hash of all instruments from server (key=id)
    templateName: null, //which template? a22, a22digital, a32, a32digital
    modalWindow: null,
    error: null
  }
  
  
  onRegister = ({ email, password, passwordConfirmation }) => {
    const user = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    signUp({ user })
    .then((decodedToken) => {
      this.onDecodedToken(decodedToken)
      this.onModalWindow("selectPanel")
    })
    .catch((error) => {
      if (/ 422/.test(error.message)) {
        this.setState({ error: { message: "This user is registered already, please try another." } })
      }
      else {
        this.setState({ error })
      }
    })
  }
  
  onSignIn = ({ email, password }) => {
    this.setState({ error: null })
    const user = {
      email: email,
      password: password
    }
    signIn({ user })
    .then((decodedToken) => {
      this.onDecodedToken(decodedToken)
      this.onModalWindow(null)
    })
    .catch((error) => {
      this.setState({ error })
    })
  }
  
  onSignOut = () => {
    signOut()
    this.setState({ decodedToken: null, error: null })
    //const key = "paneldata"
    //localStorage.removeItem(key)
  }

  onDecodedToken = (decodedToken) => {
    this.setState({ decodedToken })
  }
  
  onModalWindow = (modalWindow) => {
    this.setState({ modalWindow })
  }

  onSelectTemplate = (templateName) => {
    this.setState({ templateName })
  }
  
  
  render() {
    const {
      decodedToken,
      instruments,
      templateName,
      modalWindow,
      error
    } = this.state
    
    const actions = {
      onRegister: this.onRegister,
      onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      onDecodedToken: this.onDecodedToken,
      onModalWindow: this.onModalWindow,
      onSelectTemplate: this.onSelectTemplate,
    }
  
    const message = !!error ? error.message : null
    const onExit = () => this.onModalWindow(null)
    
    
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact render={ () => (
              !!templateName || modalWindow === 'selectPanel' ?
                <Panel
                  state={ this.state }
                  actions={ actions }
                />
              :
                <Selection
                  state={ this.state }
                  actions={ actions }
                />
            )}/>
          </Switch>

          { modalWindow === "register" &&
            <SignIn
              onExit={ onExit }
              onSubmit={ this.onRegister }
              errMsg={ message }
              register
            />
          }
          { modalWindow === "signIn" &&
            <SignIn
              onExit={ onExit }
              onSubmit={ this.onSignIn }
              errMsg={ message }
            />
          }
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