import React from 'react'

function Slot({
  instruments, // all instruments
  slotObject, //object representing the instrument occupying this slot eg "L01" (or null)
  panelHeight, //necessary to readjust size and slotNumber appropriately
  slotNumber, //assigned and tracked by the caller
  leftRatio, //the left slotNumber of this slot as a ratio of the panel height
  bottomRatio, //the top slotNumber of this slot as a ratio of the panel height measured from the bottom
  diameterRatio, //the diameter of the slot as a ratio of the panel height
  heightRatio,
  widthRatio,
  selectedSlot,
  slots,
  onSelectSlot, //callback function to pass back which slot was clicked
  pxWidth
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
    width: slotWidth,
    height: slotHeight,
    left: (panelHeight * leftRatio),
    top: (panelHeight * (1-bottomRatio))
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

  let slotInstrument = null
  let picWidth = 11
  let picHeight = 11
  let picHOffset = 0
  let picVOffset = 0
  if (!!slotObject) {
    slotInstrument = instruments[slotObject]
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
      <div className={classForSlot} id={slotNumber} style={slotStyle} onClick={onSelectSlot}>
        { !!slotObject ?
          <div className="slot-label">
            {`${slotInstrument.name} (${slotInstrument.brand})`}
          </div> : '' }
        { !!slotObject ? <img src={slotInstrument.pictureUrl} alt={slotInstrument.name} style={picStyle}/> : '' }
      </div>
  )}

export default Slot