import React, { useGlobal, useState, useEffect } from 'reactn'
import BasePopUp from './BasePopUp'
import { loadPanels } from "../../api/panels";


export default function MyPanels ({app}) {
  const [panelList, setPanelList] = useState(null)

  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [panelName, setPanelName] = useGlobal('panelName')
  const [panelId, setPanelId] = useGlobal('panelId')
  const [slots, setSlots] = useGlobal('slots')
  const [panelSaved, setPanelSaved] = useGlobal('panelSaved')
  const [error, setError] = useGlobal('error')


  const onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)

    app.onSelectTemplate(panelObj.template)
    setModalWindow(null)
    setPanelName(panelObj.name)
    setPanelId(panelObj.id)
    setSlots(panelObj.slots)
    setPanelSaved(true)
  }

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
    <BasePopUp onExit={ app.onExit } errMsg={ app.message() }>

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
