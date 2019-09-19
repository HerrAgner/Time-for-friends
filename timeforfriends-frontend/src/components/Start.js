import React, {useContext} from "react";
import WorldMap from "./WorldMap";
import { Container } from "@material-ui/core";
import {Store} from "../Store";

const Start = () => {
    const { state } = useContext(Store);
    console.log(state);

    return (
    <Container style={{margin: 0, padding: 0}}>
      {/*<h1>Welcome!</h1>*/}
      <WorldMap items={state.people} />
    </Container>
  );
};

export default Start;
