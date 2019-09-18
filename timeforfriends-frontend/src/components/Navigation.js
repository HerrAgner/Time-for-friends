import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./App";
import PersonForm from "../components/PersonForm"
import Start from "../components/Start";
import {Store} from "../Store";
import mongoService from "../api/mongoAPI";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
}));

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        mongoService.getAll("person").then(res => {
            // dispatch({ type: "SET", payload: res })
            return dispatch({
                type: 'PEOPLE',
                payload: res
            });
        });
    }, [dispatch]);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Router>
            <div className={classes.root} >
                <AppBar position="sticky" color="default" elevation={0} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Home" component={Link} to="/" />
                        <Tab label="Friends" component={Link} to="/friends" />
                        <Tab label="Add friend" component={Link} to="/post" />
                    </Tabs>
                </AppBar>

                <Switch>
                    <Route exact path="/" component={Start} />
                    <Route exact path="/friends" component={App} />
                    <Route exact path="/post" component={PersonForm} />
                </Switch>
            </div>
        </Router>
    );
}