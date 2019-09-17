import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import PersonForm from "../components/PersonForm"
import mongoService from "../api/mongoAPI";
import Navigation from "./Navigation";

function reactRouter() {

    return (
        <Router>
            <Navigation/>
            {/*<div>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/post">Post</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*    <Route exact path="/" component={App} />*/}
            {/*    /!*<Route exact path="/:collection" component={App} />*!/*/}
            {/*    <Route exact path="/post" component={PersonForm} />*/}
            {/*    <Route path="/about" component={About} />*/}
            {/*    <Route path="/search" component={Search} />*/}
            {/*</div>*/}
        </Router>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Search({ match }) {

    return (
        <div>
            <Route path={`${match.path}/:collection`} component={searchParams} />
            <Route exact path={match.path} />
        </div>
    );
}

const searchParams = props => {
    const query = new URLSearchParams(props.location.search);
    const name = query.get("firstName");
    const collection = props.match.params.collection;
    console.log(collection);

    mongoService.querySearch(name, collection).then(res => {
        console.log(res);
    });

    return <div />;
};

export default reactRouter;
