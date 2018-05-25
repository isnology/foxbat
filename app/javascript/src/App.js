import React, { Component, Fragment, createContext } from 'react'
import { signIn, signUp, signOut } from './api/auth'
import { getDecodedToken } from './api/token'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Selection from './components/selection/Selection'
import { loadInstruments } from './api/instruments'
import Panel from './components/panel/Panel'
import SignIn from './components/modalWindows/SignIn'
import MyPanels from './components/modalWindows/MyPanels'
import {MainConsumer} from './Context'



class App extends Component {
  // state = {
  //   decodedToken: getDecodedToken(), // Restore the previous signed in data
  //   instruments: null, //hash of all instruments from server (key=id)
  //   template: null, //which template? a22, a22digital, a32, a32digital
  //   modalWindow: null,
  //   error: null,
  //   panelObj: null,
  //   pxwFactor: 0.0  // for adaptive sizing of instruments
  // }
  //
  // // converts screen width % to pixels
  // pxWidth = (screenWidthPercent) => {
  //   return Math.round(this.state.pxwFactor * screenWidthPercent)
  // }
  //
  // onRegister = ({ email, password, passwordConfirmation }) => {
  //   const user = {
  //     email: email,
  //     password: password,
  //     password_confirmation: passwordConfirmation
  //   }
  //   signUp({ user })
  //   .then((decodedToken) => {
  //     this.onDecodedToken(decodedToken)
  //     this.onModalWindow("selectPanel")
  //   })
  //   .catch((error) => {
  //     if (/ 422/.test(error.message)) {
  //       this.setState({ error: { message: "This user is registered already, please try another." } })
  //     }
  //     else {
  //       this.setState({ error })
  //     }
  //   })
  // }
  //
  // onSignIn = ({ email, password }) => {
  //   this.setState({ error: null })
  //   const user = {
  //     email: email,
  //     password: password
  //   }
  //   signIn({ user })
  //   .then((decodedToken) => {
  //     this.onDecodedToken(decodedToken)
  //     this.onModalWindow(null)
  //   })
  //   .catch((error) => {
  //     this.setState({ error })
  //   })
  // }
  //
  // onSignOut = () => {
  //   signOut()
  //   this.setState({ decodedToken: null, error: null })
  //   //const key = "paneldata"
  //   //localStorage.removeItem(key)
  // }
  //
  // onDecodedToken = (decodedToken) => {
  //   this.setState({ decodedToken })
  // }
  //
  // onModalWindow = (modalWindow) => {
  //   this.setState({ modalWindow })
  // }
  //
  // onSelectTemplate = (template) => {
  //   this.setState({ template: template })
  // }
  //
  // onSelectPanel = (panel) => {
  //   const panelObj = JSON.parse(panel)
  //
  //   this.onSelectTemplate(panelObj.template)
  //   this.onPanelObj(panelObj)
  //   this.onModalWindow(null)
  // }
  //
  // onPanelObj = (obj) => {
  //   this.setState({ panelObj: obj })
  // }
  
  
  render() {
    // const {
    //   decodedToken,
    //   instruments,
    //   template,
    //   modalWindow,
    //   error
    // } = this.state
    //
    // const actions = {
    //   pxWidth: this.pxWidth,
    //   onRegister: this.onRegister,
    //   onSignIn: this.onSignIn,
    //   onSignOut: this.onSignOut,
    //   onDecodedToken: this.onDecodedToken,
    //   onModalWindow: this.onModalWindow,
    //   onSelectTemplate: this.onSelectTemplate,
    //   onPanelObj: this.onPanelObj
    // }
    //
    // const message = !!error ? error.message : null
    // const onExit = () => this.onModalWindow(null)
    
    
    return (
      <MainConsumer>
        {store =>
          <Router>
            <div className="App">
              <Switch>
                <Route path='/' exact render={ () => (
                  !!store.template ?
                    <Panel />
                  :
                    <Selection />
                )}/>
              </Switch>
    
              { store.modalWindow === "register" &&
                <SignIn
                  register
                />
              }
              { store.modalWindow === "signIn" &&
                <SignIn />
              }
              { store.modalWindow === "selectPanel" &&
                <MyPanels />
              }
            </div>
          </Router>
        }
      </MainConsumer>
    )
  }
  
  componentDidMount() {
    this.updateWindowDimensions()
    this.doLoadInstruments()
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
    //this.restoreFromLocalStorage()
  }
  
  // code necessary for window size detection
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  // code necessary for window size detection
  updateWindowDimensions() {
    const pxw = window.innerWidth / 100
    this.setState({
      //windowWidth: window.innerWidth,
      //windowHeight: window.innerHeight,
      pxwFactor: pxw
    })
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
  //      template: obj.template,
  //      panelName: obj.panelName,
  //      panelId: obj.panelId,
  //      slots: obj.slots
  //    })
  //  }
  //}

}

export default App