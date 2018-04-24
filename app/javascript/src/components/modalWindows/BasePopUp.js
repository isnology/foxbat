import React from 'react'
import RoundExitButton from './RoundExitButton';

function BasePopUp({ children, onExit, errMsg }) {
  return (
    <div className="base-popup">
      <RoundExitButton
        onExitClick = { (event) => {
          onExit()
        } }
      />
      { !!errMsg &&
        <div className="errmsg">
          <p>{ errMsg }</p>
        </div>
      }
      { children }
    </div>
  )
}

export default BasePopUp