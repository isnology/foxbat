import React from 'react'
import Button from '../Button';
import numeral from "numeral";


export function turnTextToAnkor(text) {
  if (text.indexOf("http") >= 0) {
    return (
      <a href={ text } target="_blank">Link (opens in new tab)</a>
    )
  }
  else {
    return text
  }
}

const InstrumentPreview = ({
  instruments,
  slots,
  selectedSlot,
  selectedInstrument,
  onUpdateSlots,
  onSidebarClose,
  onSelectInstrument
}) => {
  
  const instrument = instruments[selectedInstrument]
  
  const onRemove = () => {
    onUpdateSlots(null)
    onSidebarClose()
    onSelectInstrument(null)
  }
  
  return (
    <div className="previewClass">
      <div className="instrument-details">
        <p><strong>Type:</strong> { instrument.instrument_class.name }</p>
        <p><strong>Model:</strong> { instrument.model }</p>
        <p><strong>Part no:</strong> { instrument.part_no }</p>
        <p><strong>Size:</strong> { instrument.size }</p>
        <p>{ turnTextToAnkor(instrument.text) }</p>
      </div>
      <div className="instrument-preview">
        <p>{ numeral(instrument.price/100).format('$0,0.00') } USD</p>
        { !!instrument.picture_url ?
            (<img src={ instrument.picture_url } alt={instrument.name} className="btnimg" />) :
            ('')
        }
      </div>
        <Button
          text="Remove"
          onClick={ onRemove }
        />
    </div>
  )
}

export default InstrumentPreview