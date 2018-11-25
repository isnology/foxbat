import React, { Component } from 'react'
import { getDecodedToken } from './api/token'
import { createInstrument, loadInstruments, updateInstrument } from './api/instruments'
import { loadInstrumentClasses } from './api/instrumentClasses'
import { signIn, signOut, signUp, nextToken } from "./api/auth"
import { createPanel, updatePanel, deletePanel  } from "./api/panels"
import './style/App.css';
import Main from './Main'

export default class App extends Component {
  state = {
    // App
    user: getDecodedToken(),
    instruments: null, //hash of all instruments from server (key=id)
    classes: null,
    modalWindow: null,
    touch: false,
    //pxwFactor: 0.0,  // for adaptive sizing of instruments
    error: null,

    // selection
    template: null,

    //panel
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    templateSlots: null,  // list of slot names in template (array of strings)
    selectedSlot: null,
    slots: {},
    panelSaved: true,

    // sidebar
    selectedInstrumentClass: null,
    selectedInstrument: null,

    // admin
    size: "L",
    vOffset: 0.0,
    hOffset: 0.0,
    width: 9.78,
    height: 9.78,
    modalOpen: false,
    editInstrument: null,
    class: '',
    name: '',
    brand: '',
    model: '',
    partNo: '',
    textarea: '',
    pictureUrl: '',
    uploaded: false,
    price: 0
  }

  // css
  css = {
    headerBackground: "white",
    foxbatBlue: "#0A64CB",
    offWhite: "#f5f5f5",
    baseUrl: "https://coder-academy-apps-glenn.s3.amazonaws.com/instruments/",
    publicUrl: "https://s3-ap-southeast-2.amazonaws.com/coder-academy-apps-glenn/instruments/",
  }

  // html snippets
  html = {
    plus:
      <svg width="100%" height="100%" viewBox="0 0  100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 40 L40 40 L40 10 L60 10 L60 40 L90 40 L90 60 L60 60 L60 90 L40 90 L40 60 L10 60 z"
              fill="white"
        />
      </svg>,
    minus:
      <svg width="100%" height="100%" viewBox="0 0  100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 40 L90 40 L90 60 L10 60 z"
              fill="white"
        />
      </svg>,
  }

  // tables
  table = {
    size: {
      L: 'L (3 1/8 inch)',
      M: 'M (2 1/4 inch)',
      S: 'S (2 inch)',
      D: 'D (Digital screen)',
      R: 'R (Radio)',
    },
    slot: {
      L: {wide: 9.78, hi: 9.78},
      M: {wide: 6.99, hi: 6.99},
      S: {wide: 6.29, hi: 6.29},
      D: {wide: 29,   hi: 19.9},
      R: {wide: 5.3,  hi: 10.3},
    },
    imageEdit: {
      L: {wide: '290px', hi: '290px'},
      M: {wide: '260px', hi: '260px'},
      S: {wide: '260px', hi: '260px'},
      D: {wide: 'calc(31vw + 120px)', hi: 'calc(22vw + 120px)'},
      R: {wide: '260px', hi: 'calc(10vw + 120px)'},
    },
    min: {
      L: 4,
      M: 3,
      S: 2.5,
      D: 15,
      R: 2.5,
    },
    max: {
      L: 19,
      M: 13,
      S: 11,
      D: 45,
      R: 8,
    },
  }


  // App

  signedIn = () => (!!this.state.user)

  email = () => (this.signedIn() && this.state.user.email)

  isAdmin = () => (this.signedIn() && this.state.user.admin)

  message = () => (!!this.state.error ? this.state.error.message : null)

  onExit = () => {this.onModalWindow(null)}

  // converts screen width % to pixels
  // pxWidth(screenWidthPercent) {
  //  return Math.round(this.state.pxwFactor * screenWidthPercent)
  // }

  onSignOut = () => {
    signOut()
    this.onSetUser(null)
    this.setState({ error: null })
    //const key = "paneldata"
    //localStorage.removeItem(key)
  }

  onSetUser = (user) => {
    this.setState({ user })
  }

  onModalWindow = (modalWindow) => {
    this.setState({ modalWindow })
  }

  onInstruments = (instruments) => {
    this.setState({ instruments })
  }

  onInstrumentClasses = (classes) => {
    this.setState({ classes })
  }

  onTouch = (touch) => {
    this.setState({ touch })
  }

  tokenExpiry = () => {
    // Prevent duplicates.
    clearInterval(this.timer)

    // Set timeout.
    this.timeout = !!getDecodedToken() ? getDecodedToken().exp * 1000 : new Date() * 1
    console.log('Token valid for:', (this.timeout - new Date() * 1) / 1000, 'date:', new Date() )

    // Create timer.
    this.timer = setInterval(() => {
      const now = new Date() * 1
      if (now > this.timeout) {
        // Interval complete.
        console.log('Token expired.')
        this.setState((oldState) => {
          return { user: null }
        })
        clearInterval(this.timer)
      } else if (now + 300000 > this.timeout) {
        nextToken()
        .then((user) => {
          this.setState((oldState) => {
            return { user: user }
          })
          this.timeout = !!getDecodedToken() ? getDecodedToken().exp * 1000 : now
          console.log('Token valid for:', (this.timeout - now) / 1000, 'date:', new Date() )
        })
      }
    }, 10000)
  }

