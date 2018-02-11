import React, {Fragment} from 'react'

function Button({
  text,
  onClick,
  image,
  style
}) {
  const imagePresent = !!image
  return (
    <button
        className="main-button"
        onClick={ onClick }
        style={ style }
    >
      <span className="button-text">{ text }</span>
      { imagePresent ? (
        <img src={ image } alt="instrument" className="btnimg"/>
      ):(
        <Fragment/>
      )}
    </button>
  )
}

export default Button