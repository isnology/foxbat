import React from 'react'
import Button from '../Button'

function SubmitButton({
  onClick,
  email,
  slots,
  templateName
}) {
  return (
    <Button text="Submit Panel Design"
      onClick={ (event) => {
      onClick({email, slots, templateName})
    }}
    />
  )
}

export default SubmitButton
