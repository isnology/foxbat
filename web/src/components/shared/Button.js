import React from 'reactn'

export default function Button({
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
