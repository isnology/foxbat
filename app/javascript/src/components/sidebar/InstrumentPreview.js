import React from 'react'
import Button from '../Button';
import numeral from "numeral";
import { validSize } from './Sidebar'

function turnTextToAnkor(text) {
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
  slots,
  selectedSlot,
  selectedInstrument,
  instruments,
  toggleInstrumentToSlot
}) => {

  let activeSlot
  let activeSlotSize
  let buttonLabel

  if (!!selectedSlot) {

    activeSlot = slots[selectedSlot]
    activeSlotSize = selectedSlot.substring(0,1)
    if (!!activeSlot) {
      buttonLabel = "Remove"
      selectedInstrument = instruments[activeSlot]
    }
    else {
      buttonLabel = "Add"
    }
  }

  return (
    <div className="previewClass">
      <div className="instrument-details">
        <p><strong>Type:</strong> { selectedInstrument.instrumentClass.name }</p>
        <p><strong>Model:</strong> { selectedInstrument.model }</p>
        <p><strong>Part no:</strong> { selectedInstrument.partNo }</p>
        <p><strong>Size:</strong> { selectedInstrument.size }</p>
        <p>{ turnTextToAnkor(selectedInstrument.text) }</p>
      </div>
      <div className="instrument-preview">
        <p>{ numeral(selectedInstrument.price/100).format('$0,0.00') } USD</p>
        { !!selectedInstrument.pictureUrl ?
            (<img src={ selectedInstrument.pictureUrl } alt="instrument" className="btnimg" />) :
            ('')
        }
      </div>
      { validSize(activeSlotSize, selectedInstrument.size) ?
        <Button
          text={ buttonLabel }
          onClick={ ()=>{ toggleInstrumentToSlot(selectedInstrument) } }
        /> :
        <div className="inactive"><Button
          text={ "Incompatible slot" }
        /></div>
      }
    </div>
  )
}

export default InstrumentPreview