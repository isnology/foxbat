import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker'
import { setGlobal } from 'reactn'

setGlobal({
  user: null,
  instruments: null, //hash of all instruments from server (key=id)
  classes: null,
  modalWindow: null,
  touch: false,
  //pxwFactor: 0.0,  // for adaptive sizing of instruments
  error: null,

  // selection
  template: null,
  templateSlots: null,  // list of slot names in template (array of strings)
  panelSaved: true,

  //panel
  panelName: null, //title user gave their panel
  panelId: null, // db id of users retrieved/saved panel
  selectedSlot: null,
  slots: {},

  // sidebar
  selectedInstrumentClass: null,
  selectedInstrument: null,

  // admin
  size: "L",
  vOffset: 0.0,
  hOffset: 0.0,
  width: 9.78,
  height: 9.78,
  modalOpen: false,
  editInstrument: null,
  klass: '',
  name: '',
  brand: '',
  model: '',
  partNo: '',
  textarea: '',
  pictureUrl: '',
  uploaded: false,
  price: 0
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
