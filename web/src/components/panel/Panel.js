import React, { useGlobal, useEffect } from 'reactn'
import A22outline from './a22'
import A32outline from './a32'
import A22back from './a22back'
import A32back from './a32back'
import Slot from './Slot'
import Header from '../shared/Header'
import Button from '../shared/Button'
import SubmitButton from '../shared/SubmitButton'
import Sidebar from '../sidebar/Sidebar'
import numeral from "numeral";
import _forEach from 'lodash/forEach'
import Save from '../modalWindows/Save'
// import video1 from 'file-loader!../../img/Up.mp4'
// import video2 from 'file-loader!../../img/Up.webm'
import video1 from '../../img/Up.mp4'
import video2 from '../../img/Up.webm'
import { emailPanelDesign } from "../../api/emailSubmission";
import { createPanel, deletePanel, updatePanel } from '../../api/panels'


export default function Panel({app}) {
  const [user, setUser] = useGlobal('user')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')

  const [panelName, setPanelName] = useGlobal('panelName')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [slots, setSlots] = useGlobal('slots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')

  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [template, setTemplate] = useGlobal('template')
  const [instruments, setInstruments] = useGlobal('instruments')

  const [selectedInstrument, setSelectedInstrument] = useGlobal('selectedInstrument')
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')
  const [error, setError] = useGlobal('error')

  const once = 1

  // When this App first appears on screen
  useEffect(() => {
    window.addEventListener("beforeunload", onSaveCheck)
    return () => window.removeEventListener('beforeunload', onSaveCheck)
  }, [once])

  const onSaveCheck = (e) => {
    if (panelSaved === false) {
      e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
    }
  }

  const submitPanel = () => {
    if (window.confirm("Click OK to confirm and send your panel design to Foxbat Australia")) {
      const data = {
        user_id: user.sub,
        email: app.email(),
        slots: slots,
        template: template,
        templateSlots: templateSlots
      }
      emailPanelDesign(data)
      .then((res) => {
        alert("Panel design has been sent")
      })
      .catch((err) => {
        alert("There was an error sending your design, please get in contact with us to resolve this issue")
      })
    }
  }

  const totalCost = () => {
    let totalPrices = 0
    _forEach(slots, (value) => {
      totalPrices += instruments[value].price
    })
    return totalPrices / 100
  }

  const onClear = () => {
    setSlots({})
    setSelectedSlot(null)
    setSelectedInstrument(null)
  }

  const onClearCurrent = () => {
    if (panelSaved === false) {
      if (window.confirm("Are you sure you want to clear the current panel? Any unsaved changes will be lost.")) {
        setSelectedInstrumentClass(null)
        onClear()
        //const key = "paneldata"
        //if (!!localStorage.getItem(key)) {
        //  let localSlots = JSON.parse(localStorage.getItem(key))
        //  localSlots.slots.map(slot => {
        //    slot.instrument = null
        //    return slot
        //  })
        //localStorage.setItem(key, JSON.stringify(localSlots))
        //}
      }
    }
    else {
      setSelectedInstrumentClass(null)
      onClear()
    }
  }

  // const onSelectSlot = (slot) => {
  //   setSelectedSlot(slot)
  //   setSelectedInstrument(slots[slot])
  //   setSelectedInstrumentClass(null)
  // }

  const onSave = () => {
    setError(null)
    if (!app.signedIn()) {
      setError({ message: "You must sign in before you can save your panel" })
      return
    }
    if (!panelSaved) {
      if (!!panelName) app.doSave({ name: panelName })
      else setModalWindow('save')
    }
  }

  const onDelete = () => {
    deletePanel(panelId)
    .catch((errorVal) => {
      setError(errorVal)
    })
    onRefreshApp(false)
  }

  const onRefreshApp = (confirm) => {
    if (panelSaved === false) {
      if (confirm && !window.confirm("Are you sure you want to exit and return to the start? Any unsaved changes to" +
        " this panel will be lost.")) {
        return
      }
      else {
        onRefresh()
      }
    }
    else {
      onRefresh()
    }
  }

  const onRefresh = () => {
    setPanelName(null)
    setPanelId(null)
    setTemplateSlots(null)
    setSlots({})
    setSelectedSlot(null)
    setSelectedInstrument(null)
    app.onSelectTemplate(null)
  }


  return (
    <div className="configurator">
      <Header>
        { app.signedIn() ?
          <Button onClick={ app.onSignOut } subClass="navbar">Sign Out</Button>
          :
          <Button onClick={ () => setModalWindow("signIn") } subClass="navbar">Sign In</Button>
        }
        { !app.signedIn() &&
          <Button onClick={ () => setModalWindow("register") } subClass="navbar">Register</Button>
        }
        { app.signedIn() &&
          <Button onClick={ app.onSave } subClass={ !!panelSaved ? "saved btn--navbar" : "navbar" }>
            Save
          </Button>
        }
        { app.signedIn() &&
          <SubmitButton onClick={ submitPanel } subClass="navbar"
                        email={ app.email() }
                        slots={ slots }
                        template={ template }
                        templateSlots={ templateSlots }
          />
        }
        { app.signedIn() && !!panelId &&
          <Button onClick={ onDelete } subClass="navbar">Delete panel</Button>
        }
        <Button onClick={ onClearCurrent } subClass="navbar">Clear panel</Button>
        <Button onClick={ () => onRefreshApp(true) } subClass="navbar">Back to start</Button>
      </Header>

      <Sidebar app={app}/>

      <div className="panel">
        <div className="panel_bg-video">
          <video className="panel_bg-video_content" autoPlay muted loop>
            <source src={ video1 } type="video/mp4"/>
            <source src={ video2 } type="video/webm"/>
            Your browser is not supported!
          </video>
        </div>

        <div className="running-cost">
          { !!panelName ?
            <p>Panel: { panelName }</p>
            :
            <p>Save to name your panel</p> }
          <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
        </div>


        <div className={`panel_dash panel_${template}`}>
          { template.substring(0, 3) === "a22" ? <A22back/> : <A32back/> }
          <div className={`panel_svg panel_svg-${template.substring(0, 3)}`}>
            { template.substring(0, 3) === "a22" ? <A22outline/> : <A32outline/> }
            { templateSlots.map((slot, index) => (
              <Slot
                key={ index }
                slot={ slot }
              />
            ))
            }
          </div>
        </div>
      </div>

      { modalWindow === "save" &&
        <Save app={app}/>
      }
    </div>
  )
}
