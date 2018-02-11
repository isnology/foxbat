import React from 'react'
import BasePopUp from './BasePopUp'

function MyPanels({ panelList, onExit, onSubmit, errMsg }) {
  return (
    <BasePopUp onExit={ onExit } errMsg={ errMsg } >

      <h2>Welcome back to the <strong>Foxbat</strong> Instrument Panel Configurator</h2>
      <h3>Exit to start a new instrument panel</h3>
      <p>OR</p>
      <h3>Click a saved panel to continue editing</h3>

      <select defaultValue="" onChange={ (event) => { onSubmit(event.target.value) } } size="5" >
        <option key="1" disabled value=""> -- select a saved dashboard -- </option>
        {!!panelList && panelList.map((panel) => (
            <option key={panel.id} value={ JSON.stringify(panel) } >{ panel.name }</option>
        ))}
      </select>

    </BasePopUp>
  )
}

export default MyPanels