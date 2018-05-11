import React, { Fragment } from 'react'

function Slot({
  instruments,  // all instruments
  slot,         // current slot to draw eg "L01"
  selectedSlot,
  slots,        // hash of slots with instruments already
  template,
  onSelectSlot, // callback function to pass back which slot was clicked
  pxWidth       // function to calc width in pixels from width %
}){


  let classForSlot = "size-" + slot.substring(0,1).toLowerCase() + " slot"
  if (selectedSlot === slot) {
    classForSlot += " selected-slot"
  }

  let slotInstrument = null
  let picWidth = 11
  let picHeight = 11
  let picHOffset = 0
  let picVOffset = 0
  const multiplier = (template === "a32" || template === "a32Digital" ? 0.935 : 1)
  if (!!slots[slot]) {
    slotInstrument = instruments[slots[slot]]
    picWidth = pxWidth(slotInstrument.picture_width * multiplier)
    picHeight = pxWidth(slotInstrument.picture_height * multiplier)
    picHOffset = pxWidth(slotInstrument.picture_h_offset * multiplier)
    picVOffset = pxWidth(slotInstrument.picture_v_offset * multiplier)
  }
  let picStyle = {
    width: picWidth,
    height: picHeight,
    marginLeft: picHOffset,
    marginTop: picVOffset
  }

  
  return (
      <div id={slot} className={classForSlot} onClick={() => onSelectSlot(slot)}>
        { !!slotInstrument ?
            <img src={slotInstrument.picture_url} alt={slotInstrument.name} style={picStyle}/>
          : ''
        }
      </div>
  )
}

export default Slot