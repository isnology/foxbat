import React, { useState, useEffect } from 'react'
import BasePopUp from './BasePopUp'
import { loadPanels } from "../../api/panels";


export default function MyPanels ({app}) {
  const [panelList, setPanelList] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (panelList === null) {
      loadPanels()
      .then((res) => {
        setPanelList(res)
      })
      .catch((res) => {
        setError(res)
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
        app.onSelectPanel(event.target.value)
      } } size="5">
        <option key="1" disabled value=""> -- select a saved dashboard --</option>
        { !!panelList && panelList.map((panel) => (
          <option key={ panel.id } value={ JSON.stringify(panel) }>{ panel.name }</option>
        )) }
      </select>

    </BasePopUp>
  )
}
