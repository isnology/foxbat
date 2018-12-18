import React, { useGlobal, useState, useEffect } from 'reactn'
import BasePopUp from './BasePopUp'
import { loadPanels } from "../../api/panels";
import { useExit, useMessage } from '../../App'


export default function MyPanels () {
  const [panelList, setPanelList] = useState(null)
  const [error, setError] = useGlobal('error')
  const onExit = useExit()
  const message = useMessage()
  const onSelectPanel = useSelectPanel()


  useEffect(() => {
    if (panelList === null) {
      loadPanels()
      .then((res) => {
        setPanelList(res)
      })
      .catch((err) => {
        setError(err)
      })
    }
  })

  return (
    <BasePopUp onExit={ onExit } errMsg={ message }>

      <h2>Welcome back to the <strong>Foxbat</strong> Instrument Panel Configurator</h2>
      <h3>Exit to start a new instrument panel</h3>
      <p>OR</p>
      <h3>Click a saved panel to continue editing</h3>

      <select defaultValue="" onChange={ (event) => {
        onSelectPanel(event.target.value)
      } } size="5">
        <option key="1" disabled value=""> -- select a saved dashboard --</option>
        { !!panelList && panelList.map((panel) => (
          <option key={ panel.id } value={ JSON.stringify(panel) }>{ panel.name }</option>
        )) }
      </select>

    </BasePopUp>
  )
}

// hooks

function useSelectPanel() {
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [panelName, setPanelName] = useGlobal('panelName')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [slots, setSlots] = useGlobal('slots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const onSelectTemplate = useSelectTemplate()

  return (panel) => {
    const panelObj = JSON.parse(panel)

    onSelectTemplate(panelObj.template)
    setModalWindow(null)
    setPanelName(panelObj.name)
    setPanelId(panelObj.id)
    setSlots(panelObj.slots)
    setPanelSaved(true)
  }
}

export function useSelectTemplate() {
  const [template, setTemplate] = useGlobal('template')
  const [templateSlots, setTemplateSlots] = useGlobal('templateSlots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')

  return (templateVal) => {
    let templateSlotsVal
    if (templateVal === 'a22' || templateVal === 'a32') {
      templateSlotsVal = require('../../data').analogSlots
    }
    else {
      templateSlotsVal = require('../../data').digitalSlots
    }
    setTemplate(templateVal)
    setTemplateSlots(templateSlotsVal)
    setPanelSaved(true)
  }
}
