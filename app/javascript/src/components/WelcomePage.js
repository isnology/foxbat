import React, { Component, Fragment } from 'react'
import Button from './Button'
import PlaneSelect from './PlaneSelect'
import FoxbatLogo from './FoxbatLogo'
import a22pic from '../img/a22.jpg'
import a32pic from '../img/a32.jpg'
import a22Thumb from '../img/a22.png'
import a22DigitalThumb from '../img/a22digital.png'
import a32Thumb from '../img/a32.png'
import a32DigitalThumb from '../img/a32digital.png'
import ModalWindow, { doModalWindow, onExitModal } from './ModalWindow'
import { loadPanels } from '../api/panels'
import { signIn, signUp } from "../api/auth";


class WelcomePage extends Component {
  state = {
    templateType: "none",
    panelList: null,  // list of all saved panels by this user
    modalWindow: null, //display sign in/up to save panel window
    error: null
  }

  onSelect = (id) => {
    this.setState({ templateType: id })
  }

  onBack = () => {
    this.setState({ templateType: "none" })
  }
  
  onSignIn = ({ email, password }) => {
    this.setState({ error: null })
    const data = {
      user: {
        email: email,
        password: password
      }
    }
    signIn({data})
    .then((decodedToken) => {
      this.props.onDecodedToken(decodedToken)
      doModalWindow("selectPanel")
    })
    .catch((error) => {
      this.setState({ error })
    })
  }
  
  onRegister = ({ email, password, passwordConfirmation }) => {
    const data = {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    }
    signUp(data)
    .then((decodedToken) => {
      this.props.onDecodedToken(decodedToken)
      doModalWindow("selectPanel")
    })
    .catch((error) => {
      if (/ 422/.test(error.message)) {
        this.setState({ error: {message: "This user is exists already, please try another." }})
      }
      else {
        this.setState({ error })
      }
    })
  }
  
  loadPanelList = () => {
    loadPanels({user: this.props.decodedToken.sub})
    .then((panelList) => {
      this.setState({ panelList: panelList})
    })
    .catch((error) => {
      this.setState({ error })
    })
  }
  
  render() {
    const {
      templateType,
      panelList,
      modalWindow,
      error
    } = this.state

    const {
      decodedToken,
      onSignOut,
      signedIn,
      email,
      onSelectTemplate
    } = this.props
  
    const modal = !!modalWindow

    const panel = {
      none: {
        name: "A32 Vixxen",
        img: a32pic,
        templateName: () => this.onSelect("a32"),
        name2: "A22 Foxbat/Kelpie",
        img2: a22pic,
        templateName2: () => this.onSelect("a22")
      },
      a22: {
        name: "Analogue A-22 Panel",
        img: a22Thumb,
        templateName: () => onSelectTemplate("a22"),
        name2: "Digital A-22 Panel",
        img2: a22DigitalThumb,
        templateName2: () => onSelectTemplate("a22Digital")
      },
      a32: {
        name: "Analogue A-32 Panel",
        img: a32Thumb,
        templateName: () => onSelectTemplate("a32"),
        name2: "Digital A-32 Panel",
        img2: a32DigitalThumb,
        templateName2: () => onSelectTemplate("a32Digital")
      }
    }

    return (
        <Fragment>
          <FoxbatLogo/>

          <div className="welcome-container">
            <div>
              <h1 style={ { marginBottom: 0 } }>Welcome to the Foxbat Instrument Panel Configurator</h1>
              { signedIn && <p>You are signed in as { email }</p> }
            </div>

            <h2>
              { templateType === "none" ?
                  "Click on a Foxbat model to start configuring a new instrument panel"
                :
                  "Click on a template to continue"
              }
            </h2>
            <div className="selection-images">
              <PlaneSelect
                  name={ panel[templateType].name }
                  imageURL={ panel[templateType].img }
                  onClick={ panel[templateType].templateName }
              />
              <PlaneSelect
                  name={ panel[templateType].name2 }
                  imageURL={ panel[templateType].img2 }
                  onClick={ panel[templateType].templateName2 }
              />
            </div>
            { templateType === "none" ?
                <Fragment>
                  { signedIn ?
                      <div className="panel-button-group">
                        <Button
                            text="Saved panels"
                            onClick={ (event) => {
                              doModalWindow({ name: 'selectPanel' })
                            } }
                        />
                        <Button
                          text="Sign out"
                          onClick={ onSignOut }
                        />
                      </div>
                    :
                      <Button
                        text="Retrieve a saved panel"
                        onClick={ (event) => {
                          doModalWindow({ name: 'signIn' })
                        } }
                      />
                  }
                </Fragment>
              :
                <Button
                  text="Back"
                  onClick={ () => this.onBack() }
                />
            }
          </div>
          { modal &&
            <ModalWindow
               window={ modalWindow }
               loadPanelList={ this.loadPanelList }
               panelList={ panelList }
               onSelectPanel={ this.onSelectPanel }
               onExit={ onExitModal }
               onRegister={ this.onRegister }
               onSignIn={ this.onSignIn }
               onSave={ this.onSave }
               errMsg={ !!error ? error.message : null }
               signedIn={ signedIn }
            />
          }
        </Fragment>
    )
  }
}

export default WelcomePage