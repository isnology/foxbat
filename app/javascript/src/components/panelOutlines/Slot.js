import React from 'react'
import _toString from 'lodash/toString'

function Slot({
  instruments, // all instruments
  slotObject, //object representing the instrument occupying this slot (or null)
  panelHeight, //necessary to readjust size and slotNumber appropriately
  slotNumber, //assigned and tracked by the caller
  leftRatio, //the left slotNumber of this slot as a ratio of the panel height
  bottomRatio, //the top slotNumber of this slot as a ratio of the panel height measured from the bottom
  diameterRatio, //the diameter of the slot as a ratio of the panel height
  heightRatio,
  widthRatio,
  selectedSlot,
  slots,
  onSelectSlot //callback function to pass back which slot was clicked
}){
  let slotWidth
  let slotHeight
  if (!!diameterRatio){
    slotWidth =  diameterRatio * panelHeight
    slotHeight = slotWidth
  }else{
    slotWidth =  widthRatio * panelHeight
    slotHeight = heightRatio * panelHeight
  }

  let slotStyle={
    // Variable styles only. Other styles in css
    zIndex: 2,
    width: slotWidth + 'px',
    height: slotHeight + 'px',
    left: (panelHeight * leftRatio) + 'px',
    top: (panelHeight * (1-bottomRatio)) + 'px'
  }
  if (!!diameterRatio) {
    slotStyle.borderRadius = '50%'
  }
  // if (!!instrument && !!instrument.shape){
  //   slotStyle.borderRadius = (instrument.shape === "circle") ? '50%' : '0%'
  // }

  var classForSlot = "slot"
  if (selectedSlot === slotNumber) {
    classForSlot = classForSlot + " selected-slot"
  }

  let slotInstrument
  let picWidth = 100
  let picHorizontal = 100
  let picVertical = 100
  if (!!slotObject) {
    slotInstrument = instruments[slotObject]
    let multiplier = slotInstrument.sizeMultiplier / 100
    picWidth *= multiplier
    multiplier = slotInstrument.horizontalMultiplier / 100
    picHorizontal *= multiplier
    multiplier = slotInstrument.verticalMultiplier / 100
    picVertical *= multiplier
  }
  let picStyle = {
    marginLeft: picHorizontal,
    marginTop: picVertical
  }

  return(
      <div className={classForSlot} id={slotNumber} style={slotStyle} onClick={onSelectSlot}>
        { !!slotObject ?
          <div className="slot-label">
            {`${slotInstrument.name} (${slotInstrument.brand})`}
          </div> : '' }
        { !!slotObject ? <img src={slotInstrument.pictureUrl} width={ _toString(picWidth)+'%' } alt={slotInstrument.name} style={picStyle}/> : '' }
      </div>
  )}

export default Slot