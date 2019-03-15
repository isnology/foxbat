import React, { useGlobal, useState, useEffect } from 'reactn'
import BasePopUp from './BasePopUp'
import _map from 'lodash/map'
import { loadPanels } from "../../api/panels";
import { useExit, useMessage } from '../../App'
import { useSelectTemplate } from '../selection/Selection'


export default function MyPanels () {
  const [panelList, setPanelList] = useState(null)
  const setError = useGlobal('error')[1]
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
        { !!panelList && _map(panelList, (panel) => (
          <option key={ panel.id } value={ JSON.stringify(panel) }>{ panel.name }</option>
        )) }
      </select>

    </BasePopUp>
  )
}

// hooks

function useSelectPanel() {
  const setModalWindow = useGlobal('modalWindow')[1]
  const setPanelName = useGlobal('panelName')[1]
  const setPanelId = useGlobal('panelId')[1]
  const setSlots = useGlobal('slots')[1]
  const setPanelSaved = useGlobal('panelSaved')[1]
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
