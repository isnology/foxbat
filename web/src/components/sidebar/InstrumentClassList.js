import React from 'react'
import { validSize } from "./Sidebar"
import Button from '../shared/Button'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'

export default function InstrumentClassList({ app, slotSize, }) {
  let list = {}

  _forEach(app.state.instruments, (value) => {
    if (validSize(slotSize, value.size)) {
      list[value.instrument_class.name] = value.instrument_class.name
    }
  })
  return (
    <div className="subset">
      { _map(list, (value, key) => (
        <Button subClass="sidebar"
                key={ key }
                onClick={ () => app.onSelectInstrumentClass(value) }
        >
          { value }
        </Button>
        ))
      }
    </div>
  )
}
