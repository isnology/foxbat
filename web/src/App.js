import React, { setGlobal, useGlobal, useEffect } from 'reactn'
import { getDecodedToken } from './api/token'
import { createInstrument, loadInstruments, updateInstrument } from './api/instruments'
import { loadInstrumentClasses } from './api/instrumentClasses'
import { signIn, signOut, signUp, nextToken } from "./api/auth"
import { createPanel, updatePanel, deletePanel  } from "./api/panels"
import './style/App.css';
import Main from './Main'

export const css = {
  headerBackground: "white",
  foxbatBlue: "#0A64CB",
  offWhite: "#f5f5f5",
  baseUrl: "https://coder-academy-apps-glenn.s3.amazonaws.com/instruments/",
  publicUrl: "https://s3-ap-southeast-2.amazonaws.com/coder-academy-apps-glenn/instruments/",
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

setGlobal({
  user: getDecodedToken(),
  instruments: null, //hash of all instruments from server (key=id)
  classes: null,
  modalWindow: null,
  touch: false,
  //pxwFactor: 0.0,  // for adaptive sizing of instruments
  error: null,

  // selection
  template: null,

  //panel
  panelName: null, //title user gave their panel
  panelId: null, // db id of users retrieved/saved panel
  templateSlots: null,  // list of slot names in template (array of strings)
  selectedSlot: null,
  slots: {},
  panelSaved: true,

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

export default function App() {

  const [user, setUser] = useGlobal('user')
  const [instruments, setInstruments] = useGlobal('instruments')
  const [classes, setClasses] = useGlobal('classes')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [touch, setTouch] = useGlobal('touch')
  const [error, setError] = useGlobal('error')
  const [template, setTemplate] = useGlobal('template')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [slots, setSlots] = useGlobal('slots')
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [panelName, setPanelName] = useGlobal('panelName')

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

  let renew = {
    timer: null,
    timeout: 0,
    count: 0,
  }

  const once = 1

  useEffect(() => {
    doLoadInstruments()

    tokenExpiry()
    let now

    renew.timer = setInterval(() => {
      now = new Date() * 1
      if (renew.count < 10) renew.count++
      if (now > renew.timeout) {
        // Interval complete.
        console.log('Token expired.')
        setUser(null)
        renew.timeout = 99999999999999
      } else if (now + 300000 > renew.timeout && renew.count > 9) {
        renew.count = 0
        nextToken()
        .then((userVal) => {
          setUser(userVal)
          tokenExpiry()
        })
      }
    }, 10000)

    return () => clearInterval(renew.timer)
  }, [once])

  useEffect(() => {
    //window.addEventListener('resize', this.updateWindowDimensions.bind(this))
    window.addEventListener('touchstart', function onFirstTouch() {
      setTouch(true)

      // we only need to know once that a human touched the screen, so we can stop listening now
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false)

    // isSignedIn()
    // .then((res) => this.setState({ user: res.user}))
  }, [once])


  function doLoadInstruments() {
    loadInstruments()
    .then((instruments) => {
      let list = {}
      instruments.map((instrument) => {
        list[instrument.id] = instrument
      })
      setInstruments(list)
    })
    .catch(() => {
      setInstruments(null)
    })

    loadInstrumentClasses()
    .then((classesVal) => {
      setClasses(classesVal)
    })
  }

  function tokenExpiry() {
    // Set timeout.
    const token = getDecodedToken()
    renew.timeout = !!token ? token.exp * 1000 : new Date() * 1
    console.log('Token valid for:', (renew.timeout - new Date() * 1) / 1000)
  }


  const fn = {
    //app

    signedIn: () => {
      return (!!user)
    },

    email: () => {
      return (!!user && user.email)
    },

    isAdmin: () => {
      return (!!user && user.admin)
    },

    message: () => {
      return (!!error && error.message)
    },

    onExit: () => {
      setModalWindow(null)
    },

    onSignOut: () => {
      signOut()
      setUser(null)
      renew.timeout = new Date() * 1
      setError(null)
      //const key = "paneldata"
      //localStorage.removeItem(key)
    },

    // signIn

    onRegister: ({ email, password, passwordConfirmation }) => {
      const user = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
      signUp({ user })
      .then((userVal) => {
        setUser(userVal)
        tokenExpiry()
        setModalWindow("selectPanel")
      })
      .catch((err) => {
        if (/ 422/.test(err.message)) {
          setError({ message: "This user is registered already, please try another." })
        }
        else {
          setError(err)
        }
      })
    },

    onSignIn: ({ email, password }) => {
      setError(null)
      const user = {
        email: email,
        password: password
      }
      signIn({ user })
      .then((userVal) => {
        setUser(userVal)
        tokenExpiry()
        setModalWindow(null)
      })
      .catch((err) => {
        setError(err)
      })
    },

    // selection

    onSelectTemplate: (templateVal) => {
      let templateSlotsVal
      if (templateVal === 'a22' || templateVal === 'a32') {
        templateSlotsVal = require('./data').analogSlots
      }
      else {
        templateSlotsVal = require('./data').digitalSlots
      }
      setTemplate(templateVal)
      setTemplateSlots(templateSlotsVal)
      setPanelSaved(true)
    },

    // panel

    onUpdateSlots: (instrumentVal) => {
      let newSlots = slots
      if (!!newSlots[selectedSlot]) {
        delete newSlots[selectedSlot]
      }
      else {
        newSlots[selectedSlot] = instrumentVal
      }
      setSlots(newSlots)
      setPanelSaved(false)
    },

    doSave: ({ name }) => {
      setError(null)
      const data = {
        template: template,
        name: name,
        slots: slots,
        templateSlots: templateSlots,
        user_id: user.id,
      }
      if (!!panelId) {
        updatePanel(panelId, data)
        .then((panel) => {
          setModalWindow(null)
          setPanelSaved(true)
        })
        .catch((err) => {
          setError(err)
        })
      } else {
        createPanel(data)
        .then((panel) => {
          setPanelId(panel.id)
          setPanelName(panel.name)
          setPanelSaved(true)
          setModalWindow(null)
        })
        .catch((err) => {
          setError(err)
        })
      }
    },

    // sidebar

    // admin

    onAdminClear: () => {
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
    },

  }

  return (<Main app={fn} />)
}

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
