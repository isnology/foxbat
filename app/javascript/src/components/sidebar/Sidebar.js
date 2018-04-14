import React, { Fragment } from 'react'
import ExitButton from '../ExitButton'
import BackButton from '../BackButton'
import Button from '../Button'
import NavList from './NavList'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import _forEach from 'lodash/forEach'
import _toArray from 'lodash/toArray'

export function validSize(slotSize, instSize) {
  const size = { L: 3, M: 2, S: 1 }
  return (size[slotSize] > size[instSize] || slotSize === instSize)
}


function Sidebar ({
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
}) {
  
  function instrumentClassList(instruments, slotSize) {
    let list = {}
    _forEach(instruments, (value, key) => {
      if (validSize(slotSize, value.size)) {
        list[value.instrumentClass.name] = value.instrumentClass.name
      }
    })
    return (
      _toArray(list).map((value, index) => {
        return (
          <Button
            key={index}
            text={ value }
            onClick={ () => onSelectInstrumentClass(value) }
          />
        )
      })
    )
  }
  
  function instrumentBrandList(instruments, slotSize, selectedInstrumentClass)  {
    let list = {}
    _forEach(instruments, (value, key) => {
      if (validSize(slotSize, value.size) && selectedInstrumentClass === value.instrumentClass.name) {
        list[value.brand] = value.brand
      }
    })
    let temp = _toArray(list)
    temp.push('All models')
    return (
      temp.map((value, index) => {
        return (
          <Button
            key={index}
            text={ value }
            onClick={ () => onSelectInstrumentBrand(value) }
          />
        )
      })
    )
  }
  
  function doSelectInstrument(value)  {
    onUpdateSlots(value)
    onSelectInstrument(value)
  }
  
  function instrumentList(instruments, slotSize, selectedInstrumentClass, selectedInstrumentBrand)  {
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
            <Button
              key={ index }
              text={ value.name }
              image={ value.pictureUrl }
              onClick={ () => doSelectInstrument(value.id) }
            />
          )
        })
        }
      </div>
    )
  }
  
  function onBackClick () {
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

export default Sidebar