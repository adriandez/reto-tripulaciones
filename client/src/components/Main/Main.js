import { Route, Switch } from "react-router-dom";

import Search from "../../pages/Search"
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/SignIn";

import "./Main.scss";

const Main = () => {
  return (
    <main className="Main">
      <Switch>
   
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  );
};

export default Main;
