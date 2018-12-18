import React, { useGlobal } from 'reactn'

export default function Slot({ slot }){
  const [instruments, setInstruments] = useGlobal('instruments')
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')
  const [slots, setSlots] = useGlobal('slots')
  const [template, setTemplate] = useGlobal('template')
  const onSelectSlot = useSelectSlot()


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
      <div id={slot} className={classForSlot} onClick={() => onSelectSlot(slot)}>
        { !!slotInstrument ?
            <div className="panel_image" style={picStyle}>
              <img className="panel_img" src={slotInstrument.picture_url} alt={slotInstrument.name} />
            </div>
          : ''
        }
      </div>
  )
}

function useSelectSlot() {
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')
  const [slots, setSlots] = useGlobal('slots')
  const [selectedInstrument, setSelectedInstrument] = useGlobal('selectedInstrument')
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')

  return (slot) => {
    setSelectedSlot(slot)
    setSelectedInstrument(slots[slot])
    setSelectedInstrumentClass(null)
  }
}
