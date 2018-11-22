import React from 'react'
import Button from './Button'

export default function SubmitButton({
  onClick,
  email,
  slots,
  template,
  subClass = "std"
}) {
  return (
    <Button subClass={subClass} onClick={ (event) => {onClick({email, slots, template})}}>
      Submit Panel Design
    </Button>
  )
}
