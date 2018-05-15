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
        <img src={ value.picture_url } alt="instrument" className="btnimg"/>
      </button>
      <div className="info"
           style={ infoStyle }
           onMouseOver={ () => onMouseOverInfo(index) }
           onMouseOut={ () => onMouseOutInfo(index) }
      >
        <div className="instrument-details">
          <p><strong>Type:</strong> { value.instrument_class.name }</p>
          <p><strong>Model:</strong> { value.model }</p>
          <p><strong>Part no:</strong> { value.part_no }</p>
          <p><strong>Size:</strong> { value.size }</p>
          <div className="instrument-preview">
            <p>{ numeral(value.price/100).format('$0,0.00') } USD</p>
          </div>
          <p>{ turnTextToAnkor(value.text) }</p>
        </div>
      </div>
    </div>
  )
}

