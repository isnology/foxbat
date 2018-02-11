import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import PlaneSelect from './PlaneSelect'
import FoxbatLogo from './FoxbatLogo'
import a22pic from '../img/a22.jpg'
import a32pic from '../img/a32.jpg'

function WelcomePage({ onSignOut, doModalWindow, signedIn, user }) {
  return (
    <Fragment>
      <FoxbatLogo />

      <div className="welcome-container">
        <div>
          <h1 style={{marginBottom: 0}}>Welcome to the Foxbat Instrument Panel Configurator</h1>
          { signedIn && <p>You are signed in as {user}</p> }
        </div>
        <h2>Click on a Foxbat model to start configuring a new instrument panel</h2>

        <div className="selection-images">
          <Link to="/a32">
            <PlaneSelect
            name="A32 Vixxen"
            imageURL={ a32pic }/>
          </Link>
          <Link to="/a22">
            <PlaneSelect
            name="A22 Foxbat/Kelpie"
            imageURL={ a22pic }/>
          </Link>
        </div>

        { !signedIn &&
        <Button
          text="Retrieve a saved panel"
          onClick = { (event) => {
            doModalWindow({ name: 'signIn' })
          } }
        />
        }
        { signedIn &&
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
        }
      </div>
    </Fragment>
  )
}

export default WelcomePage