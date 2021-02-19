import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import Global from './styles/global';

import Header from './components/header/header';
import GetEmployee from "./components/getAllUsers/list.component";
import AddEmployee from "./components/newUser/add.component";
import EditEmployee from "./components/editUser/edit.component";


class App extends Component {
  render() {
    return (
      <div>
        <Global/>
        <Header/>
        <div >
          <Switch>
            <Route exact path={["/", "/employees"]} component={GetEmployee} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employees/:id" component={EditEmployee} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
