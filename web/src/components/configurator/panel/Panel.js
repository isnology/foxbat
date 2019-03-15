import React, { Fragment, useGlobal } from 'reactn'
import A22outline from './a22'
import A32outline from './a32'
import A22back from './a22back'
import A32back from './a32back'
import Slot from './Slot'
import numeral from "numeral";
import _forEach from 'lodash/forEach'
import Save from '../../modalWindows/Save'
// import video1 from 'file-loader!../../img/Up.mp4'
// import video2 from 'file-loader!../../img/Up.webm'
import video1 from '../../../img/Up.mp4'
import video2 from '../../../img/Up.webm'


export default function Panel() {
  const modalWindow = useGlobal('modalWindow')[0]
  const panelName = useGlobal('panelName')[0]
  const templateSlots = useGlobal('templateSlots')[0]
  const template = useGlobal('template')[0]
  const totalCost = useTotalCost()


  return (
    <Fragment>
      <div className="panel">
        <div className="panel_bg-video">
          <video className="panel_bg-video_content" autoPlay muted loop>
            <source src={ video1 } type="video/mp4"/>
            <source src={ video2 } type="video/webm"/>
            Your browser is not supported!
          </video>
        </div>

        <div className="running-cost">
          { !!panelName ?
            <p>Panel: { panelName }</p>
            :
            <p>Save to name your panel</p> }
          <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
        </div>


        <div className={`panel_dash panel_${template}`}>
          { template.substring(0, 3) === "a22" ? <A22back/> : <A32back/> }
          <div className={`panel_svg panel_svg-${template.substring(0, 3)}`}>
            { template.substring(0, 3) === "a22" ? <A22outline/> : <A32outline/> }
            { templateSlots.map((slot, index) => (
              <Slot
                key={ index }
                slot={ slot }
              />
            ))
            }
          </div>
        </div>
      </div>

      { modalWindow === "save" &&
        <Save />
      }
    </Fragment>
  )
}

// hooks

function useTotalCost() {
  const slots = useGlobal('slots')[0]
  const instruments = useGlobal('instruments')[0]

  return () => {
    let totalPrices = 0
    _forEach(slots, (value) => {
      totalPrices += instruments[value].price
    })
    return totalPrices / 100
  }
}
