import React, { Fragment } from 'react'

function BackButton({ onBack }) {
  return (
      <Fragment>
          <span className="exit-button-X" onClick={ onBack }>&#8701;</span>
      </Fragment>
  )
}

export default BackButton