import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import PlugList from "./Plugs/PlugList";
import PlugCreate from "./Plugs/PlugCreate";
import PlugEdit from "./Plugs/PlugEdit";
import PlugDelete from "./Plugs/PlugDelete";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={PlugList} />
              <Route path="/plugs" exact component={PlugList} />
              <Route path="/plugs/create" exact component={PlugCreate} />
              <Route path="/plugs/:modify" exact component={PlugList} />
              <Route path="/plugs/edit/:id" exact component={PlugEdit} />
              <Route path="/plugs/delete/:id" exact component={PlugDelete} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
