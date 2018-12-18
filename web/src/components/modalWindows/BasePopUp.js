import React from 'reactn'
import RoundExitButton from './RoundExitButton';

export default function BasePopUp({ children, onExit, errMsg }) {
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
