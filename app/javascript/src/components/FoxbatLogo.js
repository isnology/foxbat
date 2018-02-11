import React from 'react'
import logo from '../img/foxbatlogo.png'

function FoxbatLogo() { 
  return (
    <div className="logo-div">
      <a href="http://foxbat.com.au/" target="_blank" rel="noopener noreferrer">
        <img src={ logo } alt="foxbat logo" className="foxbat-logo"/>
      </a>
    </div>
  )
}

export default FoxbatLogo