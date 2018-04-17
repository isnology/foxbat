import React, { Component, Fragment } from 'react'
import ExitButton from '../ExitButton'
import BackButton from '../BackButton'
import Button from '../Button'
import NavList from './NavList'
import SidebarText from './SidebarText'
import InstrumentPreview, { turnTextToAnkor } from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import _forEach from 'lodash/forEach'
import _toArray from 'lodash/toArray'
import numeral from "numeral";

export function validSize(slotSize, instSize) {
  const size = { L: 3, M: 2, S: 1 }
  return (size[slotSize] > size[instSize] || slotSize === instSize)
}

class Sidebar extends Component {
  state = {
    overButton: [],
    overInfo: []
  }
  
  render () {
    const {
      overButton,
      overInfo
    } = this.state
    
    const {
      instruments,
      templateName,
      selectedSlot,
      selectedInstrument,
      slots,
      selectedInstrumentClass,
      selectedInstrumentBrand,
      onSelectInstrument,
      onUpdateSlots,
      onSelectInstrumentClass,
      onSelectInstrumentBrand,
      onSidebarClose
    } = this.props
  
    const instrumentClassList = (instruments, slotSize) => {
      let list = {}
      _forEach(instruments, (value, key) => {
        if (validSize(slotSize, value.size)) {
          list[value.instrumentClass.name] = value.instrumentClass.name
        }
      })
      return (
        <div className="subset">
          { _toArray(list).map((value, index) => {
            return (
              <Button
                key={index}
                text={ value }
                onClick={ () => onSelectInstrumentClass(value) }
              />
            )
          })
          }
        </div>
      )
    }
  
    const instrumentBrandList = (instruments, slotSize, selectedInstrumentClass) => {
      let list = {}
      _forEach(instruments, (value, key) => {
        if (validSize(slotSize, value.size) && selectedInstrumentClass === value.instrumentClass.name) {
          list[value.brand] = value.brand
        }
      })
      let temp = _toArray(list)
      temp.push('All models')
      return (
        <div className="subset">
          { temp.map((value, index) => {
            return (
              <Button classname="subset"
                      key={ index }
                      text={ value }
                      onClick={ () => onSelectInstrumentBrand(value) }
              />
            )
          })
          }
        </div>
      )
    }
  
    const doSelectInstrument = (value) => {
      onUpdateSlots(value)
      onSelectInstrument(value)
    }
  
    const onMouseOverButton = (index) => {
      const newVal = this.state.overButton
      newVal[index] = true
      this.setState({ overButton: newVal })
    }
  
    const onMouseOutButton = (index) => {
      const newVal = this.state.overButton
      newVal[index] = false
      this.setState({ overButton: newVal })
    }
  
  
    const onMouseOverInfo = (index) => {
      const newVal = this.state.overInfo
      newVal[index] = true
      this.setState({ overInfo: newVal })
    }
  
    const onMouseOutInfo = (index) => {
      const newVal = this.state.overInfo
      newVal[index] = false
      this.setState({ overInfo: newVal })
    }
    
    const instrumentList = (instruments, slotSize, selectedInstrumentClass, selectedInstrumentBrand) => {
      let list = {}
      let style
      _forEach(instruments, (value, key) => {
        if (validSize(slotSize, value.size) &&
          selectedInstrumentClass === value.instrumentClass.name &&
          (selectedInstrumentBrand === 'All models' || selectedInstrumentBrand === value.brand)) {
          list[key] = value
        }
      })
      
      let infoStyle
      
      return (
        <div className="instrument-list">
          { _toArray(list).map((value, index) => {
            if (!!overButton[index] || !!overInfo[index]) {
              infoStyle = {
                display: "block"
              }
            }
            else {
              infoStyle = {
                display: "none"
              }
            }
            return (
              <div key={ index } className="full-button">
                <button
                  className="main-button"
                  onClick={ () => doSelectInstrument(value.id) }
                  onMouseOver={ () => onMouseOverButton(index) }
                  onMouseOut={ () => onMouseOutButton(index) }
                >
                  <span className="button-text">{ value.name }</span>
                  <img src={ value.pictureUrl } alt="instrument" className="btnimg"/>
                </button>
                <div className="info"
                     style={ infoStyle }
                     onMouseOver={ () => onMouseOverInfo(index) }
                     onMouseOut={ () => onMouseOutInfo(index) }
                >
                  <div className="instrument-details">
                    <p><strong>Type:</strong> { value.instrumentClass.name }</p>
                    <p><strong>Model:</strong> { value.model }</p>
                    <p><strong>Part no:</strong> { value.partNo }</p>
                    <p><strong>Size:</strong> { value.size }</p>
                    <p>{ turnTextToAnkor(value.text) }</p>
                    <div className="instrument-preview">
                      <p>{ numeral(value.price/100).format('$0,0.00') } USD</p>
                    </div>
                  </div>
              
                </div>
              </div>
            )
          })
          }
        </div>
      )
    }
    
    let slotSize = null
    if (!!selectedSlot) {
      slotSize = selectedSlot.substring(0,1)
    }
  
    let topHeading
    let displayItems = []
    let exitButton = true
    let backButton = true
  
    // Nothing selected
    if (!selectedSlot) {
      topHeading = `Build your ${templateName.charAt(0).toUpperCase() + templateName.slice(1)} instrument panel`
      exitButton = false
      backButton = false
    }
    // single instrument
    else if (!!selectedSlot && !!selectedInstrument) {
      topHeading = `${instruments[selectedInstrument].name} (${instruments[selectedInstrument].brand})`
      displayItems = <InstrumentPreview
        instruments={ instruments }
        slots={ slots }
        selectedSlot={ selectedSlot }
        selectedInstrument={ selectedInstrument }
        onUpdateSlots={ onUpdateSlots }
        onSidebarClose={ onSidebarClose }
        onSelectInstrument={ onSelectInstrument }
      />
    }
    // Instrument class list
    else if (!!selectedSlot && !selectedInstrumentClass) {
      topHeading = sideBarHeadings.selectInstrumentType
      displayItems = instrumentClassList(instruments, slotSize)
    }
    // Brand list
    else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrumentBrand) {
      topHeading = selectedInstrumentClass + ": " + sideBarHeadings.selectBrand
      displayItems = instrumentBrandList(instruments, slotSize, selectedInstrumentClass)
    }
    // Instrument list
    else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !selectedInstrument) {
      topHeading =  selectedInstrumentBrand + " " + selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel
      displayItems = instrumentList(instruments, slotSize, selectedInstrumentClass, selectedInstrumentBrand)
    }
    
    const onBackClick = () => {
      if (!!selectedInstrument) {
        // do nothing
      }
      else if (!!selectedInstrumentBrand) {
        onSelectInstrumentBrand(null)
      }
      else if (!!selectedInstrumentClass) {
        onSelectInstrumentClass(null)
      }
    }
    
    return (
      <div className="sidebar">
  
        <div className="sidebar-top">
          <div className="sidebar-top-buttons">
            { exitButton ? <ExitButton onExitClick={ onSidebarClose }/> : <span></span>}
            { backButton && <BackButton onBack={ onBackClick }/> }
          </div>
          <h3>{ topHeading }</h3>
        </div>
  
        <div className="sidebar-lower">
          { !!selectedSlot &&
            <Fragment>
              { displayItems }
            </Fragment>
          }
          { !selectedSlot &&
            <SidebarText />
          }
        </div>
      </div>
    )
  }
}

export default Sidebar