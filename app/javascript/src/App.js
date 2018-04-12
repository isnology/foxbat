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
    save: null,
    instruments: null, //hash of all instruments from server (key=id)
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    panelList: null,  // list of all saved panels by this user
    templateName: null, //which template? a22, a22digital, a32, a32digital
    panelObject: null,
    modalWindow: null, //display sign in/up to save panel window
    error: null, //for displaying any errors recieved from the server
    panelSaved: null,
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

  doSave = ({ name }) => {
    this.setState({ error: null })
    const data = {
      template: this.state.templateName,
      name: name,
      slots: this.state.slots,
      templateSlots: this.state.templateSlots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    if (!!this.state.panelId){
      const id=this.state.panelId
      updatePanel(id, data)
      .then((panel) => {
        this.onExitModal()
        this.setState({ panelSaved: true })
      })
      .catch((error) => {
        this.setState({ error })
      })
    } else {
      createPanel(data)
      .then((panel) => {
        this.setState({
          panelId: panel.id,
          panelName: panel.name,
          panelSaved: true
        })
        this.onExitModal()
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
  }

  onSave = () => {
    const signedIn = !!this.state.decodedToken
    const panelName = !!this.state.panelName
    if (signedIn && panelName) {
      const name = this.state.panelName
      this.doSave({ name })
    }
    else {
      this.setState({ modalWindow: 'saveRegister' })
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


  onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)

    this.setState({
      templateName: panelObj.template,
      panelObject: panelObj
    })
    // const obj = {
    //   templateName: panelObj.template,
    //   panelName: panelObj.name,
    //   panelId: panelObj.id,
    //   slots: slots
    // }
    // const key = "paneldata"
    //localStorage.setItem(key, JSON.stringify(obj))
    this.onExitModal()
  }

  submitPanel = (email, slotData, templateName, templateSlots) => {
    if (window.confirm("Click OK to confrim and send your panel design to Foxabt Australia")) {
      emailPanelDesign(email, slotData, templateName, templateSlots)
      .then((res) => {
        alert("Panel design has been sent")
      })
      .catch((error) => {
        alert("There was an error sending your design, please get in contact with us to resolve this issue")
      })
    }
  }

  render() {
    const {
      decodedToken,
      modalWindow,
      templateName,
      panelObject,
      panelId,
      instruments,
      selectedSlot,
      selectedInstrumentClass,
      selectedInstrumentBrand,
      selectedInstrument,
      slots,
      templateSlots,
      error,
      panelSaved,
      panelName
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
                          email={ signedIn && decodedToken.email }
                          panelObject={ panelObject }
                          signedIn={ signedIn }
                          onSelectTemplate={this.onSelectTemplate}
                          panelId={ panelId }
                          onSave={ this.onSave }
                          onSubmit={ this.submitPanel }
                          onSelectSlot={ this.onSelectSlot }
                          onClearPanel={ this.onClearCurrentPanel }
                          onSignOut={ this.onSignOut }
                          onInstrumentSelection={ this.onInstrumentSelection }
                          assignInstrumentToSelectedSlot={ this.assignInstrumentToSelectedSlot }
                          sidebarClose={ this.onSidebarClose }
                          onBackClick={ this.onBackClick }
                          onRefreshApp={ this.onRefreshApp }
                          onDeletePanel={ this.onDeletePanel }
                      />
                  ):(
                      <Redirect to='/' />
                  )
              )}/>

            </Switch>

            { modal &&
            <ModalWindow
                window={ modalWindow }
                onExit={ this.onExitModal }
                onSignIn={ this.onSignIn }
                onSaveRegister={ this.onSaveRegister }
                loadPanelList={ this.loadPanelList }
                panelList={ this.state.panelList }
                onSelectPanel={ this.onSelectPanel }
                errMsg={ !!error ? error.message : null }
                signedIn={ signedIn }
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