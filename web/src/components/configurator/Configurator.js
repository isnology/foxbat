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
  const setModalWindow = useGlobal('modalWindow')[1]
  const panelSaved = useGlobal('panelSaved')[0]
  const slots = useGlobal('slots')[0]
  const template = useGlobal('template')[0]
  const templateSlots = useGlobal('templateSlots')[0]
  const panelId = useGlobal('panelId')[0]
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
  const panelSaved = useGlobal('panelSaved')[0]

  return (e) => {
    if (panelSaved === false) {
      e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
    }
  }
}

function useSubmitPanel() {
  const user = useGlobal('user')[0]
  const slots = useGlobal('slots')[0]
  const templateSlots = useGlobal('templateSlots')[0]
  const template = useGlobal('template')[0]
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
  const setError = useGlobal('error')[1]
  const setModalWindow = useGlobal('modalWindow')[1]
  const panelName = useGlobal('panelName')[0]
  const panelSaved = useGlobal('panelSaved')[0]
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
  const setSlots = useGlobal('slots')[1]
  const setSelectedSlot = useGlobal('selectedSlot')[1]
  const setSelectedInstrument = useGlobal('selectedInstrument')[1]

  return () => {
    setSlots({})
    setSelectedSlot(null)
    setSelectedInstrument(null)
  }
}

function useClearCurrent() {
  const panelSaved = useGlobal('panelSaved')[0]
  const setSelectedInstrumentClass = useGlobal('selectedInstrumentClass')[1]
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
  const panelId = useGlobal('panelId')[0]
  const setError = useGlobal('error')[1]
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
  const panelSaved = useGlobal('panelSaved')[0]
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
  const setPanelName = useGlobal('panelName')[1]
  const setPanelId = useGlobal('panelId')[1]
  const setSlots = useGlobal('slots')[1]
  const setSelectedSlot = useGlobal('selectedSlot')[1]
  const setTemplateSlots = useGlobal('templateSlots')[1]
  const setSelectedInstrument = useGlobal('selectedInstrument')[1]
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
  const user = useGlobal('user')[0]
  const setError = useGlobal('error')[1]
  const template = useGlobal('template')[0]
  const templateSlots = useGlobal('templateSlots')[0]
  const setPanelSaved = useGlobal('panelSaved')[1]
  const slots = useGlobal('slots')[0]
  const [panelId, setPanelId] = useGlobal('panelId')
  const setPanelName = useGlobal('panelName')[1]
  const setModalWindow = useGlobal('modalWindow')[1]

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
