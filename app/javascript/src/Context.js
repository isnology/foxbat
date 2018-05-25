import React from 'react'
import { signIn, signOut, signUp } from "./api/auth";
import { getDecodedToken } from './api/token'
import { emailPanelDesign } from "./api/emailSubmission";
import { createPanel, updatePanel } from "./api/panels";

const TheContext = createContext({values: null, actions: null})

class MainProvider extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    instruments: null, //hash of all instruments from server (key=id)
    template: null, //which template? a22, a22digital, a32, a32digital
    modalWindow: null,
    error: null,
    panelObj: null,
    pxwFactor: 0.0,  // for adaptive sizing of instruments
  
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    templateSlots: null,  // list of slot names in template (array of strings)
    selectedSlot: null,
    slots: {},
    selectedInstrumentClass: null,
    selectedInstrumentBrand: null,
    selectedInstrument: null,
    panelSaved: true
  }
  
  // converts screen width % to pixels
  pxWidth = (screenWidthPercent) => {
    return Math.round(this.state.pxwFactor * screenWidthPercent)
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
  
  onSelectTemplate = (template) => {
    this.setState({ template: template })
  }
  
  onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)
    
    this.onSelectTemplate(panelObj.template)
    this.onPanelObj(panelObj)
    this.onModalWindow(null)
  }
  
  onPanelObj = (obj) => {
    this.setState({ panelObj: obj })
  }
  
  //=======================================
  
  setTemplateSlots = () => {
    if (!this.state.templateSlots) {
      let templateSlots
      if (this.props.state.template === 'a22' || this.props.state.template === 'a32') {
        templateSlots = require('../../data').analogSlots
      }
      else {
        templateSlots = require('../../data').digitalSlots
      }
      this.setState({ templateSlots: templateSlots })
    }
  }
  
  onClearPanel = () => {
    this.setState({
      slots: {},
      selectedSlot: null,
      selectedInstrument: null
    })
  }
  
  onClearCurrentPanel = () => {
    if (this.state.panelSaved === false) {
      if (window.confirm("Are you sure you want to clear the current panel? Any unsaved changes will be lost.")) {
        this.onSidebarClose()
        this.onClearPanel()
        //const key = "paneldata"
        //if (!!localStorage.getItem(key)) {
        //  let localSlots = JSON.parse(localStorage.getItem(key))
        //  localSlots.slots.map(slot => {
        //    slot.instrument = null
        //    return slot
        //  })
        //localStorage.setItem(key, JSON.stringify(localSlots))
        //}
      }
    }
    else {
      this.onSidebarClose()
      this.onClearPanel()
    }
  }
  
  onSelectInstrument = (instrument) => {
    this.setState({ selectedInstrument: instrument })
  }
  
  onSelectSlot = (slot) => {
    this.setState({
      selectedSlot: slot,
      selectedInstrument: this.state.slots[slot]
    })
    this.onSidebarClose()
  }
  
  onUpdateSlots = (instrument) => {
    const { slots, selectedSlot } = this.state
    let newSlots = slots
    if (!!newSlots[selectedSlot]) {
      delete newSlots[selectedSlot]
    }
    else {
      newSlots[selectedSlot] = instrument
    }
    this.setState({ slots: newSlots, panelSaved: false })
  }
  
  onSelectInstrumentClass = (item) => {
    this.setState({ selectedInstrumentClass: item })
  }
  
  onSelectInstrumentBrand = (item) => {
    this.setState({ selectedInstrumentBrand: item })
  }
  
  onSidebarClose = () => {
    this.setState({
      selectedInstrumentClass: null,
      selectedInstrumentBrand: null
    })
  }
  
  //=======================================================
  
  totalCost = () => {
    let totalPrices = 0
    _forEach(slots, (value, key) => {
      totalPrices += instruments[value].price
    })
    return totalPrices / 100
  }
  
  onSave = () => {
    this.setState({ error: null })
    if (!signedIn) {
      const error = {
        message: "You must sign in before you can save your panel"
      }
      this.setState({ error })
      return
    }
    if (!!panelName) doSave({ name: panelName })
    else onModalWindow("save")
  }
  
  doSave = ({ name }) => {
    this.setState({ error: null })
    const data = {
      template: template,
      name: name,
      slots: slots,
      templateSlots: templateSlots,
      user_id: decodedToken.sub     // as per passport documentation
    }
    if (!!panelId){
      const id = panelId
      updatePanel(id, data)
      .then((panel) => {
        onModalWindow(null)
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
        onModalWindow(null)
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
  }
  
  onDeletePanel = () => {
    const id = panelId
    deletePanel(id)
    .then(() => {
      this.onRefreshApp(false)
    })
  }
  
  onRefreshApp = (confirm) => {
    if (panelSaved === false) {
      if (confirm && !window.confirm("Are you sure you want to exit and return to the start? Any unsaved changes to" +
        " this panel will be lost.")) {
        return
      }
      else {
        refreshApp()
      }
    }
    else {
      refreshApp()
    }
  }
  
  refreshApp = () => {
    this.setState({
      panelName: null,
      panelId: null,
      templateSlots: null,
      slots: {},
      selectedSlot: null,
      selectedInstrument: null
    })
    onSelectTemplate(null)
  }
  
  submitPanel = () => {
    if (window.confirm("Click OK to confirm and send your panel design to Foxbat Australia")) {
      emailPanelDesign(email, slots, template, templateSlots)
      .then((res) => {
        alert("Panel design has been sent")
      })
      .catch((error) => {
        alert("There was an error sending your design, please get in contact with us to resolve this issue")
      })
    }
  }
  
  render() {
    const { decodedToken, error} = this.state
    
    const actions = {
      pxWidth: this.pxWidth,
      onRegister: this.onRegister,
      onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      onDecodedToken: this.onDecodedToken,
      onModalWindow: this.onModalWindow,
      onSelectTemplate: this.onSelectTemplate,
      onPanelObj: this.onPanelObj,
  
      setTemplateSlots: this.setTemplateSlots,
      onClearPanel: this.onClearPanel,
      onClearCurrentPanel: this.onClearCurrentPanel,
      onSelectInstrument: this.onSelectInstrument,
      onSelectSlot: this.onSelectSlot,
      onUpdateSlots: this.onUpdateSlots,
      onSelectInstrumentClass: this.onSelectInstrumentClass,
      onSelectInstrumentBrand: this.onSelectInstrumentBrand,
      onSidebarClose: this.onSidebarClose,
  
      totalCost: this.totalCost,
      onSave: this.onSave,
      doSave: this.doSave,
      onDeletePanel: this.onDeletePanel,
      onRefreshApp: this.onRefreshApp,
      refreshApp: this.refreshApp,
      submitPanel: this.submitPanel
    }
  
    const signedIn = !!decodedToken
    const email = signedIn && decodedToken.email
    const message = !!error ? error.message : null
    const onExit = () => this.onModalWindow(null)
    
    return (
      <TheContext.Provider value={{...this.state, signedIn, email, message, onExit, ...actions}}>
        {this.props.children}
      </TheContext.Provider>
    )
  }
}

export {MainProvider};
export const MainConsumer = TheContext.Consumer;