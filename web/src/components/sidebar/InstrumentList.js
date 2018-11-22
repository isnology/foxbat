import React, { Component } from 'react'
import { validSize } from "./Sidebar"
import InstrumentListRow from './InstrumentListRow'
import _forEach from 'lodash/forEach'

export default class InstrumentList extends Component {
  state = {
    overButton: {},
    overInfo: {}
  }

  onMouseOverButton = (index) => {
    let newVal = {}
    newVal[index] = true
    this.setState({ overButton: newVal })
  }

  onMouseOutButton = () => {
    this.setState({ overButton: {} })
  }

  onMouseOverInfo = (index) => {
    let newVal = {}
    newVal[index] = true
    this.setState({ overInfo: newVal })
  }

  onMouseOutInfo = () => {
    this.setState({ overInfo: {} })
  }

  render () {
    const {
      overButton,
      overInfo
    } = this.state

    const {
      app,
      slotSize
    } = this.props

    let list = {}
    let list2 = []
    let head = null
    let heading = false

    _forEach(app.state.instruments, (value, key) => {
      if (validSize(slotSize, value.size) && app.state.selectedInstrumentClass === value.instrument_class.name) {
        //list[key] = value
        if (!list[value.brand]) list[value.brand] = {}
        list[value.brand][key] = value
      }
    })

    _forEach(list, (brand) => {
      _forEach(brand, (value) => {
        list2.push(value)
      })
    })

    return (
      <div className="instrument-list">
        { list2.map((value, index) => {
          if (head !== value.brand) {
            heading = true
            head = value.brand
          }
          else heading = false
          return (
            <InstrumentListRow
              key={ index }
              value={ value }
              index={ index }
              heading={ heading }
              style={ !!overButton[index] || !!overInfo[index] ? "block" : "none" }
              doSelectInstrument={ app.doSelectInstrument }
              onMouseOverButton={ this.onMouseOverButton }
              onMouseOutButton={ this.onMouseOutButton }
              onMouseOverInfo={ this.onMouseOverInfo }
              onMouseOutInfo={ this.onMouseOutInfo }
            />
          )
        })
        }
      </div>
    )
  }
}
