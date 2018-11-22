import React from 'react'
import ExitButton from '../shared/ExitButton'

function RoundExitButton({ onExitClick }) {
  return (
    <div className="btn--round-exit" ><ExitButton onExitClick={ onExitClick } /></div>
  )
}

export default RoundExitButton