import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch} from "react-router-dom";
import App from "./App";
import PersonForm from "../components/PersonForm";
import Start from "../components/Start";
import { Store } from "../Store";
import mongoService from "../api/mongoAPI";
import { createBrowserHistory } from "history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const Navigation = () => {
  const history = createBrowserHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { dispatch } = useContext(Store);

  useEffect(() => {
    mongoService.getAll("person").then(res => {
      // dispatch({ type: "SET", payload: res })
      return dispatch({
        type: "PEOPLE",
        payload: res
      });
    });
  }, [dispatch]);
  useEffect(() => {
    switch (history.location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/friends":
        setValue(1);
        break;
      case "/post":
        setValue(2);
        break;
      default:
    }
  },[history.location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="sticky" color="default" elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab value={0} label="Home" component={Link} to="/" />
            <Tab value={1} label="Friends" component={Link} to="/friends" />
            <Tab value={2} label="Add friend" component={Link} to="/post" />
          </Tabs>
        </AppBar>

        <Switch>
          <Route exact path="/" onChange={handleChange} component={Start} />
          <Route
            exact
            path="/friends"
            onChange={handleChange}
            component={App}
          />
          <Route
            exact
            path="/post"
            onChange={handleChange}
            component={PersonForm}
          />
        </Switch>
      </div>
    </Router>
  );
};
export default Navigation;
