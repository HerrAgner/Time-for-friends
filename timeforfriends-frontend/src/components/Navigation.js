import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./App";
import PersonForm from "../components/PersonForm"
import Start from "../components/Start";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
}));

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Router>
            <div className={classes.root} >
                <AppBar position="static" color="default" elevation={0} >
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