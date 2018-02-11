import React from 'react'
import ExitButton from './ExitButton';
import RoundExitButton from './RoundExitButton';
import Button from './Button';

function Form({
  text,
  FirstInputLabel = false,
  FirstInputType = false,
  SecondInputLabel = false,
  SecondInputType = false,
  ThirdInputLabel = false,
  ThirdInputType = false,
  buttonText,
  onExitClick
}) {
  return (
    <div className="form">
      <ExitButton onExitClick />
      <RoundExitButton onExitClick />
      <p className="form-text">{ text }</p>

      { FirstInputLabel && FirstInputType ?
        <label>
          <p className="form-text">{ FirstInputLabel }</p>
          <input className="form-text" type={ FirstInputType } name="panel-name"/>
        </label> : null }

      { SecondInputLabel && SecondInputType ?
        <label>
          <p className="form-text">{ SecondInputLabel }</p>
          <input className="form-text" type={ SecondInputType } name="panel-name"/>
        </label> : null }

      { ThirdInputLabel && ThirdInputType ?
        <label>
          <p className="form-text">{ ThirdInputLabel }</p>
          <input className="form-text" type={ ThirdInputType } name="panel-name"/>
        </label> : null }

      <div className="save-form-button">
        <Button text={ buttonText }/>
      </div>
    </div>
  )
}

export default Form