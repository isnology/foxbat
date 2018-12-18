import React, { useGlobal } from 'reactn'
import {Link, Redirect} from 'react-router-dom'
import Header from '../shared/Header'
import Button from '../shared/Button'
import InstrumentForm from './InstrumentForm'
import ImageAlign from './ImageAlign'
import { createInstrument, updateInstrument } from '../../api/instruments'
import { css } from '../../App'


export default function Admin({app}) {
  const [user, setUser] = useGlobal('user')

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

  if (!user || !user.admin) {return <Redirect to="/" />}

  const onAdminSave = () => {
    const data = {
      name: name,
      brand: brand,
      model: model,
      part_no: partNo,
      text: textarea,
      picture_url: pictureUrl,
      uploaded: uploaded,
      price: price,
      size: size,
      picture_h_offset: hOffset,
      picture_v_offset: vOffset,
      picture_width: width,
      picture_height: height,
      instrument_class_id: klass,
    }
    if (!!editInstrument) {
      updateInstrument(editInstrument, data)
      .then(() => app.onAdminClear())
    }
    else {
      createInstrument(data)
      .then(() => app.onAdminClear())
    }
  }

  const onOpenModal = () => {
    setModalOpen(true)
  }

  const onCloseModal = () => {
    setModalOpen(false)
    app.onAdminClear()
  }

  const mainBody = {
    margin: "5.5rem auto 0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "calc(100% - 5.5rem)",
    minHeight: "calc(100vh - 5.5rem)",
    background: css.offWhite,
  }

  const heading = {
    margin: ".5rem auto",
    color: css.foxbatBlue,
  }

  const subBody = {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: "1rem",
  }

  return (
    <section className="section-admin">
      <Header >
        <Link to="/" className="btn btn--navbar btn--react-link">Panel Selection</Link>
      </Header>
      <div className="admin_mainbody" style={mainBody}>
        <h1 style={heading}>Admin Tasks</h1>
        <div className="admin_subbody" style={subBody}>
          <InstrumentForm app={app}/>
          <ImageAlign app={app}/>
        </div>
        <div>
          <Button onClick={onAdminSave} >Save</Button>
        </div>
      </div>
    </section>
  )
}
