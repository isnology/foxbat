import React from 'react'
import Button from '../shared/Button'
import Slider from 'react-rangeslider'


export default function ImageAlign({ app }) {

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1"
  }

  const label = {
    width: "30rem",
    padding: "1rem 0 .1rem 0",
    marginBottom: "1rem"
  }

  const input = {
    width: "30rem"
  }

  const size = app.state.size

  const container = {
    position: "relative",
    display: "block",
    width: app.table.imageEdit[size].wide,
    height: app.table.imageEdit[size].hi,
    //background: "lightblue"
  }

  const buttonT = {
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translate(0, -75px)",
    width: "16px",
    height: "16px",
  }

  const verticalSlider = {
    position: "absolute",
    top: "50%",
    right: "30px",
    transform: "translate(0, -50%)",
  }

  const buttonB = {
    position: "absolute",
    bottom: "50%",
    right: "0",
    transform: "translate(0, 75px)",
    width: "16px",
    height: "16px",
  }

  const buttonL = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-75px, 0)",
    width: "16px",
    height: "16px",
  }

  const horizontalSlider = {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translate(-50%, 0)",
  }

  const buttonR = {
    position: "absolute",
    top: "0",
    right: "50%",
    transform: "translate(75px, 0)",
    width: "16px",
    height: "16px",
  }

  const scaleSlider = {
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translate(-50%, 0)",
  }

  const container2 = {
    display: "flex",
    flexDirection: "row",
    marginTop: "1rem"
  }

  let slot = {
    position: "absolute",
    display: "block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    //marginTop: "1rem",
    //border: app.css.foxbatBlue + " solid 1px",
    border: "red solid 1px",
    overflow: "hidden",
    background: "white",
    color: "white",
    //marginBottom: "1rem"
  }

  const picStyle = {
    width: `${app.state.width}vw`,
    height: `${app.state.height}vw`,
    marginLeft: `${app.state.hOffset}vw`,
    marginTop: `${app.state.vOffset}vw`
  }


  return (
    <div style={style}>
      <label style={label}>
        {'Picture URL: '}
        <input style={input}
          type='text'
          name='pictureUrl'
          onChange={app.onChange}
          value={app.state.pictureUrl}
        />
      </label>
      <div style={container}>

        <div style={verticalSlider}>
          <Slider
            min={-5}
            max={5}
            step={.01}
            tooltip={false}
            value={-app.state.vOffset}
            orientation="vertical"
            onChange={app.onChangeV}
          />
        </div>
        <div style={horizontalSlider}>
          <Slider
            min={-5}
            max={5}
            step={.01}
            tooltip={false}
            value={app.state.hOffset}
            onChange={app.onChangeH}
          />
        </div>
        <div style={buttonT} >
          <div onClick={app.onUp} className="btn btn-slider" >{app.html.plus}</div>
        </div>
        <div style={buttonB} >
          <div onClick={app.onDown} className="btn btn-slider" >{app.html.minus}</div>
        </div>
        <div style={buttonL} >
          <div onClick={app.onLeft} className="btn btn-slider" >{app.html.minus}</div>
        </div>
        <div style={buttonR} >
          <div onClick={app.onRight} className="btn btn-slider" >{app.html.plus}</div>
        </div>
        <div style={scaleSlider}>
          <Slider
            min={app.table.min[size]}
            max={app.table.max[size]}
            step={.01}
            tooltip={false}
            value={app.state.width}
            onChange={app.onChangeS}
          />
        </div>
        <div className={`size-${size}`} style={slot}>
          <div className="panel_image" style={picStyle}>
            <img className="panel_img" src={app.state.pictureUrl} alt="instrument"/>
          </div>
        </div>
      </div>

      <div style={container2}>
        <Button onClick={app.onSmaller}>Smaller</Button>
        <Button onClick={app.onBigger}>Bigger</Button>
      </div>
    </div>
  )
}