  // SignIn

  onRegister = ({ email, password, passwordConfirmation }) => {
    const user = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    signUp({ user })
    .then((user) => {
      this.onSetUser(user)
      this.tokenExpiry()
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
    .then((user) => {
      this.onSetUser(user)
      this.tokenExpiry()
      this.onModalWindow(null)
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  // Selection

  onSelectTemplate = (template) => {
    let templateSlots
    if (template === 'a22' || template === 'a32') {
      templateSlots = require('./data').analogSlots
    }
    else {
      templateSlots = require('./data').digitalSlots
    }
    this.setState({ template })
    this.setState({ templateSlots, panelSaved: true })
  }

  onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)

    this.onSelectTemplate(panelObj.template)
    this.onModalWindow(null)
    this.setState({
      panelName: panelObj.name,
      panelId: panelObj.id,
      slots: panelObj.slots,
      panelSaved: true
    })
  }

  // panel

  onUpdateSlots = (instrument) => {
    this.setState((prevState) => {
      let newSlots = prevState.slots
      const selectedSlot = prevState.selectedSlot
      if (!!newSlots[selectedSlot]) {
        delete newSlots[selectedSlot]
      }
      else {
        newSlots[selectedSlot] = instrument
      }
      return { slots: newSlots, panelSaved: false }
    })
  }

  onClear = () => {
    this.setState({
      slots: {},
      selectedSlot: null,
    })
    this.onSelectInstrument(null)
  }

  onClearCurrent = () => {
    if (this.state.panelSaved === false) {
      if (window.confirm("Are you sure you want to clear the current panel? Any unsaved changes will be lost.")) {
        this.onClose()
        this.onClear()
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
      this.onClose()
      this.onClear()
    }
  }

  onSelectSlot = (slot) => {
    this.setState({
      selectedSlot: slot,
    })
    this.onSelectInstrument(this.state.slots[slot])
    this.onClose()
  }

  onSave = () => {
    this.setState({ error: null })
    const { panelName, panelSaved } = this.state
    if (!this.signedIn()) {
      const error = {
        message: "You must sign in before you can save your panel"
      }
      this.setState({ error })
      return
    }
    if (!panelSaved) {
      if (!!panelName) this.doSave({ name: panelName })
      else this.onModalWindow("save")
    }
  }

  doSave = ({ name }) => {
    this.setState({ error: null })
    const {
      slots,
      templateSlots,
      panelId,
      user,
      template
    } = this.state
    const data = {
      template: template,
      name: name,
      slots: slots,
      templateSlots: templateSlots,
      user_id: user.id,
    }
    if (!!panelId) {
      updatePanel(panelId, data)
      .then((panel) => {
        this.onModalWindow(null)
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
        this.onModalWindow(null)
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
  }

  onDelete = () => {
    const { panelId } = this.state
    deletePanel(panelId)
    .catch((error) => {
      this.setState({ error })
    })
    this.onRefreshApp(false)
  }

  onRefreshApp = (confirm) => {
    const { panelSaved } = this.state
    if (panelSaved === false) {
      if (confirm && !window.confirm("Are you sure you want to exit and return to the start? Any unsaved changes to" +
        " this panel will be lost.")) {
        return
      }
      else {
        this.onRefresh()
      }
    }
    else {
      this.onRefresh()
    }
  }

  onRefresh = () => {
    this.setState({
      panelName: null,
      panelId: null,
      templateSlots: null,
      slots: {},
      selectedSlot: null,
    })
    this.onSelectInstrument(null)
    this.onSelectTemplate(null)
  }

  // sidebar

  onBack = () => {
    if (!!this.state.selectedInstrument) {
      // do nothing
    }
    else if (!!this.state.selectedInstrumentClass) {
      this.onSelectInstrumentClass(null)
    }
  }

  doSelectInstrument = (value) => {
    this.onUpdateSlots(value)
    this.onSelectInstrument(value)
  }

  onSelectInstrument = (instrument) => {
    this.setState({ selectedInstrument: instrument })
  }

  onSelectInstrumentClass = (item) => {
    this.setState({ selectedInstrumentClass: item })
  }

  onRemove = () => {
    this.onUpdateSlots(null)
    this.onClose()
    this.onSelectInstrument(null)
  }

  onClose = () => {
    this.setState({
      selectedInstrumentClass: null
    })
  }

  // admin

  onChange = (event) => {
    const value = event.target.value.split('"').join('')
    const key = event.target.name
    this.setState({ [key]: value })
  }

  onAdminSave = () => {
    const data = {
      name: this.state.name,
      brand: this.state.brand,
      model: this.state.model,
      part_no: this.state.partNo,
      text: this.state.textarea,
      picture_url: this.state.pictureUrl,
      uploaded: this.state.uploaded,
      price: this.state.price,
      size: this.state.size,
      picture_h_offset: this.state.hOffset,
      picture_v_offset: this.state.vOffset,
      picture_width: this.state.width,
      picture_height: this.state.height,
      instrument_class_id: this.state.class,
    }
    if (!!this.state.editInstrument) {
      updateInstrument(this.state.editInstrument, data)
      .then(() => this.onAdminClear())
    }
    else {
      createInstrument(data)
      .then(() => this.onAdminClear())
    }
  }

  onAdminClear = () => {
    this.setState({
      editInstument: null,
      size: 'L',
      class: '',
      name: '',
      brand: '',
      model: '',
      partNo: '',
      textarea: '',
      pictureUrl: '',
      uploaded: false,
      price: 0,
      hOffset: 0,
      vOffset: 0,
    })
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ modalOpen: false })
    this.onAdminClear()
  }

  onSelect = (id) => {
    const inst = this.state.instruments[id]
    this.setState({
      editInstrument: id,
      modalOpen: false,
      name: inst.name,
      brand: inst.brand,
      model: inst.model,
      partNo: inst.part_no,
      textarea: inst.text,
      price: inst.price,
      size: inst.size,
      class: inst.instrument_class.id,
      pictureUrl: inst.picture_url,
      uploaded: inst.uploaded,
      width: parseFloat(inst.picture_width),
      height: parseFloat(inst.picture_height),
      hOffset: parseFloat(inst.picture_h_offset),
      vOffset: parseFloat(inst.picture_v_offset),
    })
  }

  onUp = () => {
    const val = Math.round((this.state.vOffset - .01) * 1000) / 1000
    this.setState({ vOffset: val })
  }

  onDown = () => {
    const val = Math.round((this.state.vOffset + .01) * 1000) / 1000
    this.setState({ vOffset: val })
  }

  onLeft = () => {
    const val = Math.round((this.state.hOffset - .01) * 1000) / 1000
    this.setState({ hOffset: val })
  }

  onRight = () => {
    const val = Math.round((this.state.hOffset + .01) * 1000) / 1000
    this.setState({ hOffset: val })
  }

  factor = () => {
    const size = this.state.size
    const width = this.table.slot[size].wide
    const height = this.table.slot[size].hi
    return height / width
  }

  onBigger = () => {
    const oldWidth = this.state.width
    const oldHeight = this.state.height
    this.setState({
      width: Math.round((oldWidth + .01) * 1000) / 1000,
      height: Math.round((oldHeight + .01 * this.factor()) * 1000) / 1000
    })
  }

  onSmaller = () => {
    const oldWidth = this.state.width
    const oldHeight = this.state.height
    this.setState({
      width: Math.round((oldWidth - .01) * 1000) / 1000,
      height: Math.round((oldHeight - .01 * this.factor()) * 1000) / 1000
    })
  }

  onChangeH = (value) => {
    this.setState({ hOffset: value })
  }

  onChangeV = (value) => {
    this.setState({ vOffset: -value })
  }

  onChangeS = (value) => {
    const oldWidth = this.state.width
    const oldHeight = this.state.height
    this.setState({
      width: Math.round(value * 1000) / 1000,
      height: Math.round((oldHeight + (value - oldWidth) * this.factor()) * 1000) / 1000
    })
  }


  render() {
    return (<Main app={ this }/>)
  }


  doLoadInstruments() {
    loadInstruments()
    .then((instruments) => {
      let list = {}
      instruments.map((instrument) => {
        list[instrument.id] = instrument
      })
      this.onInstruments(list)
    })
    .catch(() => {
      this.onInstruments(null)
    })

    loadInstrumentClasses()
    .then((classes) => {
      this.onInstrumentClasses(classes)
    })
  }

  componentDidMount() {
    this.doLoadInstruments()
    this.tokenExpiry()

    //window.addEventListener('resize', this.updateWindowDimensions.bind(this))
    window.addEventListener('touchstart', function onFirstTouch() {
      this.onTouch(true)

      // we only need to know once that a human touched the screen, so we can stop listening now
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    // isSignedIn()
    // .then((res) => this.setState({ user: res.user}))

  }

  // code necessary for window size detection
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions)
  //   //this.restoreFromLocalStorage()
  // }

  // code necessary for window size detection
  // updateWindowDimensions() {
  //   const pxw = window.innerWidth / 100
  //   this.setState({
  //     //windowWidth: window.innerWidth,
  //     //windowHeight: window.innerHeight,
  //     pxwFactor: pxw
  //   })
  // }

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
