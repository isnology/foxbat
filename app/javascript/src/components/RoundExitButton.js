import React from 'react'
import ExitButton from './ExitButton'

function RoundExitButton({ onExitClick }) {
  return (
    <div className="round-exit-button" ><ExitButton onExitClick={ onExitClick } /></div>
  )
}

export default RoundExitButton