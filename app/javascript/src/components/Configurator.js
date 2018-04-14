import React, { Component } from 'react'
import Sidebar from './sidebar/Sidebar'
import Panel from './Panel'

class Configurator extends Component {
  state = {
    selectedSlot: null,
    selectedInstrument: null,
    slots: {}
  }

  // When this App first appears on screen
  componentDidMount() {

  }

  onSelectInstrument = (instrument) => {
    this.setState({ selectedInstrument: instrument })
  }

  onSelectSlot = (slot) => {
    this.setState({ selectedSlot: slot })
  }

  onUpdateSlots = (slots, slot, instrument) => {
    if (!!slots) {
      this.setState({
        slots: slots,
        selectedSlot: slot,
        selectedInstrument: instrument
      })
      return
    }
    let newSlots = this.state.slots
    if (!!newSlots[slot]) {
      delete newSlots[slot]
    }
    else {
      newSlots[slot] = instrument
    }

    this.setState({
      slots: newSlots,
      selectedSlot: null,
      selectedInstrument: null
    })
  }

  onSidebarClose = () => {
    //
  }

  render() {
    const {
      selectedSlot,
      selectedInstrument,
      slots
    } = this.state

    const {
      instruments,
      templateName,
      signedIn,
      decodedToken,
      onSelectTemplate
    } = this.props

    return (
      <div className="configurator">
        <Panel
          instruments={ instruments }
          templateName={ templateName }
          signedIn={ signedIn }
          decodedToken={ decodedToken }
          selectedSlot={ selectedSlot }
          selectedInstrument={ selectedInstrument }
          slots={ slots }
          onSelectSlot={ this.onSelectSlot }
          onSelectInstrument={ this.onSelectInstrument }
          onSelectTemplate={ onSelectTemplate }
        />
        <Sidebar
          instruments={ instruments }
          templateName={ templateName }
          selectedSlot={ selectedSlot }
          selectedInstrument={ selectedInstrument }
          slots={ slots }
          onSelectInstrument={ this.onSelectInstrument }
          onUpdateSlots={ this.onUpdateSlots }
        />
      </div>
    )
  }
}

export default Configurator