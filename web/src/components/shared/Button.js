import React from 'react'

function Button({
  children,
  onClick = () => {},
  subClass = "std"
}) {
  return (
    <button className={`btn btn--${subClass}`} onClick={ onClick }>
      { children }
    </button>
  )
}

export default Button