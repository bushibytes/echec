import React from 'react'
import EchecList from './EchecList.jsx'
import {AppBar, AppCanvas} from "material-ui"
import Router from "react-router"
import {RouteHandler, DefaultRoute, Route} from "react-router"

export default class EchecApp extends React.Component {

  render() {
    return (
      <AppCanvas>
        <AppBar title="Echec.ca" zDepth={0}>
        </AppBar>
        <div className="echec-list">
          <RouteHandler/>
        </div>
        <div className="footer full-width-section mui-dark-theme">
          <p>Echec.ca Copyright no one of consequence</p>
        </div>
      </AppCanvas>
    );
  }

}

var routes =
  <Route name="echecApp" path="/" handler={EchecApp}>
    <DefaultRoute handler={EchecList}/>
  </Route>

Router.run(routes, (Handler) =>
  React.render(<Handler/>, document.body)
);

