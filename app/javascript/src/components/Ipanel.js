import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import SignIn from './SignIn'

class Header extends Component {
  state = {
    selection: 0
  }

  render() {
    const { signedIn, onSignOut } = this.props
    const { selection } = this.state
    const xx = null

    return (

    )
  }
}

export default Header