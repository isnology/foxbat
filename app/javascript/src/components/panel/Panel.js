import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import A22outline from './a22'
import A32outline from './a32'
import Slot from './Slot'
import logo from '../../img/foxbatlogo.png'
import Button from '../Button'
import SubmitButton from './SubmitButton'
import Sidebar from '../sidebar/Sidebar'
import { emailPanelDesign } from "../../api/emailSubmission"
import _forEach from 'lodash/forEach'
import numeral from "numeral";
import { createPanel, updatePanel } from "../../api/panels"
import Save from '../modalWindows/Save'


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
    panelSaved: true,
    error: null, //for displaying any errors recieved from the server
  }
  
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

  render () {
    const {
      panelName,
      panelId,
      templateSlots,
      selectedSlot,
      slots,
      selectedInstrumentClass,
      selectedInstrumentBrand,
      selectedInstrument,
      panelSaved,
      error
    } = this.state
    
    const {
      instruments,
      decodedToken,
      template,
      modalWindow
    } = this.props.state
    
    const {
      pxWidth,
      onSelectTemplate,
      onSignOut,
      onModalWindow
    } = this.props.actions
    
    const signedIn = !!decodedToken
    const email = signedIn && decodedToken.email
    const message = !!error ? error.message : null
    const onExit = () => onModalWindow(null)

    const slotLayout = {
      a22: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a32: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a22Digital: [["M01", "M02"], ["D01"], ["R01", "R02"]],
      a32Digital: [["D01"], ["R01", "R02"], ["M01", "M02"]]
    }

    let saveButtonStyle
    if (panelSaved !== false) {
      saveButtonStyle = {backgroundColor: "#C4C4C4"}
    }
  
    
    const totalCost = () => {
      let totalPrices = 0
      _forEach(slots, (value, key) => {
        totalPrices += instruments[value].price
      })
      return totalPrices / 100
    }
  
    const onSave = () => {
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
  
    const doSave = ({ name }) => {
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
  
    const onDeletePanel = () => {
      const id = panelId
      deletePanel(id)
      .then(() => {
        this.onRefreshApp(false)
      })
    }
    
    const onRefreshApp = (confirm) => {
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
  
    const refreshApp = () => {
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
  
    const submitPanel = () => {
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
    
  
    return (
      <div className="configurator">
        <div className="panel-main">
          <img className="configurator-logo" src={ logo } alt="Foxbat logo"/>
         
          <div className="running-cost">
            { !!panelName ? <p>Panel: <i>{ panelName }</i></p> :
              <i style={ { color: '#bdbdbd' } }>Save to name your panel</i> }
            <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
          </div>
          
          <div className={`panel ${template.substring(0,3)} ${template.length > 3 ? "digital" : ""}`}>
            { template === 'a22' || template === 'a22Digital' ? <A22outline/> : <A32outline/> }
            { slotLayout[template].map((slotArray, index) => (
              <div key={ index } className={ slotArray[0].substring(0, 1).toLowerCase() + "-container" }>
                { slotArray.map((slot, index2) => (
                  <Slot
                    key={ index2 }
                    instruments={ instruments }
                    slot={ slot }
                    selectedSlot={ selectedSlot }
                    slots={ slots }
                    template={ template }
                    onSelectSlot={ this.onSelectSlot }
                    pxWidth={ pxWidth }
                  />
                ))
                }
              </div>
            ))
            }
          </div>
          <div className="panel-button-group">
            { signedIn &&
              <Button onClick={ onSave }
                text="Save"
                style={ saveButtonStyle }
              />
            }
            { signedIn &&
              <SubmitButton onClick={ submitPanel }
                className="panel-button-group"
                email={ email }
                slots={ slots }
                template={ template }
                templateSlots={ templateSlots }
              />
            }
            <div className="panel-button-low-group">
              { !signedIn &&
                <Button onClick={ () => onModalWindow("signIn") }
                  text="Sign In"
                />
              }
              { signedIn &&
                <Button onClick={ onSignOut }
                  text="Sign Out"
                />
              }
              <Button onClick={ this.onClearCurrentPanel }
                text={ "Clear panel" }
              />
              { signedIn && !!panelId &&
                <Button onClick={ onDeletePanel }
                  text="Delete panel"
                />
              }
              <Button onClick={ () => onRefreshApp(true) }
                text="Back to start"
              />
            </div>
          </div>
        </div>
        
        <Sidebar
          instruments = { instruments }
          template={ template }
          state={ this.state }
          onSelectInstrument={ this.onSelectInstrument }
          onUpdateSlots={ this.onUpdateSlots }
          onSelectInstrumentClass={ this.onSelectInstrumentClass }
          onSelectInstrumentBrand={ this.onSelectInstrumentBrand }
          onSidebarClose={ this.onSidebarClose }
        />
        
        { modalWindow === "save" &&
          <Save
            onExit={ onExit }
            onSubmit={ onSave }
            errMsg={ message }
            signedIn={ signedIn }
          />
        }
      </div>
    )
  }
  
  componentWillMount() {
    const panelObj = this.props.state.panelObj
    
    if (!!panelObj) {
      this.setState({
        panelName: panelObj.name,
        panelId: panelObj.id,
        templateSlots: panelObj.templateSlots,
        slots: panelObj.slots
      })
      this.props.actions.onPanelObj(null)
    }
    else if (!!this.props.state.template) this.setTemplateSlots()
  }
  
  
  
  // When this App first appears on screen
  componentDidMount() {
    window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
    })
  }
  
}

export default Panel