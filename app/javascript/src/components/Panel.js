import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import A22outline from './panelOutlines/a22'
import A32outline from './panelOutlines/a32'
import Slot from './panelOutlines/Slot'
import logo from '../img/foxbatlogo.png'
import Button from './Button'
import SubmitButton from './SubmitButton'
import Sidebar from './sidebar/Sidebar'
import { emailPanelDesign } from "../api/emailSubmission";
import _forEach from 'lodash/forEach'
import numeral from "numeral";

class Panel extends Component {
  state = {
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    templateSlots: null,  // list of slot names in template (array of strings)
    selectedSlot: null,
    slots: {},
    selectedInstrumentClass: null,
    selectedInstrumentBrand: null,
    selectedInstrument: null,
    panelSaved: null,
    error: null, //for displaying any errors recieved from the server
    pxwFactor: 0.0,  // for adaptive sizing of instruments
    modalWindow: null //display sign in/up to save panel window
  }

  // converts screen width % to pixels
  pxWidth = (screenWidthPercent) => {
    return Math.round(this.state.pxwFactor * screenWidthPercent)
  }

  setTemplateSlots = () => {
    let templateSlots
    if (this.props.templateName === 'a22' || this.props.templateName === 'a32') {
      templateSlots = require('../data').analogSlots
    }
    else {
      templateSlots = require('../data').digitalSlots
    }
    this.setState({ templateSlots: templateSlots })
  }

  doSave = ({ name }) => {
    this.setState({ error: null })
    const data = {
      template: this.props.templateName,
      name: name,
      slots: this.props.slots,
      templateSlots: this.state.templateSlots,
      userId: this.props.decodedToken.sub     // as per passport documentation
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
    const panelName = !!this.state.panelName
    if (this.props.signedIn && panelName) {
      const name = this.state.panelName
      this.doSave({ name })
    }
    else {
      this.setState({ modalWindow: 'saveRegister' })
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

  onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)

    this.setState({
      templateName: panelObj.template,
      panelId: panelObj.id,
      templateSlots: panelObj.templateSlots,
      slots: panelObj.slots,
      selectedSlot: null,
      selectedInstrument: null
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
    this.setState({ slots: newSlots })
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

  onDeletePanel = () => {
    const id=this.state.panelId
    deletePanel(id)
    .then(() => {
      this.onRefreshApp(false)
    })
  }

  onRefreshApp = (confirm) => {
    if (this.state.panelSaved === false) {
      if (confirm && !window.confirm("Are you sure you want to exit and return to the start? Any unsaved changes to" +
          " this panel will be lost.")) {
        return
      }
      else {
        this.refreshApp()
      }
    }
    else {
      this.refreshApp()
    }
    //this.onSignOut()
  }

  refreshApp = () => {
    this.setState({
      panelName: null,
      panelId: null,
      templateName: null,
      modalWindow: null,
      templateSlots: null,
      slots: {},
      selectedSlot: null,
      selectedInstrument: null
    })
    this.props.onSelectTemplate(null)
  }

  submitPanel = (email, slots, templateName, templateSlots) => {
    if (window.confirm("Click OK to confrim and send your panel design to Foxabt Australia")) {
      emailPanelDesign(email, slots, templateName, templateSlots)
      .then((res) => {
        alert("Panel design has been sent")
      })
      .catch((error) => {
        alert("There was an error sending your design, please get in contact with us to resolve this issue")
      })
    }
  }

  totalCost = () => {
    let totalPrices = 0
    _forEach(this.state.slots, (value, key) => {
      totalPrices += this.props.instruments[value].price
    })
    return totalPrices / 100
  }

  render () {
    const {
      panelName,
      panelId,
      panelList,
      templateSlots,
      selectedSlot,
      slots,
      selectedInstrumentClass,
      selectedInstrumentBrand,
      selectedInstrument,
      panelSaved,
      error,
      modalWindow
    } = this.state

    const {
      instruments,
      templateName,
      signedIn,
      decodedToken,
      onSelectTemplate
    } = this.props

    const email = signedIn && decodedToken.email

    const slotLayout = {
      a22: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a32: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a22Digital: [["M01", "M02"], ["D01"], ["R01", "R02"]],
      a32Digital: [["D01"], ["R01", "R02"], ["M01", "M02"]]
    }

    let saveButtonStyle
    if (panelSaved!==false) {
      saveButtonStyle = {backgroundColor: "#C4C4C4"}
    }

    return (
      <div className="configurator">
        <div className="panel-main">
          <img className="configurator-logo" src={ logo } alt="Foxbat logo" />

          <div className="running-cost">
            { !!panelName ? <p>Panel: <i>"{ panelName }"</i></p> : <i style={{color: '#bdbdbd'}}>Save to name your panel</i> }
            <p>Current cost (USD): ${ numeral(this.totalCost()).format('0,0.00') }</p>
          </div>
          <div className="panel">
            { templateName === 'a22' || templateName === 'a22Digital' ? <A22outline/> : <A32outline/> }
            { slotLayout[templateName].map((slotArray, index) => (
                <div key={index} className={ slotArray[0].substring(0,1).toLowerCase() + "-container"}>
                  { slotArray.map((slot, index2) => (
                      <Slot
                        key={index2}
                        instruments={ instruments }
                        slot={ slot }
                        selectedSlot={ selectedSlot }
                        slots={ slots }
                        onSelectSlot={ this.onSelectSlot }
                        pxWidth={ this.pxWidth }
                      />
                    ))
                  }
                </div>
              ))
            }
          </div>
          <div className="panel-button-group">
            <Button
                text="Save"
                onClick={ this.onSave }
                style={ saveButtonStyle }
            />
            { signedIn &&
            <SubmitButton
                className="panel-button-group"
                onClick={ this.submitPanel }
                email={ email }
                slots={ slots }
                templateName={ templateName }
                templateSlots={ templateSlots }
            />
            }
            <div className="panel-button-low-group">
              { signedIn &&
              <Button
                  text="Sign Out"
                  onClick={ onSignOut }
              />
              }
              <Button
                  text={ "Clear panel" }
                  onClick={ this.onClearPanel }
              />
              { signedIn && !!panelId &&
              <Link to="/" onClick={ this.onDeletePanel }>
                <Button
                    text="Delete panel"
                />
              </Link>
              }
              <Link to="/" onClick={ () => this.onRefreshApp(true) }>
                <Button
                    text="Back to start"
                />
              </Link>
            </div>
          </div>
        </div>
        <Sidebar
          instruments={ instruments }
          templateName={ templateName }
          selectedSlot={ selectedSlot }
          selectedInstrument={ selectedInstrument }
          slots={ slots }
          selectedInstrumentClass={ selectedInstrumentClass }
          selectedInstrumentBrand={ selectedInstrumentBrand }
          onSelectInstrument={ this.onSelectInstrument }
          onUpdateSlots={ this.onUpdateSlots }
          onSelectInstrumentClass={ this.onSelectInstrumentClass }
          onSelectInstrumentBrand={ this.onSelectInstrumentBrand }
          onSidebarClose={ this.onSidebarClose }
        />
      </div>
    )
  }


  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  // When this App first appears on screen
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
    })
    window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
    })
    this.setTemplateSlots()
  }

  // code necessary for window size detection
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
    //window.removeEventListener('beforeunload')
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
}

export default Panel