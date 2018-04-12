import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Sidebar from './sidebar/Sidebar'
import Panel from './Panel'
import SubmitButton from './SubmitButton'
import logo from '../img/foxbatlogo.png'
import numeral from 'numeral'
import _forEach from 'lodash/forEach'


class Configurator extends Component {
  state = {
    save: null,
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    panelList: null,  // list of all saved panels by this user
    selectedSlot: null,
    selectedInstrumentClass: null,
    selectedInstrumentBrand: null,
    selectedInstrument: null,
    modalWindow: null, //display sign in/up to save panel window
    slots: {}, //list of instruments already in a slot (hash of objects)
    templateSlots: null,  // list of slot names in template (array of strings)
    error: null, //for displaying any errors recieved from the server
    panelSaved: null,
  }

  // When this App first appears on screen
  componentDidMount() {
    window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
    })
    this.setSlots(this.props.panelObject)
  }

  setSlots = (panelObj) => {
    if (panelObj) {
      this.setState({
        panelId: panelObj.id,
        slots: panelObj.slots,
        templateSlots: panelObj.templateSlots
      })
    }
    else {
      let templateSlots
      if (this.props.templateName === 'a22' || this.props.templateName === 'a32') {
        templateSlots = require('../data').analogSlots
      }
      else {
        templateSlots = require('../data').digitalSlots
      }
      this.setState({
        slots: {},
        templateSlots: templateSlots
      })
    }
  }

  onClearCurrentPanel = () => {
    this.clearInstrumentsFromSlots()
    this.props.onSelectTemplate(null)
    this.setState({
      selectedSlot: null,
      selectedInstrumentClass: null,
      selectedInstrumentBrand: null,
      selectedInstrument: null
    })
  }

  onClearCurrentPanel = () => {
    if (this.state.panelSaved === false) {
      if (window.confirm("Are you sure you want to clear the current panel? Any unsaved changes will be lost.")) {
        this.onSidebarClose()

        this.setState({
          slots: {}
        })
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

      this.setState({
        slots: {}
      })
    }
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
      selectedSlot: null,
      selectedInstrumentClass: null,
      selectedInstrumentBrand: null,
      selectedInstrument: null,
      templateName: null,
      modalWindow: null,
      slots: {},
      templateSlots: null
    })
  }

  assignInstrumentToSlot = (instrumentId, slotNumber) => {
    let newSlots = this.state.slots
    if (!!newSlots[slotNumber]) {
      delete newSlots[slotNumber]
    }
    else {
      newSlots[slotNumber] = instrumentId
    }

    this.setState({
      slots: newSlots,
      panelSaved: false
    })
    this.onSidebarClose()
  }

  assignInstrumentToSelectedSlot = (model) => {
    this.assignInstrumentToSlot(model.id, this.state.selectedSlot)
  }

  onInstrumentSelection = (type, brand, model) => {
    this.setState({
      selectedInstrumentClass: type,
      selectedInstrumentBrand: brand,
      selectedInstrument: model
    })
  }

  onSidebarClose = () => {
    this.setState({
      selectedSlot: null,
      selectedInstrumentClass: null,
      selectedInstrumentBrand: null,
      selectedInstrument: null
    })
  }

  onBackClick = () => {
    if (!!this.state.selectedInstrument) {
      this.setState({
        selectedInstrument: null
      })
    }
    else if (!!this.state.selectedInstrumentBrand) {
      this.setState({
        selectedInstrumentBrand: null
      })
    }
    else if (!!this.state.selectedInstrumentClass) {
      this.setState({
        selectedInstrumentClass: null
      })
    }
    else if (!!this.state.selectedSlot) {
      this.setState({
        selectedSlot: null
      })
    }
  }


  totalCost = () => {
    let totalPrices = 0
    _forEach(slots, (value, key) => {
      totalPrices += instruments[value].price
    })
    return totalPrices / 100
  }


  render() {
    const {
      save,
      panelName,
      panelSaved,
      slots,
      templateSlots,
    } = this.state

    const {
      instruments,
      templateName,
      email,
      signedIn
    } = this.props

    let saveButtonStyle
    if (panelSaved !== false) {
      saveButtonStyle = {backgroundColor: "#C4C4C4"}
    }

    return (
      <div className="configurator">
        <img src={ logo } alt="Foxbat logo" className="configurator-logo" />
        <div className="panel-container">
          <div className="running-cost">
            { !!panelName ? <p>Panel: <i>"{ panelName }"</i></p> : <i style={{color: '#bdbdbd'}}>Save to name your panel</i> }
            <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
          </div>
          <Panel
            instruments={ instruments }
            templateName={ templateName }
            selectedSlot={ selectedSlot } // This is from state
            slots={ slots }
            tempateSlots = { templateSlots }
            onSelectSlot={ onSelectSlot } // This is the function

          />
          <div className="panel-button-group">
            <Button
              text="Save"
              onClick={ onSave }
              style={ saveButtonStyle }
            />
            { signedIn &&
              <SubmitButton
                className="panel-button-group"
                onClick={ onSubmit }
                email={ email }
                slotData={ slots }
                templateID={ templateName }
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
                onClick={ onClearPanel }
              />
              { signedIn && !!panelId &&
              <Link to="/" onClick={ onDeletePanel }>
                <Button
                    text="Delete panel"
                />
              </Link>
              }
              <Link to="/" onClick={ () => onRefreshApp(true) }>
                <Button
                  text="Back to start"
                />
              </Link>
            </div>
          </div>
        </div>
        <Sidebar
          templateName={ templateName }
          instruments={ instruments }
          slots={ slots }
          selectedSlot={ selectedSlot }
          selectedInstrumentClass={ selectedInstrumentClass }
          selectedInstrumentBrand={ selectedInstrumentBrand }
          selectedInstrument={ selectedInstrument }
          onInstrumentSelection={ onInstrumentSelection }
          assignInstrumentToSelectedSlot={ assignInstrumentToSelectedSlot }
          sidebarClose={ sidebarClose }
          onBackClick={ onBackClick }
        />
      </div>
    )
  }
}

export default Configurator