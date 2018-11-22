import React from 'react'
import Button from '../shared/Button'
import BasePopUp from './BasePopUp'

export default function SignIn({ app, register = false }) {
  return (
      <BasePopUp onExit={ app.onExit } errMsg={ app.message() } >
        <div className="signin">
          <p className="signin signin_text">
            Please { register ? "register to save" : "sign in to retrieve saved"} instument panels.
          </p>
          <form className="signin signin_form"
              onSubmit={ (event) => {
                event.preventDefault()
                const elements = event.target.elements // Allows looking up fields using their 'name' attributes
                // Get entered values from fields
                const email = elements.email.value
                const password = elements.password.value
                // Pass this information along to the parent component
                if (!!register) {
                  const passwordConfirmation = elements.passwordconfirmation.value
                  app.onRegister({ email, password, passwordConfirmation })
                }
                else app.onSignIn({ email, password })
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
            <div className="signin signin_form signin_form-btn">
              <Button>{ !!register ? "Register" : "Sign In"}</Button>
            </div>
          </form>
        </div>
      </BasePopUp>
  )
}
