import React from 'react'
import { sideBarMessages } from '../../constants/messages'

function SidebarText(

) { 
  return (
    <div className="sidebar-text">
      { sideBarMessages.gettingStarted.map((listItem, index) => (
        <p key={ index }>{ listItem }</p>
      )) }
    </div>
  )
}

export default SidebarText