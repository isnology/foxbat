import React from 'react'

function PlaneSelect({
  name,
  imageURL,
  onClick
}) {
  return (
    <button className="landing-page-rectangle" onClick={onClick}>
      <h3>{ name }</h3>
      <img src={ imageURL } alt="foxbat plane" className='plane-selector'/>
    </button>
  )
}

export default PlaneSelect