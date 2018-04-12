import React, { Component } from 'react'
import A22outline from './panelOutlines/a22'
import A32outline from './panelOutlines/a32'
import Slot from './panelOutlines/Slot'

class Panel extends Component {
  state = {
    panelName: null, //title user gave their panel
    panelId: null, // db id of users retrieved/saved panel
    panelList: null,  // list of all saved panels by this user
    selectedSlot: null,
    templateSlots: null,  // list of slot names in template (array of strings)
    error: null, //for displaying any errors recieved from the server
    pxwFactor: 0.0  // for adaptive sizing of instruments
  }

  // converts screen width % to pixels
  pxWidth = (screenWidthPercent) => {
    return Math.round(this.state.pxwFactor * screenWidthPercent)
  }

  onSelectSlot = (slot) => {
    const newSlot = !!this.state.selectedSlot ? null : slot
    this.setState({
      selectedSlot: newSlot,
      // selectedInstrumentClass: null,
      // selectedInstrumentBrand: null,
      // selectedInstrument: null
    })
  }


  render () {
    const {
      selectedSlot
    } = this.state

    const {
      instruments,
      templateName,
      slots
    } = this.props

    const slotLayout = {
      a22: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a32: [["L01", "L04"], ["L02", "L05"], ["L03", "L06"], ["M01", "M02", "M03"], ["S01", "S02", "S03"]],
      a22Digital: [["M01", "M02"], ["D01"], ["R01", "R02"]],
      a32Digital: [["D01"], ["R01", "R02"], ["M01", "M02"]]
    }

    return (
      <div className="panel">
        { templateName === 'a22' || templateName === 'a22Digital' ? <A22outline/> : <A32outline/> }
        { slotLayout[templateName].map((slotArray, index) => (
            <div key={index} className={ slotArray[0].substring(0,1).toLowerCase() + "-container"}>
              { slotArray.map((slot, index2) => (
                  <Slot
                    key={index2}
                    instruments={ instruments }
                    slot={ slot }
                    selectedSlot={ selectedSlot }
                    slots={ slots }
                    onSelectSlot={onSelectSlot}
                    pxWidth={pxWidth}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }


  constructor(props) {
    super(props)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  // When this App first appears on screen
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
    })
  }

  // code necessary for window size detection
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
    //window.removeEventListener('beforeunload')
  }

  // code necessary for window size detection
  updateWindowDimensions() {
    const pxw = window.innerWidth / 100
    this.setState({
      //windowWidth: window.innerWidth,
      //windowHeight: window.innerHeight,
      pxwFactor: pxw
    })
  }
}

export default Panel