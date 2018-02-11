import React from 'react'
import ExitButton from '../ExitButton'
import BackButton from '../BackButton'
import NavList from './NavList'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import _forEach from 'lodash/forEach'
import _toArray from 'lodash/toArray'


export function validSize(slotSize, instSize) {
  const size = { L: 3, M: 2, S: 1 }
  return (size[slotSize] >= size[instSize])
}

function Sidebar({
  templateName,
  instruments,
  slots,
  selectedSlot,           // slot number
  selectedInstrumentClass,
  selectedInstrumentBrand,
  selectedInstrument, // This is an object
  onInstrumentSelection, // (templateName?, brand?, model?) => {}
  assignInstrumentToSelectedSlot, // Must be given the object
  sidebarClose,
  onBackClick
}) {

  let activeSlot = null
  let activeSlotSize = null
  if (!!selectedSlot && !selectedInstrument) {
    activeSlot = slots[selectedSlot]
    activeSlotSize = selectedSlot.substring(0,1)
  }

  function instrumentClassList(instruments) {
    let types = {}
    _forEach(instruments, (value, key) => {
      if (validSize(activeSlotSize, value.size)) {
        types[value.instrumentClass.name] = value.instrumentClass.name
      }
    })
    return _toArray(types)
  }

  function instrumentBrandList(instruments, selectedInstrumentClass) {
    let brands = {}
    _forEach(instruments, (value, key) => {
      if (validSize(activeSlotSize, value.size) && selectedInstrumentClass === value.instrumentClass.name) {
        brands[value.brand] = value.brand
      }
    })
    let temp = _toArray(brands)
    temp.push('All models')
    return temp
  }

  function instrumentList(instruments, selectedInstrumentClass, selectedInstrumentBrand) {
    let models = {}
    _forEach(instruments, (value, key) => {
      if (validSize(activeSlotSize, value.size) &&
          selectedInstrumentClass === value.instrumentClass.name &&
          (selectedInstrumentBrand === 'All models' || selectedInstrumentBrand === value.brand)) {
        models[key] = value
      }
    })
    return _toArray(models)
  }

  function RenderToSidebar() {
    if (!!selectedSlot && !selectedInstrument) {
            // Is there an instrument already in the slot?
      return (
        !!slots[selectedSlot] ? (
          <InstrumentPreview
            slots={ slots }
            selectedSlot={ selectedSlot }
            selectedInstrument={ instruments[slots[selectedSlot]] }
            instruments={ instruments }
            toggleInstrumentToSlot={ assignInstrumentToSelectedSlot }
          />
        ) : (
          <NavList
            displayItems={ displayItems }
            modelObjects={ modelObjects }
            onInstrumentSelection={ onSelectItem }
          />
        )
      )
    }
    else if ((!!selectedInstrument)) {
      return (
        <InstrumentPreview
          slots={ slots }
          selectedSlot={ selectedSlot }
          selectedInstrument={ selectedInstrument }
          instruments={ instruments }
          toggleInstrumentToSlot={ assignInstrumentToSelectedSlot }
        />
      )
    }
    else if (!selectedSlot) {
      return <SidebarText />
    }
  }

  let topHeading
  let displayItems = []
  let onSelectItem
  let modelObjects
  let exitButton = true
  let backButton = true

  // Nothing selected
  if (!selectedSlot) {
    topHeading = `Build your ${templateName.charAt(0).toUpperCase() + templateName.slice(1)} instrument panel`
    exitButton = false
    backButton = false
  }
  // Selected a slot
  else if (!!selectedSlot && !selectedInstrumentClass) {
    topHeading = sideBarHeadings.selectInstrumentType
    displayItems = instrumentClassList(instruments)
    onSelectItem = (instrumentClass) => {
      onInstrumentSelection(instrumentClass)
    }
  }
  // Select slot and templateName
  else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrumentBrand) {
    topHeading = selectedInstrumentClass + ": " + sideBarHeadings.selectBrand
    displayItems = instrumentBrandList(instruments, selectedInstrumentClass)
    onSelectItem = (brand) => {
      onInstrumentSelection(selectedInstrumentClass, brand)
   }
  }
  // Select slot, templateName, and brand
  else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !selectedInstrument) {
    topHeading =  selectedInstrumentBrand + " " + selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel

    modelObjects = instrumentList(instruments, selectedInstrumentClass, selectedInstrumentBrand)

    onSelectItem = (model) => {
      onInstrumentSelection(selectedInstrumentClass, selectedInstrumentBrand, model)
   }
  }
  else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !!selectedInstrument) {
    // Now passing objects
    topHeading = `${selectedInstrument.name} (${selectedInstrument.brand})`
  }

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton ? <ExitButton onExitClick={ sidebarClose }/> : <span></span>}
          { backButton && <BackButton onBack={ onBackClick }/> }
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        <RenderToSidebar />
      </div>
    </div>
  )
}

export default Sidebar