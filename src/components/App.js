import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import PlugList from "./PlugList";
import PlugCreate from "./PlugCreate";
import PlugEdit from "./PlugEdit";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={PlugList} />
              <Route path="/create" exact component={PlugCreate} />
              <Route path="/edit" exact component={PlugEdit} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
