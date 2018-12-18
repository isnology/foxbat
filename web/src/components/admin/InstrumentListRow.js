import React, { useGlobal } from 'reactn'


export default function InstrumentListRow({ app, value }) {

  const [instruments, setInstruments] = useGlobal('instruments')

  const [size, setSize] = useGlobal('size')
  const [vOffset, setVOffset] = useGlobal('vOffset')
  const [hOffset, setHOffset] = useGlobal('hoffset')
  const [width, setWidth] = useGlobal('width')
  const [height, setHeight] = useGlobal('height')
  const [modalOpen, setModalOpen] = useGlobal('modalOpen')
  const [editInstrument, setEditInstrument] = useGlobal('editInstrument')
  const [klass, setKlass] = useGlobal('Klass')
  const [name, setName] = useGlobal('name')
  const [brand, setBrand] = useGlobal('brand')
  const [model, setModel] = useGlobal('model')
  const [partNo, setPartNo] = useGlobal('partNo')
  const [textarea, setTextarea] = useGlobal('textarea')
  const [pictureUrl, setPictureUrl] = useGlobal('pictureUrl')
  const [uploaded, setUploaded] = useGlobal('upload')
  const [price, setPrice] = useGlobal('price')

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

  const onSelect = (id) => {
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
    setKlass(inst.instrument_class.id)
    setPictureUrl(inst.picture_url)
    setUploaded(inst.uploaded)
    setWidth(parseFloat(inst.picture_width))
    setHeight(parseFloat(inst.picture_height))
    setHOffset(parseFloat(inst.picture_h_offset))
    setVOffset(parseFloat(inst.picture_v_offset))
  }

  return (
      <button className="btn btn--admin-instrument"
              onClick={ () => onSelect(value.id) }
      >
        <div style={descriptions}>
          <div style={style}>
            <p style={label}>Name:</p><div style={text}><p>{value.name}</p></div>
          </div>
          <div style={style}>
            <p style={label}>Class:</p><p style={text}>{value.instrument_class.name}</p>
          </div>
          <div style={style}>
            <p style={label}>Brand:</p><p style={text}>{value.brand}</p>
          </div>
        </div>
        <img src={ value.picture_url } alt="instrument" className="btn--img"/>
      </button>
  )
}
