import React from 'react'
import A22outline from './panelOutlines/a22'
import A32outline from './panelOutlines/a32'
import A22Slots from './panelOutlines/a22slots'

const A22_SVG_HEIGHT_RATIO = 2.1318
const A32_SVG_HEIGHT_RATIO = 2.1228

function optimalPanelDimensions(winWidth, winHeight, heightRatio){
  //sidebar width set at 25%, so we need to ensure the panel doesn't get hidden by that.
  //the height ratio that is passed in is the ratio in the formula:
  // width = height * heightRatio.

  // using the ratio, figures out if the windows width or the height is the constraining factor, and then sizes appropriately taking into account that you only have 75% of the width available.
  let width
  let height
  if (winWidth/winHeight < heightRatio){//then the width is the constraining factor.
    width = 0.75 * winWidth
    height = width / heightRatio
  }else{//the height is the constraining factor
    width = winHeight * heightRatio
    height = winHeight
    if (width > 0.75 * winWidth){
      width = 0.75 * winWidth
      height = width / heightRatio
    }
  }
  return {width, height}
}

function Panel({
  templateName, //determine which panel to render A22 or A32 (Digital or Analog)
  slotClicked, //tell the parent which slot was clicked
  windowHeight,
  windowWidth,
  selectedSlot,
  slots,
  onSelectSlot,
  instruments,
  pxWidth
}) {
  let optimalDimensions
  if (templateName === 'a22' || templateName === 'a22Digital'){
    optimalDimensions = optimalPanelDimensions(windowWidth, windowHeight, A22_SVG_HEIGHT_RATIO)
  } else {
    optimalDimensions = optimalPanelDimensions(windowWidth, windowHeight, A32_SVG_HEIGHT_RATIO)
  }
  // const width = (panelName === 'a22' || panelName === 'a22Digital') ? height*A22_SVG_HEIGHT_RATIO : height*A32_SVG_HEIGHT_RATIO
  // const imagePath = (panelName === 'a22') ? 'images/a22.svg' : 'images/a32.svg'
  const height = optimalDimensions.height
  const width = optimalDimensions.width
  const svgContainerStyle = {
    height: height,
    width: width
  }
  return (
    <div
      id = "svgbox"
      style = {svgContainerStyle}
    >

      <A22Slots
        height={height}
        templateName={templateName}
        selectedSlot={selectedSlot}
        slots={ slots }
        instruments={ instruments }
        onSelectSlot={onSelectSlot}
        pxWidth={pxWidth}
      />

      {(templateName === 'a22' || templateName === 'a22Digital') ?
      <A22outline
      height = {height}
      width= {width}
      />
      :
      <A32outline
      height = {height}
      width= {width}
      />
      }

    </div>
  )
}

export default Panel