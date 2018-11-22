import React from 'react'

function ExitButton({ onExitClick }) {
  return (
    <span className="btn--x" onClick={ onExitClick }>&#9747;</span>
  )
}

export default ExitButton