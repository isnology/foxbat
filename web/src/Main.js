import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Selection from './components/selection/Selection'
import Panel from './components/panel/Panel'
import SignIn from './components/modalWindows/SignIn'
import MyPanels from './components/modalWindows/MyPanels'
import Admin from './components/admin/Admin'


export default class Main extends Component {

  render() {
    const app = this.props.app

    const {
      modalWindow,
      template,
    } = app.state

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact render={ () => (
              !!template ?
                <Panel app={ app }/>
                :
                <Selection app={ app }/>
            )}/>

            <Route path='/admin' exact render={ () => (
              <Admin app={ app }/>
            )}/>
          </Switch>

          { modalWindow === "register" &&
          <SignIn app={ app } register />
          }
          { modalWindow === "signIn" &&
          <SignIn app={ app }/>
          }
          { modalWindow === "selectPanel" &&
          <MyPanels app={ app }/>
          }
        </div>
      </Router>
    )
  }
}