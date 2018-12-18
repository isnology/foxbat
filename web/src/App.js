import React, { setGlobal, useGlobal, useEffect } from 'reactn'
import { getDecodedToken } from './api/token'
import { loadInstruments } from './api/instruments'
import { loadInstrumentClasses } from './api/instrumentClasses'
import { signIn, signOut, signUp, nextToken } from "./api/auth"
import './style/App.css';
import Main from './Main'

export const css = {
  headerBackground: "white",
  foxbatBlue: "#0A64CB",
  offWhite: "#f5f5f5",
  baseUrl: "https://coder-academy-apps-glenn.s3.amazonaws.com/instruments/",
  publicUrl: "https://s3-ap-southeast-2.amazonaws.com/coder-academy-apps-glenn/instruments/",
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

let renew = {
  timer: null,
  timeout: 0,
  count: 0,
}


export default function App() {
  const [user, setUser] = useGlobal('user')
  const [touch, setTouch] = useGlobal('touch')
  const loadInstruments = useLoadInstruments()

  const once = 1

  useEffect(() => {
    loadInstruments()
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

  return (<Main />)
}


function tokenExpiry() {
  // Set timeout.
  const token = getDecodedToken()
  renew.timeout = !!token ? token.exp * 1000 : new Date() * 1
  console.log('Token valid for:', (renew.timeout - new Date() * 1) / 1000)
}

// hooks

function useLoadInstruments() {
  const [instruments, setInstruments] = useGlobal('instruments')
  const [classes, setClasses] = useGlobal('classes')

  return () => {
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
}

// exported hooks

export function useSignedIn() {
  const [user, setUser] = useGlobal('user')
  return !!user
}

export function useEmail() {
  const [user, setUser] = useGlobal('user')
  return (!!user && user.email)
}

export function useAdmin() {
  const [user, setUser] = useGlobal('user')
  return (!!user && user.admin)
}

export function useMessage() {
  const [error, setError] = useGlobal('error')
  return (!!error && error.message)
}

export function useExit() {
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  return () => setModalWindow(null)
}

export function useSignOut() {
  const [user, setUser] = useGlobal('user')
  const [error, setError] = useGlobal('error')

  return () => {
    signOut()
    setUser(null)
    renew.timeout = new Date() * 1
    setError(null)
    //const key = "paneldata"
    //localStorage.removeItem(key)
  }
}

// sign in

export function useRegister() {
  const [gUser, setUser] = useGlobal('user')
  const [error, setError] = useGlobal('error')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')

  return (email, password, passwordConfirmation) => {
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
  }
}

export function useSignIn() {
  const [gUser, setUser] = useGlobal('user')
  const [error, setError] = useGlobal('error')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')

  return (email, password) => {
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
  }
}
