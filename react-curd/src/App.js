import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from 'react-router-dom';
import addblog from "./components/addblog.component";
import read from "./components/read.component";
import readlist from "./components/readlist.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/read" className="navbar-brand">
            Yash blogs
        </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/read"} className="nav-link">
                Blogs
            </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/read"]} component={readlist} />
            <Route exact path="/add" component={addblog} />
            <Route exact path="/read/:id" component={read} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
