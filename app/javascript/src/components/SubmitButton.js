import React from 'react'
import Button from './Button'

function SubmitButton({
  onClick,
  email,
  slotData,
  templateID
}) {
  return (
    <Button text="Submit Panel Design"
      onClick={ (event) => {
      onClick({email, slotData, templateID})
    }}
    />
  )
}

export default SubmitButton
