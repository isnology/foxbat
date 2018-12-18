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


export default function Selection({app}) {
  const [templateType, setTemplateType] = useState("none")

  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [touch, setTouch] = useGlobal('touch')


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
      onClick: () => app.onSelectTemplate("a22"),
      name2: "Digital A-22 Panel",
      img2: a22DigitalThumb,
      onClick2: () => app.onSelectTemplate("a22Digital")
    },
    a32: {
      name: "Analogue A-32 Panel",
      img: a32Thumb,
      onClick: () => app.onSelectTemplate("a32"),
      name2: "Digital A-32 Panel",
      img2: a32DigitalThumb,
      onClick2: () => app.onSelectTemplate("a32Digital")
    }
  }

  console.log("touch =",touch ? "true" : "false")

  return (
    <Fragment>
      <Header>
        { app.isAdmin() &&
        <Link to="/admin" className="btn btn--navbar btn--react-link">
          Admin Tasks
        </Link>
        }
      </Header>

      <div className="welcome-container">
        <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
        { app.signedIn() && <h3>You are signed in as { app.email() }</h3> }
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
              { app.signedIn() ?
                  <div className="panel-button-group">
                    <Button onClick={ () => setModalWindow('selectPanel') }>Saved panels</Button>
                    <Button onClick={ () => app.onSignOut() }>Sign out</Button>
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
