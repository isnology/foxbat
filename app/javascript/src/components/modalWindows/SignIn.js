import React from 'react'
import Button from '../Button'
import BasePopUp from './BasePopUp'
import {MainConsumer} from './Context'

function SignIn({ register = false }) {
  return (
    <MainConsumer>
      {store =>
      <BasePopUp onExit={ store.onExit } errMsg={ store.message } >
        <p className="form-text">
          Please { register ? "register to save" : "sign in to retrieve saved"} instument panels.
        </p>
        <form
            onSubmit={ (event) => {
              // Prevent old-school form submission
              event.preventDefault()
              const elements = event.target.elements // Allows looking up fields using their 'name' attributes
              // Get entered values from fields
              const email = elements.email.value
              const password = elements.password.value
              // Pass this information along to the parent component
              if (!!register) {
                const passwordConfirmation = elements.passwordconfirmation.value
                store.onRegister({ email, password, passwordConfirmation })
              }
              else store.onSignIn({ email, password })
            } }
        >
          <label>
            {'Email: '}
            <input
                type='email'
                name='email'
                defaultValue={ "" }
            />
          </label>

          <label>
            {'Password: '}
            <input
                type='password'
                name='password'
            />
          </label>
          
          { !!register &&
            <label>
              {'Password confirmation: '}
              <input
                type='password'
                name='passwordconfirmation'
              />
            </label>
          }

          <br />
          <Button text={ !!register ? "Register" : "Sign In"}
                  onClick={ () => {} }
          />
        </form>
        <br />
      </BasePopUp>
      }
    </MainConsumer>
  )
}

export default SignIn
