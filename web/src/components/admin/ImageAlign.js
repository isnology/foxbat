import React, { useGlobal } from 'reactn'
import Button from '../shared/Button'
import Slider from 'react-rangeslider'
import { table, html, useFormInput } from '../../App'


export default function ImageAlign({app}) {

  const [size, setSize] = useGlobal('size')
  const [vOffset, setVOffset] = useGlobal('vOffset')
  const [hOffset, setHOffset] = useGlobal('hoffset')
  const [width, setWidth] = useGlobal('width')
  const [height, setHeight] = useGlobal('height')
  const pictureUrl = useFormInput('pictureUrl')


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

  const container = {
    position: "relative",
    display: "block",
    width: table.imageEdit[size].wide,
    height: table.imageEdit[size].hi,
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
    width: `${width}vw`,
    height: `${height}vw`,
    marginLeft: `${hOffset}vw`,
    marginTop: `${vOffset}vw`
  }


  const onUp = () => {
    const val = Math.round((vOffset - .01) * 1000) / 1000
    setVOffset(val)
  }

  const onDown = () => {
    const val = Math.round((vOffset + .01) * 1000) / 1000
    setVOffset(val)
  }

  const onLeft = () => {
    const val = Math.round((hOffset - .01) * 1000) / 1000
    setHOffset(val)
  }

  const onRight = () => {
    const val = Math.round((hOffset + .01) * 1000) / 1000
    setHOffset(val)
  }

  const factor = () => {
    const width = table.slot[size].wide
    const height = table.slot[size].hi
    return height / width
  }

  const onBigger = () => {
    setWidth(Math.round((width + .01) * 1000) / 1000)
    setHeight(Math.round((height + .01 * factor()) * 1000) / 1000)
  }

  const onSmaller = () => {
    setWidth(Math.round((width - .01) * 1000) / 1000)
    setHeight(Math.round((height - .01 * factor()) * 1000) / 1000)
  }

  const onChangeH = (value) => {
    setHOffset(value)
  }

  const onChangeV = (value) => {
    setVOffset(-value)
  }

  const onChangeS = (value) => {
    setWidth(Math.round(value * 1000) / 1000)
    setHeight(Math.round((height + (value - width) * factor()) * 1000) / 1000)
  }

  return (
    <div style={style}>
      <label style={label}>
        {'Picture URL: '}
        <input style={input}
          type='text'
          name='pictureUrl'
          {...pictureUrl}
        />
      </label>
      <div style={container}>

        <div style={verticalSlider}>
          <Slider
            min={-5}
            max={5}
            step={.01}
            tooltip={false}
            value={-vOffset}
            orientation="vertical"
            onChange={onChangeV}
          />
        </div>
        <div style={horizontalSlider}>
          <Slider
            min={-5}
            max={5}
            step={.01}
            tooltip={false}
            value={hOffset}
            onChange={onChangeH}
          />
        </div>
        <div style={buttonT} >
          <div onClick={onUp} className="btn btn-slider" >{html.plus}</div>
        </div>
        <div style={buttonB} >
          <div onClick={onDown} className="btn btn-slider" >{html.minus}</div>
        </div>
        <div style={buttonL} >
          <div onClick={onLeft} className="btn btn-slider" >{html.minus}</div>
        </div>
        <div style={buttonR} >
          <div onClick={onRight} className="btn btn-slider" >{html.plus}</div>
        </div>
        <div style={scaleSlider}>
          <Slider
            min={table.min[size]}
            max={table.max[size]}
            step={.01}
            tooltip={false}
            value={width}
            onChange={onChangeS}
          />
        </div>
        <div className={`size-${size}`} style={slot}>
          <div className="panel_image" style={picStyle}>
            <img className="panel_img" src={pictureUrl.value} alt="instrument"/>
          </div>
        </div>
      </div>

      <div style={container2}>
        <Button onClick={onSmaller}>Smaller</Button>
        <Button onClick={onBigger}>Bigger</Button>
      </div>
    </div>
  )
}

