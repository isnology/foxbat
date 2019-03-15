import React, { useGlobal, useEffect, setGlobal } from 'reactn'
import { getDecodedToken } from './api/token'
import { loadInstruments } from './api/instruments'
import { loadInstrumentClasses } from './api/instrumentClasses'
import { signIn, signOut, signUp, nextToken } from "./api/auth"
import './style/App.css';
import Selection from './components/selection/Selection'
import Configurator from './components/configurator/Configurator'
import SignIn from './components/modalWindows/SignIn'
import MyPanels from './components/modalWindows/MyPanels'
import Admin from './components/admin/Admin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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

export const css = {
  headerBackground: "white",
  foxbatBlue: "#0A64CB",
  offWhite: "#f5f5f5",
  //baseUrl: "https://coder-academy-apps-glenn.s3.amazonaws.com/instruments/",
  //publicUrl: "https://s3-ap-southeast-2.amazonaws.com/coder-academy-apps-glenn/instruments/",
}

let renew = {
  timer: null,
  timeout: 0,
  count: 0,
}


export default function App() {
  const setUser = useGlobal('user')[1]
  const setTouch = useGlobal('touch')[1]
  const modalWindow = useGlobal('modalWindow')[0]
  const template = useGlobal('template')[0]
  const loadInstruments = useLoadInstruments()

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
  }, [])

  useEffect(() => {
    //window.addEventListener('resize', this.updateWindowDimensions.bind(this))
    window.addEventListener('touchstart', function onFirstTouch() {
      setTouch(true)

      // we only need to know once that a human touched the screen, so we can stop listening now
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false)

    // isSignedIn()
    // .then((res) => this.setState({ user: res.user}))
  }, [])

  console.log("global:", useGlobal()[0])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={ () => (
            !!template ?
              <Configurator />
              :
              <Selection />
          )}/>

          <Route path='/admin' exact render={ () => (
            <Admin />
          )}/>
        </Switch>

        { modalWindow === "register" &&
        <SignIn register />
        }
        { modalWindow === "signIn" &&
        <SignIn />
        }
        { modalWindow === "selectPanel" &&
        <MyPanels />
        }
      </div>
    </Router>
  )
}


function tokenExpiry() {
  // Set timeout.
  const token = getDecodedToken()
  renew.timeout = !!token ? token.exp * 1000 : new Date() * 1
  console.log('Token valid for:', (renew.timeout - new Date() * 1) / 1000)
}

// hooks

function useLoadInstruments() {
  const setInstruments = useGlobal('instruments')[1]
  const setClasses = useGlobal('classes')[1]

  return () => {
    loadInstruments()
    .then((instruments) => {
      // let list = {}
      // console.log("instruments:", instruments)
      // instruments.map((instrument) => {
      //   list[instrument.attributes.id] = instrument.attributes
      // })
      // setInstruments(list)
      setInstruments(instruments)
    })
    .catch((error) => {
      console.log("error", error)
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
  return !!useGlobal('user')[0]
}

export function useEmail() {
  const user = useGlobal('user')[0]
  return (!!user && user.email)
}

export function useAdmin() {
  const user = useGlobal('user')[0]
  return (!!user && user.admin)
}

export function useMessage() {
  const error = useGlobal('error')[0]
  return (!!error && error.message)
}

export function useExit() {
  const setModalWindow = useGlobal('modalWindow')[1]
  return () => setModalWindow(null)
}

export function useSignOut() {
  const setUser = useGlobal('user')[1]
  const setError = useGlobal('error')[1]

  return () => {
    signOut()
    setUser(null)
    renew.timeout = new Date() * 1
    setError(null)
    //const key = "paneldata"
    //localStorage.removeItem(key)
  }
}

export function useRegister() {
  const setUser = useGlobal('user')[1]
  const setError = useGlobal('error')[1]
  const setModalWindow = useGlobal('modalWindow')[1]

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
  const setUser = useGlobal('user')[1]
  const setError = useGlobal('error')[1]
  const setModalWindow = useGlobal('modalWindow')[1]

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
