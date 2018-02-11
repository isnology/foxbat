import React, { Fragment } from 'react'

function ExitButton({ onExitClick }) {
  return (
      <Fragment>
          <span className="exit-button-X" onClick={ onExitClick }>&#9747;</span>
      </Fragment>
  )
}

export default ExitButton