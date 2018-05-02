import React from 'react'
import numeral from "numeral";
import { turnTextToAnkor } from "./InstrumentPreview";

export default function InstrumentListRow({ value,
                                            index,
                                            style,
                                            doSelectInstrument,
                                            onMouseOverButton,
                                            onMouseOutButton,
                                            onMouseOverInfo,
                                            onMouseOutInfo
                                          }) {
  const infoStyle = {
    display: style
  }
  
  return (
    <div className="full-button">
      <button
        className="main-button"
        onClick={ () => doSelectInstrument(value.id) }
        onMouseOver={ () => onMouseOverButton(index) }
        onMouseOut={ () => onMouseOutButton(index) }
      >
        <span className="button-text">{ value.name }</span>
        <img src={ value.pictureUrl } alt="instrument" className="btnimg"/>
      </button>
      <div className="info"
           style={ infoStyle }
           onMouseOver={ () => onMouseOverInfo(index) }
           onMouseOut={ () => onMouseOutInfo(index) }
      >
        <div className="instrument-details">
          <p><strong>Type:</strong> { value.instrumentClass.name }</p>
          <p><strong>Model:</strong> { value.model }</p>
          <p><strong>Part no:</strong> { value.partNo }</p>
          <p><strong>Size:</strong> { value.size }</p>
          <p>{ turnTextToAnkor(value.text) }</p>
          <div className="instrument-preview">
            <p>{ numeral(value.price/100).format('$0,0.00') } USD</p>
          </div>
        </div>
      </div>
    </div>
  )
}

