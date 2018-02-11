import React, { Fragment } from 'react'
import Button from './Button'
import BasePopUp from './BasePopUp'

function SaveRegister({ onExit, onSubmit, errMsg, signedIn }) {
  return (
    <BasePopUp onExit={ onExit } errMsg={ errMsg }>
      <p className="form-text">
        Please give your panel a name and enter your email address and a password to save
        (so it can be recalled later using these).
      </p>

      <form
          onSubmit={ (event) => {
            // Prevent old-school form submission
            event.preventDefault()

            const elements = event.target.elements // Allows looking up fields using their 'name' attributes
            // Get entered values from fields
            let email
            let password
            if (!signedIn) {
              email = elements.email.value
              password = elements.password.value
            }
            else {
              email = 'f'
              password = 'f'
            }
            const name = elements.name.value
            // Pass this information along to the parent component
            onSubmit({ name, email, password })
          } }
      >
        <label>
          { 'Panel name: ' }
          <input
              type='text'
              name='name'
              defaultValue={ "" }
          />
        </label>
        { !signedIn &&
        <Fragment>
          <label>
            { 'Email: ' }
            <input
                type='email'
                name='email'
                defaultValue={ "" }
            />
          </label>

          <label>
            { 'Password: ' }
            <input
                type='password'
                name='password'
            />
          </label>
          </Fragment>
        }
        <br/>
        <Button text="Save"
                onClick={ () => {} }
        />
      </form>
    </BasePopUp>
  )
}

export default SaveRegister
