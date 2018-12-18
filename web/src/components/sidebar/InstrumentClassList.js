import React, { useGlobal } from 'reactn'
import { validSize } from "./Sidebar"
import Button from '../shared/Button'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'


export default function InstrumentClassList({ slotSize, }) {

  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')
  const [instruments, setInstruments] = useGlobal('instruments')

  let list = {}

  _forEach(instruments, (value) => {
    if (validSize(slotSize, value.size)) {
      list[value.instrument_class.name] = value.instrument_class.name
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
