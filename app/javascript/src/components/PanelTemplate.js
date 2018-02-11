import React from 'react'

function PanelTemplate({
  name,
  image,
  alt,
  clicked
}) { 
  return (
    <button className="landing-page-rectangle"
      onClick={ clicked }
    >
      <h3>{ name }</h3>
      <div className="plane-selector">
        <img src={ image } alt={ alt } className='plane-selector'/>
      </div>
    </button>
  )
}

export default PanelTemplate