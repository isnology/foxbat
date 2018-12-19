import React, { useGlobal, useEffect } from 'reactn'
import Header from '../shared/Header'
import Button from '../shared/Button'
import SubmitButton from '../shared/SubmitButton'
import Sidebar from './sidebar/Sidebar'
import Panel from './panel/Panel'
import { useEmail, useSignedIn, useSignOut } from '../../App'
import { createPanel, deletePanel, updatePanel } from '../../api/panels'
import { useSelectTemplate } from '../selection/Selection'
import { emailPanelDesign } from "../../api/emailSubmission";


export default function Configurator() {
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [slots, setSlots] = useGlobal('slots')
  const [template, setTemplate] = useGlobal('template')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [panelId, setPanelId] = useGlobal('panelId')
  const signedIn = useSignedIn()
  const email = useEmail()
  const onSaveCheck = useSaveCheck()
  const onSignOut = useSignOut()
  const onSave = useOnSave()
  const onSubmitPanel = useSubmitPanel()
  const onClearCurrent = useClearCurrent()
  const onDelete = useDelete()
  const onRefreshApp = useRefreshApp()


  const once = 1

  // When this App first appears on screen
  useEffect(() => {
    window.addEventListener("beforeunload", onSaveCheck)
    return () => window.removeEventListener('beforeunload', onSaveCheck)
  }, [once])


  return (
    <div className="configurator">
      <Header>
        { signedIn ?
          <Button onClick={ onSignOut } subClass="navbar">Sign Out</Button>
          :
          <Button onClick={ () => setModalWindow("signIn") } subClass="navbar">Sign In</Button>
        }
        { !signedIn &&
        <Button onClick={ () => setModalWindow("register") } subClass="navbar">Register</Button>
        }
        { signedIn &&
        <Button onClick={ onSave } subClass={ !!panelSaved ? "saved btn--navbar" : "navbar" }>
          Save
        </Button>
        }
        { signedIn &&
        <SubmitButton onClick={ onSubmitPanel } subClass="navbar"
                      email={ email }
                      slots={ slots }
                      template={ template }
                      templateSlots={ templateSlots }
        />
        }
        { signedIn && !!panelId &&
        <Button onClick={ onDelete } subClass="navbar">Delete panel</Button>
        }
        <Button onClick={ onClearCurrent } subClass="navbar">Clear panel</Button>
        <Button onClick={ () => onRefreshApp(true) } subClass="navbar">Back to start</Button>
      </Header>
      <Sidebar />
      <Panel />
    </div>
  )
}

// hooks

function useSaveCheck() {
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')

  return (e) => {
    if (panelSaved === false) {
      e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
    }
  }
}

function useSubmitPanel() {
  const [user, setUser] = useGlobal('user')
  const [slots, setSlots] = useGlobal('slots')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [template, setTemplate] = useGlobal('template')
  const email = useEmail()

  return () => {
    if (window.confirm("Click OK to confirm and send your panel design to Foxbat Australia")) {
      const data = {
        user_id: user.sub,
        email: email,
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
}

function useOnSave() {
  const [error, setError] = useGlobal('error')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [panelName, setPanelName] = useGlobal('panelName')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const signedIn = useSignedIn()
  const doSave = useDoSave()

  return () => {
    setError(null)
    if (!signedIn) {
      setError({ message: "You must sign in before you can save your panel" })
      return
    }
    if (!panelSaved) {
      if (!!panelName) doSave({ name: panelName })
      else setModalWindow('save')
    }
  }
}

function useClear() {
  const [slots, setSlots] = useGlobal('slots')
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')
  const [selectedInstrument, setSelectedInstrument] = useGlobal('selectedInstrument')

  return () => {
    setSlots({})
    setSelectedSlot(null)
    setSelectedInstrument(null)
  }
}

function useClearCurrent() {
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useGlobal('selectedInstrumentClass')
  const onClear = useClear()

  return () => {
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
}

function useDelete() {
  const [panelId, setPanelId] = useGlobal('panelId')
  const [error, setError] = useGlobal('error')
  const onRefreshApp = useRefreshApp()

  return () => {
    deletePanel(panelId)
    .catch((err) => {
      setError(err)
    })
    onRefreshApp(false)
  }
}

function useRefreshApp() {
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const onRefresh = useRefresh()

  return (confirm) => {
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
}

function useRefresh() {
  const [panelName, setPanelName] = useGlobal('panelName')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [slots, setSlots] = useGlobal('slots')
  const [selectedSlot, setSelectedSlot] = useGlobal('selectedSlot')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [selectedInstrument, setSelectedInstrument] = useGlobal('selectedInstrument')
  const onSelectTemplate = useSelectTemplate()

  return () => {
    setPanelName(null)
    setPanelId(null)
    setTemplateSlots(null)
    setSlots({})
    setSelectedSlot(null)
    setSelectedInstrument(null)
    onSelectTemplate(null)
  }
}

// exported hooks

export function useDoSave() {
  const [user, setUser] = useGlobal('user')
  const [error, setError] = useGlobal('error')
  const [template, setTemplate] = useGlobal('template')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [slots, setSlots] = useGlobal('slots')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [panelName, setPanelName] = useGlobal('panelName')
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')

  return ({ name }) => {
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
  }
}
