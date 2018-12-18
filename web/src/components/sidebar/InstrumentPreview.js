import React, { useGlobal } from 'reactn'
import Button from '../shared/Button';
import numeral from "numeral";


export function turnTextToAnkor(text) {
  if (text.indexOf("http") >= 0) {
    return (
      <a href={ text } target="_blank" rel="noopener noreferrer">Link (opens in new tab)</a>
    )
  }
  else {
    return text
  }
}

export default function InstrumentPreview({app}) {

  const [instruments, setInstruments] = useGlobal('instruments')
  const [selectedInstrument, setSelectedInstrument] = useGlobal('selectedInstrument')
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')

  const instrument = instruments[selectedInstrument]

  const onRemove = () => {
    app.onUpdateSlots(null)
    setSelectedInstrument(null)
    setSelectedInstrumentClass(null)
  }

  return (
    <div className="sidebar_preview">
      <div className="sidebar_preview_instrument">
        { !!instrument.picture_url &&
        (<img src={ instrument.picture_url } alt={instrument.name} className="instrument-preview--img" />)
        }
      </div>
      <Button onClick={ onRemove }>Remove</Button>
      <div className="sidebar_preview_instrument-details">
        <p className="sidebar_preview_instrument-details--price">{ numeral(instrument.price/100).format('$0,0.00') } USD</p>
        <div className="sidebar_preview_text">
          <p><strong>Type:</strong> { instrument.instrument_class.name }</p>
          <p><strong>Brand:</strong> { instrument.brand }</p>
          <p><strong>Model:</strong> { instrument.model }</p>
          <p><strong>Part no:</strong> { instrument.part_no }</p>
          <p><strong>Size:</strong> { instrument.size }</p>
          <p>{ turnTextToAnkor(instrument.text) }</p>
        </div>
      </div>
    </div>
  )
}
