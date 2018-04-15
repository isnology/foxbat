import React, { Fragment } from 'react'
import SaveRegister from './SaveRegister'
import SignIn from './SignIn'
import MyPanels from './MyPanels'

export function doModalWindow({ name }) {
  this.setState({ modalWindow: name })
}

export function onExitModal() {
  this.setState({ modalWindow: null })
}


function ModalWindow({ window, onExit, onSignIn, onSaveRegister, loadPanelList, panelList, onSelectPanel, errMsg, signedIn }) {
  const signIn = (window === "signIn")
  const register = (window === "register")
  const save = (window === "save")
  const select = (window === "selectPanel")
  if (select) loadPanelList()
  return (
    <Fragment>
      { signIn &&
        <SignIn
          onExit={ onExit }
          onSubmit={ onSignIn }
          errMsg={ errMsg }
        />
      }
      { save &&
        <Save
          onExit={ onExit }
          onSubmit={ onSave }
          errMsg={ errMsg }
          signedIn={ signedIn }
        />
      }
      { register &&
      <Register
        onExit={ onExit }
        onSubmit={ onRegister }
        errMsg={ errMsg }
        signedIn={ signedIn }
      />
      }
      { select &&
      <MyPanels
          panelList={ panelList }
          onExit={ onExit }
          onSubmit={ onSelectPanel }
          errMsg={ errMsg }
      />
      }
    </Fragment>
  )
}

export default ModalWindow