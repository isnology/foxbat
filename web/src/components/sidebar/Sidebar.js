import React, { Component, Fragment } from 'react'
import ExitButton from '../shared/ExitButton'
import BackButton from './BackButton'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import InstrumentList from './InstrumentList'
import InstrumentClassList from './InstrumentClassList'

export function validSize(slotSize, instSize) {
  const size = { L: 3, M: 2, S: 1 }
  return (size[slotSize] > size[instSize] || slotSize === instSize)
}


export default class Sidebar extends Component {

  render () {
    const app = this.props.app

    const {
      instruments,
      template,
      selectedSlot,
      selectedInstrument,
      selectedInstrumentClass,
    } = app.state

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
      displayItems = <InstrumentPreview app={ app } />
    }
    // Instrument class list
    else if (!!selectedSlot && !selectedInstrumentClass) {
      topHeading = sideBarHeadings.selectInstrumentType
      displayItems = <InstrumentClassList app={ app } slotSize={ slotSize } />
    }
    // Instrument list
    else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrument) {
      topHeading = selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel
      displayItems = <InstrumentList app={ app } slotSize={ slotSize }/>
    }

    return (
      <div className="sidebar">

        <div className="sidebar-top">
          <div className="sidebar-top-buttons">
            { exitButton && <ExitButton subClass="sidebar-top-button" onExitClick={ app.onClose }/> }
            { backButton && <BackButton subClass="sidebar-top-button" onBack={ app.onBack }/> }
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
