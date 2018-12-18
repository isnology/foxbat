import React, { useGlobal } from 'reactn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Selection from './components/selection/Selection'
import Panel from './components/panel/Panel'
import SignIn from './components/modalWindows/SignIn'
import MyPanels from './components/modalWindows/MyPanels'
import Admin from './components/admin/Admin'


export default function Main() {
  const [modalWindow, setModalWindow] = useGlobal('modalWindow')
  const [template, setTemplate] = useGlobal('template')

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={ () => (
            !!template ?
              <Panel />
              :
              <Selection />
          )}/>

          <Route path='/admin' exact render={ () => (
            <Admin />
          )}/>
        </Switch>

        { modalWindow === "register" &&
        <SignIn register />
        }
        { modalWindow === "signIn" &&
        <SignIn />
        }
        { modalWindow === "selectPanel" &&
        <MyPanels />
        }
      </div>
    </Router>
  )

}
