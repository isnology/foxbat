import React, { useGlobal } from 'reactn'
import Button from '../shared/Button'
import Modal from 'react-modal'
import InstrumentListRow from './InstrumentListRow'
import _map from 'lodash/map'
import { table, useFormInput, useAdminClear } from './Admin'


const form = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  flex: "1"
}

const input = {
  width: "30rem"
}

const modal = {
  content: {
    top        : '53%',
    left       : '50%',
    right      : 'auto',
    bottom     : 'auto',
    marginRight: '-50%',
    transform  : 'translate(-50%, -50%)',
    height     : "92vh",
  }
}

const outerModal = {
  display      : "flex",
  flexDirection: "column",
  alignItems   : "center"
}
const innerModal = {
  marginTop: ".5rem",
  display  : "block",
  overflowY: 'scroll',
  height   : "79vh",
}


export default function InstrumentForm() {

  Modal.setAppElement('#root')

  const [classes, setClasses] = useGlobal('classes')
  const [instruments, setInstruments] = useGlobal('instruments')
  const [modalOpen, setModalOpen] = useGlobal('modalOpen')
  const name = useFormInput('name')
  const brand = useFormInput('brand')
  const model = useFormInput('model')
  const partNo = useFormInput('partNo')
  const textarea = useFormInput('textarea')
  const price = useFormInput('price')
  const size = useFormInput('size')
  const klass = useFormInput('Klass')
  const onCloseModal = useCloseModal()


  const last = {
    marginBottom: "2rem"
  }

  const label = {
    width: "30rem",
    padding: ".4rem 0 .1rem 0"
  }

  return (
    <div className="admin_instrument-form" style={form} >
      <Button onClick={() => setModalOpen(true)}>Edit Saved Instrument</Button>
      <label style={label}>
        {'Name: '}
        <input style={input}
          type='text'
          name='name'
          {...name}
        />
      </label>
      <label style={label}>
        {'Brand: '}
        <input style={input}
          type='text'
          name='brand'
          {...brand}
        />
      </label>
      <label style={label}>
        {'Model: '}
        <input style={input}
          type='text'
          name='model'
          {...model}
        />
      </label>
      <label style={label}>
        {'Part No.: '}
        <input style={input}
          type='text'
          name='partNo'
          {...partNo}
        />
      </label>
      <label style={label}>
        {'Text: '}
        <textarea style={input}
          name='textarea'
          {...textarea}
        />
      </label>
      <label style={label}>
        {'Price: (in cents)'}
        <input style={input}
          type='number'
          name='price'
          {...price}
        />
      </label>
      <label style={label}>
        {'Size: '}
        <select style={input} name="size" {...size}>
          <option value="L">{table.size['L']}</option>
          <option value="M">{table.size['M']}</option>
          <option value="S">{table.size['S']}</option>
          <option value="D">{table.size['D']}</option>
          <option value="R">{table.size['R']}</option>
        </select>
      </label>
      <label style={Object.assign(label, last)} >
        {'Instrument Class: '}
        <select style={input} name="klass" {...klass}>
          <option key="x" value=""></option>
          { !!classes && classes.map((value, index) => (
            <option key={index} value={value.id}>{value.name}</option>
          ))}
        </select>
      </label>

      <Modal
        isOpen={modalOpen}
        onRequestClose={onCloseModal}
        style={modal}
        contentLabel="Instrument List"
      >
        <div style={outerModal}>
          <h2>Instrument List</h2>
          <Button onClick={onCloseModal}>Close</Button>
          <div style={innerModal}>
            { _map(instruments, (value, key) => (
              <InstrumentListRow key={ key } value={ value }/>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

// hooks

function useCloseModal() {
  const [modalOpen, setModalOpen] = useGlobal('modalOpen')
  const onAdminClear = useAdminClear()

  return () => {
    setModalOpen(false)
    onAdminClear()
  }
}
