import React, { useGlobal, useState } from 'reactn'
import { validSize, useUpdateSlots } from "./Sidebar"
import InstrumentListRow from './InstrumentListRow'
import _forEach from 'lodash/forEach'


export default function InstrumentList({ slotSize }) {
  const instruments = useGlobal('instruments')[0]
  const classes = useGlobal('classes')[0]
  const selectedInstrumentClass = useGlobal('selectedInstrumentClass')[0]
  const [overButton, setOverButton] = useState({})
  const [overInfo, setOverInfo] = useState({})
  const doSelectInstrument = useSelectInstrument()


  const onMouseOverButton = (index) => {
    let newVal = {}
    newVal[index] = true
    setOverButton(newVal)
  }

  const onMouseOutButton = () => {
    setOverButton({})
  }

  const onMouseOverInfo = (index) => {
    let newVal = {}
    newVal[index] = true
    setOverInfo(newVal)
  }

  const onMouseOutInfo = () => {
    setOverInfo({})
  }

  let list = {}
  let list2 = []
  let head = null
  let heading = false

  // accumulate instruments within brand lists
  _forEach(instruments, (value, key) => {
    if (validSize(slotSize, value.size) && selectedInstrumentClass === classes[value.instrument_class_id].name) {
      //list[key] = value
      if (!list[value.brand]) list[value.brand] = {}
      list[value.brand][key] = value
    }
  })

  // put the several brand lists into one array
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
            doSelectInstrument={ doSelectInstrument }
            onMouseOverButton={ onMouseOverButton }
            onMouseOutButton={ onMouseOutButton }
            onMouseOverInfo={ onMouseOverInfo }
            onMouseOutInfo={ onMouseOutInfo }
          />
        )
      })
      }
    </div>
  )
}

// hooks

function useSelectInstrument() {
  const setSelectedInstrument = useGlobal('selectedInstrument')[1]
  const onUpdateSlots = useUpdateSlots()

  return (value) => {
    onUpdateSlots(value)
    setSelectedInstrument(value)
  }
}
