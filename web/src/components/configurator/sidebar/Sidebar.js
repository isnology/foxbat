import React, { useGlobal, Fragment } from 'reactn'
import ExitButton from '../../shared/ExitButton'
import BackButton from './BackButton'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../../constants/messages'
import InstrumentList from './InstrumentList'
import InstrumentClassList from './InstrumentClassList'


export default function Sidebar() {
  const instruments = useGlobal('instruments')[0]
  const template = useGlobal('template')[0]
  const selectedSlot = useGlobal('selectedSlot')[0]
  const selectedInstrument = useGlobal('selectedInstrument')[0]
  const selectedInstrumentClass = useGlobal('selectedInstrumentClass')[0]
  const onBack = useBack()


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
    topHeading = `Build your ${template.charAt(0).toUpperCase() + template.slice(1)} instrument panel`
    exitButton = false
    backButton = false
  }
  // single instrument
  else if (!!selectedSlot && !!selectedInstrument) {
    topHeading = `${instruments[selectedInstrument].name} (${instruments[selectedInstrument].brand})`
    displayItems = <InstrumentPreview />
  }
  // Instrument class list
  else if (!!selectedSlot && !selectedInstrumentClass) {
    topHeading = sideBarHeadings.selectInstrumentType
    displayItems = <InstrumentClassList slotSize={ slotSize } />
  }
  // Instrument list
  else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrument) {
    topHeading = selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel
    displayItems = <InstrumentList slotSize={ slotSize }/>
  }

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton && <ExitButton subClass="sidebar-top-button" onExitClick={ onBack }/> }
          { backButton && <BackButton subClass="sidebar-top-button" onBack={ onBack }/> }
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

// hooks

function useBack() {
  const selectedInstrument = useGlobal('selectedInstrument')[0]
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')

  return () => {
    if (!!selectedInstrument) {
      // do nothing
    }
    else if (!!selectedInstrumentClass) {
      setSelectedInstrumentClass(null)
    }
  }
}

const size = { L: 3, M: 2, S: 1 }

// exports

export function validSize(slotSize, instSize) {
  return (size[slotSize] > size[instSize] || slotSize === instSize)
}

// exported hooks

export function useUpdateSlots() {
  const [slots, setSlots] = useGlobal('slots')
  const selectedSlot = useGlobal('selectedSlot')[0]
  const setPanelSaved = useGlobal('panelSaved')[1]

  return (instrumentVal) => {
    let newSlots = slots
    if (!!newSlots[selectedSlot]) {
      delete newSlots[selectedSlot]
    }
    else {
      newSlots[selectedSlot] = instrumentVal
    }
    setSlots(newSlots)
    setPanelSaved(false)
  }
}
