import React, { useGlobal } from 'reactn'


const descriptions = {
  width: "70%",
  height: "100%",
}

const style = {
  position: "relative",
  height: "4rem",
  textAlign: "left",
  overflowY: "scroll",
}
const label = {
  position: "absolute",
  width: "6rem",
  top: "0",
  left: "0",
}

const text = {
  position: "absolute",
  width: "calc(100% - 6rem)",
  top: "0",
  left: "6rem",
}


export default function InstrumentListRow({ value }) {
  const classes = useGlobal('classes')[0]
  const onSelect = useSelect()


  return (
      <button className="btn btn--admin-instrument"
              onClick={ () => onSelect(value.id) }
      >
        <div style={descriptions}>
          <div style={style}>
            <p style={label}>Name:</p><div style={text}><p>{value.name}</p></div>
          </div>
          <div style={style}>
            <p style={label}>Class:</p><p style={text}>{classes[value.instrument_class_id].name}</p>
          </div>
          <div style={style}>
            <p style={label}>Brand:</p><p style={text}>{value.brand}</p>
          </div>
        </div>
        <img src={ value.picture_url } alt="instrument" className="btn--img"/>
      </button>
  )
}

// hooks

function useSelect() {
  const instruments = useGlobal('instruments')[0]
  const setSize = useGlobal('size')[1]
  const setVOffset = useGlobal('vOffset')[1]
  const setHOffset = useGlobal('hoffset')[1]
  const setWidth = useGlobal('width')[1]
  const setHeight = useGlobal('height')[1]
  const setModalOpen = useGlobal('modalOpen')[1]
  const setEditInstrument = useGlobal('editInstrument')[1]
  const setKlass = useGlobal('Klass')[1]
  const setName = useGlobal('name')[1]
  const setBrand = useGlobal('brand')[1]
  const setModel = useGlobal('model')[1]
  const setPartNo = useGlobal('partNo')[1]
  const setTextarea = useGlobal('textarea')[1]
  const setPictureUrl = useGlobal('pictureUrl')[1]
  const setUploaded = useGlobal('upload')[1]
  const setPrice = useGlobal('price')[1]

  return (id) => {
    const inst = instruments[id]
    setEditInstrument(id)
    setModalOpen(false)
    setName(inst.name)
    setBrand(inst.brand)
    setModel(inst.model)
    setPartNo(inst.part_no)
    setTextarea(inst.text)
    setPrice(inst.price)
    setSize(inst.size)
    setKlass(inst.instrument_class_id)
    setPictureUrl(inst.picture_url)
    setUploaded(inst.uploaded)
    setWidth(parseFloat(inst.picture_width))
    setHeight(parseFloat(inst.picture_height))
    setHOffset(parseFloat(inst.picture_h_offset))
    setVOffset(parseFloat(inst.picture_v_offset))
  }
}
