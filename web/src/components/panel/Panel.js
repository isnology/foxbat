import React, { Component } from 'react'
import A22outline from './a22'
import A32outline from './a32'
import A22back from './a22back'
import A32back from './a32back'
import Slot from './Slot'
import Header from '../shared/Header'
import Button from '../shared/Button'
import SubmitButton from '../shared/SubmitButton'
import Sidebar from '../sidebar/Sidebar'
import numeral from "numeral";
import _forEach from 'lodash/forEach'
import Save from '../modalWindows/Save'
// import video1 from 'file-loader!../../img/Up.mp4'
// import video2 from 'file-loader!../../img/Up.webm'
import video1 from '../../img/Up.mp4'
import video2 from '../../img/Up.webm'
import { emailPanelDesign } from "../../api/emailSubmission";


export default class Panel extends Component {
  app = this.props.app

  submitPanel = () => {
    if (window.confirm("Click OK to confirm and send your panel design to Foxbat Australia")) {
      const { slots, templateSlots, template } = this.app.state
      const data = {
        user_id: this.app.state.user.sub,
        email: this.app.email(),
        slots: slots,
        template: template,
        templateSlots: templateSlots,
      }
      emailPanelDesign(data)
      .then((res) => {
        alert("Panel design has been sent")
      })
      .catch((error) => {
        alert("There was an error sending your design, please get in contact with us to resolve this issue")
      })
    }
  }

  totalCost = () => {
    let totalPrices = 0
    _forEach(this.app.state.slots, (value) => {
      totalPrices += this.app.state.instruments[value].price
    })
    return totalPrices / 100
  }

  render () {
    const app = this.app

    const {
      template,
      modalWindow,
      panelName,
      panelId,
      templateSlots,
      slots,
      panelSaved
    } = app.state

    return (
      <div className="configurator">
        <Header>
          { app.signedIn() ?
            <Button onClick={ app.onSignOut } subClass="navbar">Sign Out</Button>
            :
            <Button onClick={ () => app.onModalWindow("signIn") } subClass="navbar">Sign In</Button>
          }
          { !app.signedIn() &&
            <Button onClick={ () => app.onModalWindow("register") } subClass="navbar">Register</Button>
          }
          { app.signedIn() &&
            <Button onClick={ app.onSave } subClass={ !!panelSaved ? "saved btn--navbar" : "navbar" }>
              Save
            </Button>
          }
          { app.signedIn() &&
            <SubmitButton onClick={ this.submitPanel } subClass="navbar"
                          email={ app.email() }
                          slots={ slots }
                          template={ template }
                          templateSlots={ templateSlots }
            />
          }
          { app.signedIn() && !!panelId &&
            <Button onClick={ app.onDelete } subClass="navbar">Delete panel</Button>
          }
          <Button onClick={ app.onClearCurrent } subClass="navbar">Clear panel</Button>
          <Button onClick={ () => app.onRefreshApp(true) } subClass="navbar">Back to start</Button>
        </Header>

        <Sidebar
          app={ app }
        />

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
            <p>Current cost (USD): ${ numeral(this.totalCost()).format('0,0.00') }</p>
          </div>


          <div className={`panel_dash panel_${template}`}>
            { template.substring(0, 3) === "a22" ? <A22back/> : <A32back/> }
            <div className={`panel_svg panel_svg-${template.substring(0, 3)}`}>
              { template.substring(0, 3) === "a22" ? <A22outline/> : <A32outline/> }
              { templateSlots.map((slot, index) => (
                <Slot
                  key={ index }
                  app={ app }
                  slot={ slot }
                />
              ))
              }
            </div>
          </div>
        </div>

        { modalWindow === "save" &&
          <Save
            app={ app }
          />
        }
      </div>
    )
  }

  onSaveCheck = (e) => {
    if (this.app.state.panelSaved === false) {
      e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    window.addEventListener("beforeunload", this.onSaveCheck.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onSaveCheck)
  }

}
