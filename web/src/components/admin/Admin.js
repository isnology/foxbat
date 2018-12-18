import React, { useGlobal } from 'reactn'
import {Link, Redirect} from 'react-router-dom'
import Header from '../shared/Header'
import Button from '../shared/Button'
import InstrumentForm from './InstrumentForm'
import ImageAlign from './ImageAlign'
import { createInstrument, updateInstrument } from '../../api/instruments'
import { css, useAdmin } from '../../App'


const subBody = {
  display: "flex",
  flexDirection: "row",
  alignItems: "space-around",
  flexWrap: "wrap",
  width: "100%",
  marginBottom: "1rem",
}


export default function Admin() {
  const isAdmin = useAdmin()
  const onAdminSave = useAdminSave()

  if (!isAdmin) {return <Redirect to="/" />}

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


  return (
    <section className="section-admin">
      <Header >
        <Link to="/" className="btn btn--navbar btn--react-link">Panel Selection</Link>
      </Header>
      <div className="admin_mainbody" style={mainBody}>
        <h1 style={heading}>Admin Tasks</h1>
        <div className="admin_subbody" style={subBody}>
          <InstrumentForm />
          <ImageAlign />
        </div>
        <div>
          <Button onClick={onAdminSave} >Save</Button>
        </div>
      </div>
    </section>
  )
}

// hooks

function useAdminSave() {
  const [size, setSize] = useGlobal('size')
  const [vOffset, setVOffset] = useGlobal('vOffset')
  const [hOffset, setHOffset] = useGlobal('hoffset')
  const [width, setWidth] = useGlobal('width')
  const [height, setHeight] = useGlobal('height')
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
  const onAdminClear = useAdminClear()

  return () => {
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
      .then(() => onAdminClear())
    } else {
      createInstrument(data)
      .then(() => onAdminClear())
    }
  }
}



export const html = {
  plus:
    <svg width="100%" height="100%" viewBox="0 0  100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 40 L40 40 L40 10 L60 10 L60 40 L90 40 L90 60 L60 60 L60 90 L40 90 L40 60 L10 60 z"
            fill="white"
      />
    </svg>,
  minus:
    <svg width="100%" height="100%" viewBox="0 0  100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 40 L90 40 L90 60 L10 60 z"
            fill="white"
      />
    </svg>,
}

export const table = {
  size: {
    L: 'L (3 1/8 inch)',
    M: 'M (2 1/4 inch)',
    S: 'S (2 inch)',
    D: 'D (Digital screen)',
    R: 'R (Radio)',
  },
  slot: {
    L: {wide: 9.78, hi: 9.78},
    M: {wide: 6.99, hi: 6.99},
    S: {wide: 6.29, hi: 6.29},
    D: {wide: 29,   hi: 19.9},
    R: {wide: 5.3,  hi: 10.3},
  },
  imageEdit: {
    L: {wide: '290px', hi: '290px'},
    M: {wide: '260px', hi: '260px'},
    S: {wide: '260px', hi: '260px'},
    D: {wide: 'calc(31vw + 120px)', hi: 'calc(22vw + 120px)'},
    R: {wide: '260px', hi: 'calc(10vw + 120px)'},
  },
  min: {
    L: 4,
    M: 3,
    S: 2.5,
    D: 15,
    R: 2.5,
  },
  max: {
    L: 19,
    M: 13,
    S: 11,
    D: 45,
    R: 8,
  },
}

// exported hooks

export function useFormInput (key) {
  const [value, setValue] = useGlobal(key)
  const [width, setWidth] = useGlobal('width')
  const [height, setHeight] = useGlobal('height')

  function doChange(e) {
    const val = e.target.value.split('"').join('')
    setValue(val)
    if (key === 'size') {
      setWidth(table.slot[val].wide)
      setHeight(table.slot[val].hi)
    }
  }

  return {
    value,
    onChange: doChange
  }
}

export function useAdminClear() {
  const [size, setSize] = useGlobal('size')
  const [vOffset, setVOffset] = useGlobal('vOffset')
  const [hOffset, setHOffset] = useGlobal('hoffset')
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

  return () => {
    setEditInstrument(null)
    setSize('L')
    setKlass('')
    setName('')
    setBrand('')
    setModel('')
    setPartNo('')
    setTextarea('')
    setPictureUrl('')
    setUploaded(false)
    setPrice(0)
    setHOffset(0)
    setVOffset(0)
  }
}
