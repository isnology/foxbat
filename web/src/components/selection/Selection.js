import React, { Component, Fragment } from 'react'
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


export default class Selection extends Component {
  state = {
    templateType: "none"
  }

  onSelect = (id) => {
    this.setState({ templateType: id })
  }

  onBack = () => {
    this.setState({ templateType: "none" })
  }


  render() {

    const {
      templateType
    } = this.state

    const app = this.props.app

    const {
      touch
    } = app.state


    const panel = {
      none: {
        name: "A32 Vixxen",
        img: a32pic,
        onClick: () => this.onSelect("a32"),
        name2: "A22 Foxbat/Kelpie",
        img2: a22pic,
        onClick2: () => this.onSelect("a22")
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
          <div>
            <h1 style={ { marginBottom: 0 } }>Welcome to the Foxbat Instrument Panel Configurator</h1>
            { app.signedIn() && <p>You are signed in as { app.email() }</p> }
          </div>

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
                      <Button onClick={ () => app.onModalWindow('selectPanel') }>Saved panels</Button>
                      <Button onClick={ app.onSignOut }>Sign out</Button>
                    </div>
                  :
                    <div className="panel-button-group">
                      <Button onClick={ () => app.onModalWindow('signIn') }>Sign In</Button>
                      <Button onClick={ () => app.onModalWindow('register') }>Register</Button>
                    </div>
                }
              </Fragment>
            :
            <Button onClick={ this.onBack }>Back</Button>
          }
        </div>
      </Fragment>
    )
  }
}
