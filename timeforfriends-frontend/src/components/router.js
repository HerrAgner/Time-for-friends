import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import mongoService from "./mongoService";

function reactRouter() {
    return (
        <Router>
            <div>
                <hr />
                <Route exact path="/" component={App} />
                <Route exact path="/:collection" component={App} />
                <Route path="/about" component={About} />
                <Route path="/search" component={Search} />
            </div>
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
    const name = query.get("name");
    const populate = query.get("populate");
    const collection = props.match.params.collection;
    console.log(collection);

    mongoService.querySearch(name, populate, collection).then(res => {
        console.log(res);
    });

    return <div />;
};

export default reactRouter;
