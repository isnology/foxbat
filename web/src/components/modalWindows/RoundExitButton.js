import React from 'reactn'
import ExitButton from '../shared/ExitButton'

export default function RoundExitButton({ onExitClick }) {
  return (
    <div className="btn--round-exit" ><ExitButton onExitClick={ onExitClick } /></div>
  )
}
