import React from 'reactn'

export default function ExitButton({ onExitClick }) {
  return (
    <span className="btn--x" onClick={ onExitClick }>&#9747;</span>
  )
}
