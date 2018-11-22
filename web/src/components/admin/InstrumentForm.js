import React from 'react'
import Button from '../shared/Button'
import Modal from 'react-modal'
import InstrumentListRow from './InstrumentListRow'
import _map from 'lodash/map'


export default function InstrumentForm({ app }) {

  Modal.setAppElement('#root')

  const form = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flex: "1"
  }

  const label = {
    width: "30rem",
    padding: ".4rem 0 .1rem 0"
  }

  const input = {
    width: "30rem"
  }

  const last = {
    marginBottom: "2rem"
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

  const onChange = (event) => {
    app.onChange(event)
    if (event.target.name === 'size') {
      const value = event.target.value
      app.setState({
        width: app.table.slot[value].wide,
        height: app.table.slot[value].hi
      })
    }
  }

  return (
    <div className="admin_instrument-form" style={form} >
      <Button onClick={app.onOpenModal}>Edit Saved Instrument</Button>
      <label style={label}>
        {'Name: '}
        <input style={input}
          type='text'
          name='name'
          onChange={onChange}
          value={app.state.name}
        />
      </label>
      <label style={label}>
        {'Brand: '}
        <input style={input}
          type='text'
          name='brand'
          onChange={onChange}
          value={app.state.brand}
        />
      </label>
      <label style={label}>
        {'Model: '}
        <input style={input}
          type='text'
          name='model'
          onChange={onChange}
          value={app.state.model}
        />
      </label>
      <label style={label}>
        {'Part No.: '}
        <input style={input}
          type='text'
          name='partNo'
          onChange={onChange}
          value={app.state.partNo}
        />
      </label>
      <label style={label}>
        {'Text: '}
        <textarea style={input}
          name='textarea'
          onChange={onChange}
          value={app.state.textarea}
        />
      </label>
      <label style={label}>
        {'Price: (in cents)'}
        <input style={input}
          type='number'
          name='price'
          onChange={onChange}
          value={app.state.price}
        />
      </label>
      <label style={label}>
        {'Size: '}
        <select style={input} name="size" onChange={onChange} value={app.state.size}>
          <option value="L">{app.table.size['L']}</option>
          <option value="M">{app.table.size['M']}</option>
          <option value="S">{app.table.size['S']}</option>
          <option value="D">{app.table.size['D']}</option>
          <option value="R">{app.table.size['R']}</option>
        </select>
      </label>
      <label style={Object.assign(label, last)} >
        {'Instrument Class: '}
        <select style={input} name="class" onChange={onChange} value={app.state.class}>
          <option key="x" value=""></option>
          { !!app.state.classes && app.state.classes.map((value, index) => (
            <option key={index} value={value.id}>{value.name}</option>
          ))}
        </select>
      </label>

      <Modal
        isOpen={app.state.modalOpen}
        onRequestClose={app.onCloseModal}
        style={modal}
        contentLabel="Instrument List"
      >
        <div style={outerModal}>
          <h2>Instrument List</h2>
          <Button onClick={app.onCloseModal}>Close</Button>
          <div style={innerModal}>
            { _map(app.state.instruments, (value, key) => (
              <InstrumentListRow key={ key } app={ app } value={ value }/>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
