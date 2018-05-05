import React, { Component, Fragment } from 'react'
import ExitButton from '../ExitButton'
import BackButton from './BackButton'
import Button from '../Button'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import _toArray from 'lodash/toArray'
import _forEach from 'lodash/forEach'
import InstrumentListRow from './InstrumentListRow'

export function validSize(slotSize, instSize) {
  const size = { L: 3, M: 2, S: 1 }
  return (size[slotSize] > size[instSize] || slotSize === instSize)
}


class Sidebar extends Component {
  state = {
    overButton: {},
    overInfo: {}
  }
  
  render () {
    const {
      overButton,
      overInfo
    } = this.state
    
    const {
      selectedSlot,
      selectedInstrument,
      slots,
      selectedInstrumentClass,
      selectedInstrumentBrand,
    } = this.props.state
    
    const {
      instruments,
      template,
      onSelectInstrument,
      onUpdateSlots,
      onSelectInstrumentClass,
      onSelectInstrumentBrand,
      onSidebarClose
    } = this.props
  
    let slotSize = null
    if (!!selectedSlot) {
      slotSize = selectedSlot.substring(0,1)
    }
    
    const instrumentPreview = () => (
      <InstrumentPreview
        instruments={ instruments }
        slots={ slots }
        selectedSlot={ selectedSlot }
        selectedInstrument={ selectedInstrument }
        onUpdateSlots={ onUpdateSlots }
        onSidebarClose={ onSidebarClose }
        onSelectInstrument={ onSelectInstrument }
      />
    )
    
    const instrumentClassList = () => {
      let list = {}
      _forEach(instruments, (value, key) => {
        if (validSize(slotSize, value.size)) {
          list[value.instrumentClass.name] = value.instrumentClass.name
        }
      })
      return (
        <div className="subset">
          { _toArray(list).map((value, index) => (
            <Button
              key={index}
              text={ value }
              onClick={ () => onSelectInstrumentClass(value) }
            />
          ))
          }
        </div>
      )
    }
  
    const instrumentBrandList = () => {
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
          { temp.map((value, index) => (
            <Button classname="subset"
                    key={ index }
                    text={ value }
                    onClick={ () => onSelectInstrumentBrand(value) }
            />
          ))
          }
        </div>
      )
    }
  
    const instrumentList = () => {
      let list = {}
      _forEach(instruments, (value, key) => {
        if (validSize(slotSize, value.size) &&
          selectedInstrumentClass === value.instrumentClass.name &&
          (selectedInstrumentBrand === 'All models' || selectedInstrumentBrand === value.brand)) {
          list[key] = value
        }
      })
    
      return (
        <div className="instrument-list">
          { _toArray(list).map((value, index) => {
            return (
              <InstrumentListRow key={ index }
                                 value={value}
                                 index={index}
                                 style={!!overButton[index] || !!overInfo[index] ? "block" : "none"}
                                 doSelectInstrument={doSelectInstrument}
                                 onMouseOverButton={onMouseOverButton}
                                 onMouseOutButton={onMouseOutButton}
                                 onMouseOverInfo={onMouseOverInfo}
                                 onMouseOutInfo={onMouseOutInfo}
              />
            )})
          }
        </div>
      )
    }
    
    const doSelectInstrument = (value) => {
      onUpdateSlots(value)
      onSelectInstrument(value)
    }
  
    const onMouseOverButton = (index) => {
      let newVal = {}
      newVal[index] = true
      this.setState({ overButton: newVal })
    }
  
    const onMouseOutButton = (index) => {
      this.setState({ overButton: {} })
    }
  
    const onMouseOverInfo = (index) => {
      let newVal = {}
      newVal[index] = true
      this.setState({ overInfo: newVal })
    }
  
    const onMouseOutInfo = (index) => {
      this.setState({ overInfo: {} })
    }
  
    let topHeading
    let displayItems = []
    let exitButton = true
    let backButton = true
  
    // Nothing selected
    if (!selectedSlot) {
      topHeading = `Build your ${template.charAt(0).toUpperCase() + template.slice(1)} instrument panel`
      exitButton = false
      backButton = false
    }
    // single instrument
    else if (!!selectedSlot && !!selectedInstrument) {
      topHeading = `${instruments[selectedInstrument].name} (${instruments[selectedInstrument].brand})`
      displayItems = instrumentPreview()
    }
    // Instrument class list
    else if (!!selectedSlot && !selectedInstrumentClass) {
      topHeading = sideBarHeadings.selectInstrumentType
      displayItems = instrumentClassList()
    }
    // Brand list
    else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrumentBrand) {
      topHeading = selectedInstrumentClass + ": " + sideBarHeadings.selectBrand
      displayItems = instrumentBrandList()
    }
    // Instrument list
    else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !selectedInstrument) {
      topHeading =  selectedInstrumentBrand + " " + selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel
      displayItems = instrumentList()
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