import React from 'react'
import Button from '../Button'
import { sideBarMessages } from '../../constants/messages'

function NavList({
  displayItems,
  modelObjects,
  onInstrumentSelection
}) {

  function renderToNavList() {
    if (!!modelObjects && modelObjects.length > 0) {
      return(
        modelObjects.map((object, index) => (
          <Button
            key={ index }
            text={ object.name }
            image= {!!object.pictureUrl ? object.pictureUrl : ''}
            onClick={ ()=>{ onInstrumentSelection(object) } }
            />
          ))
        )
    }
    else if (!!modelObjects && modelObjects.length < 1) {
      return(sideBarMessages.noItems)
    }
    else if (!modelObjects && displayItems.length > 0) {
      return(
        displayItems.map((item, index) => (
        <Button
          key={ index }
          text={ item }
          // image= {validPicturesIncluded ? pictureItems[index] : ''}
          onClick={ ()=>{ onInstrumentSelection(item) } }
          />
        ))
      )
    }
    else {
      return(sideBarMessages.noItems)
    }
  }

  return (
    <div className="instrument-list">
      { renderToNavList() }
    </div>
  )
}

export default NavList