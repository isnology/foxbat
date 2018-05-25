import React, { Component, Fragment } from 'react'
import Button from '../Button'
import PlaneSelect from './PlaneSelect'
import FoxbatLogo from './FoxbatLogo'
import a22pic from '../../img/a22.jpg'
import a32pic from '../../img/a32.jpg'
import a22Thumb from '../../img/a22.png'
import a22DigitalThumb from '../../img/a22digital.png'
import a32Thumb from '../../img/a32.png'
import a32DigitalThumb from '../../img/a32digital.png'
import {MainConsumer} from './context/MainContext'


class Selection extends Component {
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
    
    const {
      decodedToken,
      modalWindow
    } = this.props.state
    
    const {
      onSelectTemplate,
      onSignOut,
      onModalWindow
    } = this.props.actions
    
    const signedIn = !!decodedToken
    const email = signedIn && decodedToken.email
    
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
    
    
    return (
      <MainConsumer>
        {store =>
          <Fragment>
            <FoxbatLogo/>
    
            <div className="welcome-container">
              <div>
                <h1 style={ { marginBottom: 0 } }>Welcome to the Foxbat Instrument Panel Configurator</h1>
                { signedIn && <p>You are signed in as { email }</p> }
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
                    { signedIn ?
                        <div className="panel-button-group">
                          <Button
                              text="Saved panels"
                              onClick={ () => onModalWindow('selectPanel') }
                          />
                          <Button
                            text="Sign out"
                            onClick={ onSignOut }
                          />
                        </div>
                      :
                        <Fragment>
                          <Button
                            text="Sign In"
                            onClick={ () => onModalWindow('signIn') }
                          />
                          <Button
                            text="Register"
                            onClick={ () => onModalWindow('register') }
                          />
                        </Fragment>
                    }
                  </Fragment>
                :
                  <Button
                    text="Back"
                    onClick={ () => this.onBack() }
                  />
              }
            </div>
          </Fragment>
        }
      </MainConsumer>
    )
  }
}

export default Selection