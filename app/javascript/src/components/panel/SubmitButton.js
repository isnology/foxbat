import React from 'react'
import Button from '../Button'

function SubmitButton({
  onClick,
  email,
  slots,
  template
}) {
  return (
    <Button text="Submit Panel Design"
      onClick={ (event) => {
      onClick({email, slots, template})
    }}
    />
  )
}

export default SubmitButton
