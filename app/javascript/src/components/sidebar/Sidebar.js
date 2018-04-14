import React, { Component, Fragment } from 'react'
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

class Sidebar extends Component {
  state = {
    selectedInstrumentClass: null,
    selectedInstrumentBrand: null
  }

  onSelectInstrumentClass = (item) => {
    this.setState({ selectedInstrumentClass: item })
  }

  onSelectInstrumentBrand = (item) => {
    this.setState({ selectedInstrumentBrand: item })
  }

  instrumentClassList = (instruments, slotSize) => {
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
            onClick={ () => this.onSelectInstrumentClass(value) }
          />
        )
      })
    )
  }

  instrumentBrandList = (instruments, slotSize, selectedInstrumentClass) => {
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
            onClick={ () => this.onSelectInstrumentBrand(value) }
          />
        )
      })
    )
  }

  instrumentList = (instruments, slotSize, selectedInstrumentClass, selectedInstrumentBrand) => {
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
                    onClick={ () => this.props.onUpdateSlots(null, this.props.selectedSlot, value.id) }
                />
            )
          })
        }
      </div>
    )
  }

  onBackClick = () => {
    if (!!this.props.selectedInstrument) {
      this.props.onSelectInstrument(null)
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
  }

  onSidebarClose = () => {
    this.setState({
      selectedInstrumentClass: null,
      selectedInstrumentBrand: null,
    })
    this.props.onSelectInstrument(null)
  }

// { !!selectedInstrument &&
// <InstrumentPreview
// instruments={ instruments }
// slots={ slots }
// selectedSlot={ selectedSlot }
// selectedInstrument={ selectedInstrument }
// toggleInstrumentToSlot={ onSelectInstrument }
// />
// }


  render () {
    const {
      selectedInstrumentClass,
      selectedInstrumentBrand
    } = this.state

    const {
      instruments,
      templateName,
      selectedSlot,
      selectedInstrument,
      onSelectInstrument
    } = this.props


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
    // Select an instrument class
    else if (!!selectedSlot && !selectedInstrumentClass) {
      topHeading = sideBarHeadings.selectInstrumentType
      displayItems = this.instrumentClassList(instruments, slotSize)
    }
    //
    else if (!!selectedSlot && !!selectedInstrumentClass && !selectedInstrumentBrand) {
      topHeading = selectedInstrumentClass + ": " + sideBarHeadings.selectBrand
      displayItems = this.instrumentBrandList(instruments, slotSize, selectedInstrumentClass)
    }
    // Select instrument class and brand
    else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !selectedInstrument) {
      topHeading =  selectedInstrumentBrand + " " + selectedInstrumentClass.toLowerCase() + sideBarHeadings.selectModel
      displayItems = this.instrumentList(instruments, slotSize, selectedInstrumentClass, selectedInstrumentBrand)
    }
    else if (!!selectedSlot && !!selectedInstrumentClass && !!selectedInstrumentBrand && !!selectedInstrument) {
      // Now passing objects
      topHeading = `${instruments[selectedInstrument].name} (${instruments[selectedInstrument].brand})`
    }

    return (
      <div className="sidebar">

        <div className="sidebar-top">
          <div className="sidebar-top-buttons">
            { exitButton ? <ExitButton onExitClick={ this.sidebarClose }/> : <span></span>}
            { backButton && <BackButton onBack={ this.onBackClick }/> }
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