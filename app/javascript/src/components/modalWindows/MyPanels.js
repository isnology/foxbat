import React, { Component } from 'react'
import BasePopUp from './BasePopUp'
import { loadPanels } from "../../api/panels";


class MyPanels extends Component {
  state = {
    panelList: null
  }
  
  loadPanelList = () => {
    loadPanels()
    .then((panelList) => {
      this.setState({ panelList: panelList })
    })
    .catch((error) => {
      this.setState({ error })
    })
  }
  
  render() {
    const { panelList } = this.state
    
    const {
      onExit,
      onSubmit,
      errMsg
    } = this.props
    
    return (
      <BasePopUp onExit={ onExit } errMsg={ errMsg }>
      
        <h2>Welcome back to the <strong>Foxbat</strong> Instrument Panel Configurator</h2>
        <h3>Exit to start a new instrument panel</h3>
        <p>OR</p>
        <h3>Click a saved panel to continue editing</h3>
      
        <select defaultValue="" onChange={ (event) => {
          onSubmit(event.target.value)
        } } size="5">
          <option key="1" disabled value=""> -- select a saved dashboard --</option>
          { !!panelList && panelList.map((panel) => (
            <option key={ panel.id } value={ JSON.stringify(panel) }>{ panel.name }</option>
          )) }
        </select>
    
      </BasePopUp>
    )
  }
  
  componentWillMount() {
    this.loadPanelList()
  }
}

export default MyPanels