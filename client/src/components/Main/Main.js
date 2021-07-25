import { Route, Switch, Redirect } from "react-router-dom";

import Home from "../../pages/Home"
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";
import Map from "../../pages/Map";

import "./Main.scss";

const Main = () => {
  return (
    <main className="Main">
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/map" component={Map} />
      </Switch>
    </main>
  );
};

export default Main;
