import React from 'react'

export default function Slot({ app, slot }){

  const {
    instruments,
    selectedSlot,
    slots,
    template
  } = app.state

  let size = slot.substring(0,1)
  let slotInstrument = null
  let picWidth = 11
  let picHeight = 11
  let picHOffset = 0
  let picVOffset = 0
  if (!!slots[slot]) {
    slotInstrument = instruments[slots[slot]]
    // cater for a small instrument in a large hole
    size = slotInstrument.size
    picWidth = slotInstrument.picture_width
    picHeight = slotInstrument.picture_height
    picHOffset = slotInstrument.picture_h_offset
    picVOffset = slotInstrument.picture_v_offset
  }

  let classForSlot = `panel_svg-${template}_${slot} size-${size} slot`
  if (selectedSlot === slot) {
    classForSlot += " selected-slot"
  }

  let picStyle = {
    width: `${picWidth}vw`,
    height: `${picHeight}vw`,
    marginLeft: `${picHOffset}vw`,
    marginTop: `${picVOffset}vw`
  }


  return (
      <div id={slot} className={classForSlot} onClick={() => app.onSelectSlot(slot)}>
        { !!slotInstrument ?
            <div className="panel_image" style={picStyle}>
              <img className="panel_img" src={slotInstrument.picture_url} alt={slotInstrument.name} />
            </div>
          : ''
        }
      </div>
  )
}
