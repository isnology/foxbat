import React from 'reactn'
import { sideBarMessages } from '../../constants/messages'

export default function SidebarText() {
  return (
    <div className="sidebar-text">
      { sideBarMessages.gettingStarted.map((listItem, index) => (
        <p key={ index }>{ listItem }</p>
      )) }
    </div>
  )
}
