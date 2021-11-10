import React from "react";
import Register from "./Register";
import RegisterSuccess from "./RegisterSuccess";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from "./UserPage";
import HeaderButtons from "./HeaderButtons";

const Header = () => {

  return (
    <Router>
      <div className="header wrapper">
        <div className="header-box userpage">
          <div className="logo">
            <img src="../img/barter-logo.png" alt="" />
          </div>
          <Switch>
            <Route exact path='/' component={HeaderButtons} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/register-success" component={RegisterSuccess} />
            <Route path="/userpage" component={UserPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Header;
