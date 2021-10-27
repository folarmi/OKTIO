import "./App.css";
import React, { Suspense, useEffect } from "react";
import { Route, Switch, Link, withRouter, Redirect } from "react-router-dom";
import SignIn from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/Signup/ForgotPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Projects from "../pages/Projects/Projects";
import Rfx from "../pages/RFX/Rfx";
import Items from "../pages/Items/Items"
import verifyEmail from "../pages/VerifyEmail/VerifyEmail";
import Success from "../pages/Signup/Success";
import { connect, useDispatch } from "react-redux";
import { checkAutoLogin } from "../services/AuthService";
import { isAuthenticated } from "../store/selectors/AuthSelectors";

function App(props) {
  // const { location } = props;
  // console.log(props.location);
  const dispatch = useDispatch();
  useEffect(() => {
     checkAutoLogin(dispatch, props.history);
    
  }, []);
  let routes = (
    <Switch>
     
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={Signup} exact />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/success" component={Success} />
      <Route path="/verifyEmail/:token" component={verifyEmail} />
      <Route path="/" component={SignIn} exact />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        {/* <Route path="/posts" component={Posts} />
          <Route path="/createpost" component={createPost} /> */}
        {/* <Route path="/" component={Home} exact /> */}

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/projects" component={Projects} />
        <Route path="/rfx" component={Rfx} />
        <Route path="/items" component={Items} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  return (
    <div>
      {/* {location.pathname === '/signin' || location.pathname === '/signup'(
        { routes }
      )} */}
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
