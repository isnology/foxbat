import React, { useState, useGlobal, Fragment } from 'reactn'
import {Link} from 'react-router-dom'
import Button from '../shared/Button'
import PlaneSelect from './PlaneSelect'
import Header from '../shared/Header'
import a22pic from '../../img/a22.jpg'
import a32pic from '../../img/a32.jpg'
import a22Thumb from '../../img/a22.png'
import a22DigitalThumb from '../../img/a22digital.png'
import a32Thumb from '../../img/a32.png'
import a32DigitalThumb from '../../img/a32digital.png'
import { useUser, useSignOut } from '../app/App'


export default function Selection() {
  const [templateType, setTemplateType] = useState("none")
  const setModalWindow = useGlobal('modalWindow')[1]
  const touch = useGlobal('touch')[0]
  const user = useUser()
  const onSignOut = useSignOut()
  const onSelectTemplate = useSelectTemplate()


  const panel = {
    none: {
      name: "A32 Vixxen",
      img: a32pic,
      onClick: () => setTemplateType("a32"),
      name2: "A22 Foxbat/Kelpie",
      img2: a22pic,
      onClick2: () => setTemplateType("a22")
    },
    a22: {
      name: "Analogue A-22 Panel",
      img: a22Thumb,
      onClick: () => onSelectTemplate("a22"),
      name2: "Digital A-22 Panel",
      img2: a22DigitalThumb,
      onClick2: () => onSelectTemplate("a22Digital")
    },
    a32: {
      name: "Analogue A-32 Panel",
      img: a32Thumb,
      onClick: () => onSelectTemplate("a32"),
      name2: "Digital A-32 Panel",
      img2: a32DigitalThumb,
      onClick2: () => onSelectTemplate("a32Digital")
    }
  }

  console.log("touch =",touch ? "true" : "false")

  return (
    <Fragment>
      <Header>
        { user.admin &&
        <Link to="/admin" className="btn btn--navbar btn--react-link">
          Admin Tasks
        </Link>
        }
      </Header>

      <div className="welcome-container">
        <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
        { user.signedIn && <h3>You are signed in as { user.email }</h3> }
        <h2>
          { templateType === "none" ? "Click on a Foxbat model to start configuring a new instrument panel"
            : "Click on a template to continue"
          }
        </h2>
        <div className="selection-images">
          <PlaneSelect
            name={ panel[templateType].name }
            imageURL={ panel[templateType].img }
            onClick={ panel[templateType].onClick }
          />
          <PlaneSelect
            name={ panel[templateType].name2 }
            imageURL={ panel[templateType].img2 }
            onClick={ panel[templateType].onClick2 }
          />
        </div>
        { templateType === "none" ?
            <Fragment>
              { user.signedIn ?
                  <div className="panel-button-group">
                    <Button onClick={ () => setModalWindow('selectPanel') }>Saved panels</Button>
                    <Button onClick={ onSignOut }>Sign out</Button>
                  </div>
                :
                  <div className="panel-button-group">
                    <Button onClick={ () => setModalWindow('signIn') }>Sign In</Button>
                    <Button onClick={ () => setModalWindow('register') }>Register</Button>
                  </div>
              }
            </Fragment>
          :
          <Button onClick={ () => setTemplateType('none') }>Back</Button>
        }
      </div>
    </Fragment>
  )
}

// exported hooks

export function useSelectTemplate() {
  const setTemplate = useGlobal('template')[1]
  const setTemplateSlots = useGlobal('templateSlots')[1]
  const setPanelSaved = useGlobal('panelSaved')[1]

  return (templateVal) => {
    let templateSlotsVal
    if (templateVal === 'a22' || templateVal === 'a32') {
      templateSlotsVal = require('./data').analogSlots
    }
    else {
      templateSlotsVal = require('./data').digitalSlots
    }
    setTemplate(templateVal)
    setTemplateSlots(templateSlotsVal)
    setPanelSaved(true)
  }
}
