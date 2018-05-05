import React, { Fragment } from 'react'

function Slot({
  instruments,  // all instruments
  slot,         // current slot to draw eg "L01"
  selectedSlot,
  slots,        // hash of slots with instruments already
  templateName,
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
  const multiplier = (templateName === "a32" || templateName === "a32Digital" ? 0.935 : 1)
  if (!!slots[slot]) {
    slotInstrument = instruments[slots[slot]]
    picWidth = pxWidth(slotInstrument.pictureWidth) * multiplier
    picHeight = pxWidth(slotInstrument.pictureHeight) * multiplier
    picHOffset = pxWidth(slotInstrument.pictureHOffset) * multiplier
    picVOffset = pxWidth(slotInstrument.pictureVOffset) * multiplier
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
          <Fragment>
            <img src={slotInstrument.pictureUrl} alt={slotInstrument.name} style={picStyle}/>
          </Fragment>
          : ''
        }
      </div>
  )
}

export default Slot