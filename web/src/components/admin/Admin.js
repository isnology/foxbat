import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Header from '../shared/Header'
import Button from '../shared/Button'
import InstrumentForm from './InstrumentForm'
import ImageAlign from './ImageAlign'


export default class Admin extends Component {

  render() {
    const app = this.props.app

    if (!app.state.user || !app.state.user.admin) {return <Redirect to="/" />}

    const mainBody = {
      margin: "5.5rem auto 0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "calc(100% - 5.5rem)",
      minHeight: "calc(100vh - 5.5rem)",
      background: app.css.offWhite,
    }

    const heading = {
      margin: ".5rem auto",
      color: app.css.foxbatBlue,
    }

    const subBody = {
      display: "flex",
      flexDirection: "row",
      alignItems: "space-around",
      flexWrap: "wrap",
      width: "100%",
      marginBottom: "1rem",
    }

    return (
      <section className="section-admin">
        <Header >
          <Link to="/" className="btn btn--navbar btn--react-link">Panel Selection</Link>
        </Header>
        <div className="admin_mainbody" style={mainBody}>
          <h1 style={heading}>Admin Tasks</h1>
          <div className="admin_subbody" style={subBody}>
            <InstrumentForm app={app} />
            <ImageAlign app={app} />
          </div>
          <div>
            <Button onClick={app.onAdminSave} >Save</Button>
          </div>
        </div>
      </section>
    )
  }

}
