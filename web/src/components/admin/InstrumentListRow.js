import React from 'react'


export default function InstrumentListRow({ app, value }) {

  const descriptions = {
    width: "70%",
    height: "100%",
  }

  const style = {
    position: "relative",
    height: "4rem",
    textAlign: "left",
    overflowY: "scroll",
  }
  const label = {
    position: "absolute",
    width: "6rem",
    top: "0",
    left: "0",
  }

  const text = {
    position: "absolute",
    width: "calc(100% - 6rem)",
    top: "0",
    left: "6rem",
  }

  return (
      <button className="btn btn--admin-instrument"
              onClick={ () => app.onSelect(value.id) }
      >
        <div style={descriptions}>
          <div style={style}>
            <p style={label}>Name:</p><div style={text}><p>{value.name}</p></div>
          </div>
          <div style={style}>
            <p style={label}>Class:</p><p style={text}>{value.instrument_class.name}</p>
          </div>
          <div style={style}>
            <p style={label}>Brand:</p><p style={text}>{value.brand}</p>
          </div>
        </div>
        <img src={ value.picture_url } alt="instrument" className="btn--img"/>
      </button>
  )
}
