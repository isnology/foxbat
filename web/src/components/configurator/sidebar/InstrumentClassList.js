import React, { useGlobal } from 'reactn'
import { validSize } from "./Sidebar"
import Button from '../../shared/Button'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'


export default function InstrumentClassList({ slotSize, }) {
  const setSelectedInstrumentClass = useGlobal('selectedInstrumentClass')[1]
  const instruments = useGlobal('instruments')[0]
  const classes = useGlobal('classes')[0]

  let list = {}

  _forEach(instruments, (value) => {
    if (validSize(slotSize, value.size)) {
      //list[value.instrument_class.name] = value.instrument_class.name
      list[value.instrument_class_id] = classes[value.instrument_class_id].name
    }
  })
  return (
    <div className="subset">
      { _map(list, (value, key) => (
        <Button subClass="sidebar"
                key={ key }
                onClick={ () => setSelectedInstrumentClass(value) }
        >
          { value }
        </Button>
        ))
      }
    </div>
  )
}
