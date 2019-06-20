import React, { Fragment, useGlobal } from 'reactn'
import numeral from "numeral";
import { turnTextToAnkor } from "./InstrumentPreview";

export default function InstrumentListRow({ value,
                                            index,
                                            heading,
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

  const classes = useGlobal('classes')[0]

  return (
    <Fragment>
      { !!heading &&
        <h2 className="brand-heading">{value.brand}</h2>
      }
      <div className="full-button">
        <button className="btn btn--sidebar-main"
          onClick={ () => doSelectInstrument(value.id) }
          onMouseOver={ () => onMouseOverButton(index) }
          onMouseOut={ onMouseOutButton }
          onTouchStart={ () => onMouseOverButton(index) }
          onTouchEnd={ onMouseOutButton }
        >
          { value.name }
          <img src={ value.picture_url } alt="instrument" className="btn--img"/>
        </button>
        <div className="info"
             style={ infoStyle }
             onMouseOver={ () => onMouseOverInfo(index) }
             onMouseOut={ onMouseOutInfo }
        >
          <div className="sidebar_preview_instrument-details">
            <p className="sidebar_preview_instrument-details--price">{ numeral(value.price/100).format('$0,0.00') } USD</p>
            <div className="sidebar_preview_text">
              <p><strong>Type:</strong> { classes[value.instrument_class_id].name }</p>
              <p><strong>Brand:</strong> { value.brand }</p>
              <p><strong>Model:</strong> { value.model }</p>
              <p><strong>Part no:</strong> { value.part_no }</p>
              <p><strong>Size:</strong> { value.size }</p>
              <p>{ turnTextToAnkor(value.text) }</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

