import React, { Fragment } from 'react'

function Slot({
  instruments,  // all instruments
  slot,         // current slot to draw eg "L01"
  selectedSlot,
  slots,        // hash of slots with instruments already
  onSelectSlot, // callback function to pass back which slot was clicked
  pxWidth       // function to calc width in pixels from width %
}){

  var classForSlot = "size-" + slot.substring(0,1).toLowerCase() + " slot"
  if (selectedSlot === slot) {
    classForSlot += " selected-slot"
  }

  let slotInstrument = null
  let picWidth = 11
  let picHeight = 11
  let picHOffset = 0
  let picVOffset = 0
  if (!!slots[slot]) {
    slotInstrument = instruments[slots[slot]]
    picWidth = pxWidth(slotInstrument.pictureWidth)
    picHeight = pxWidth(slotInstrument.pictureHeight)
    picHOffset = pxWidth(slotInstrument.pictureHOffset)
    picVOffset = pxWidth(slotInstrument.pictureVOffset)
  }
  let picStyle = {
    width: picWidth,
    height: picHeight,
    marginLeft: picHOffset,
    marginTop: picVOffset
  }

  return(
      <div id={slot} className={classForSlot} onClick={() => onSelectedSlot(slot)}>
        { !!slotInstrument ?
          <Fragment>
            <img src={slotInstrument.pictureUrl} alt={slotInstrument.name} style={picStyle}/>
            <div className="slot-label">
              {`${slotInstrument.name} (${slotInstrument.brand})`}
            </div>
          </Fragment>
          : ''
        }
      </div>
  )}

export default Slot