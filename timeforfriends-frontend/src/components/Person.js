import React, { useContext } from "react";
import mongoAPI from "../api/mongoAPI";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Clock from "./Clock";
import moment from "moment-timezone";
// import Map from "./Map";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Card,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Store } from "../Store";
import Map from "./Map";

const PersonRender = (filter, timeFilter, timeZoneFilter, sort) => {
  const { state, dispatch } = useContext(Store);
  let max = timeFilter.max % 1 === 0 ? 0 : 30;
  let min = timeFilter.min % 1 === 0 ? 0 : 30;
  let tempArray = sortList(state.people, sort);
  return tempArray
    .filter(p =>
      p.location.timeZone.toUpperCase().includes(timeZoneFilter.toUpperCase())
    )
    .filter(
      p =>
        p.name.firstName.toUpperCase().includes(filter.name.toUpperCase()) ||
        p.name.lastName.toUpperCase().includes(filter.name.toUpperCase())
    )
    .filter(p => {
      if (
        timeForComparison(p)[0] < Math.floor(timeFilter.max) ||
        (timeForComparison(p)[0] === Math.floor(timeFilter.max) &&
          timeForComparison(p)[1] < max)
      ) {
        return p;
      }
      return null;
    })
    .filter(p => {
      if (
        timeForComparison(p)[0] > Math.floor(timeFilter.min) ||
        (timeForComparison(p)[0] === Math.floor(timeFilter.min) &&
          timeForComparison(p)[1] > min)
      ) {
        return p;
      }
      return null;
    })
    .map(p => (
      <PersonItem
        key={p._id}
        person={p}
        deleteItem={() => deleteFromDb(p, state, dispatch)}
      />
    ));
};

const timeForComparison = p => {
  let currHour = Number(
    moment()
      .tz(p.location.timeZone)
      .format("HH")
  );
  let currMin = Number(
    moment()
      .tz(p.location.timeZone)
      .format("mm")
  );
  return [currHour, currMin];
};

const sortList = (tempArray, sort) => {
  if (sort === "NAME") {
    tempArray.sort((a, b) => {
      if (a.name.firstName < b.name.firstName) {
        return -1;
      }
      if (a.name.firstName > b.name.firstName) {
        return 1;
      }
      return 0;
    });
    return tempArray;
  }
  if (sort === "TIMEZONE") {
    tempArray.sort((a, b) => {
      if (a.location.timeZone < b.location.timeZone) {
        return -1;
      }
      if (a.location.timeZone > b.location.timeZone) {
        return 1;
      }
      return 0;
    });
    return tempArray;
  }
};

const PersonItem = ({ person, deleteItem }) => {
  return (
    <ExpansionPanel
      TransitionProps={{ unmountOnExit: true }}
      style={{ width: "100%" }}
    >
      <ExpansionPanelSummary>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={3} style={{ padding: 0 }}>
            {person.name.firstName} {person.name.lastName}
          </Grid>
          <Grid item xs={3} style={{ padding: 0 }}>
            <Clock timeZone={person.location.timeZone} />
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid
          container
          item
          direction="column"
          // justify="center"
          // alignItems="center"
        >
          <Card>
            <CardContent>Country: {person.location.country}</CardContent>
            <CardContent>City: {person.location.city}</CardContent>
            <CardContent>Timezone: {person.location.timeZone}</CardContent>
            <CardContent>Email: {person.email.join(", ")}</CardContent>
            <CardContent>
              Phone number: {person.phoneNumber.join(", ")}
            </CardContent>
          </Card>
          <Map
            zoom="12"
            city={person.location.city}
            country={person.location.country}
            _id={person._id}
          />
          <IconButton aria-label="delete" onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
const deleteFromDb = (p, state, dispatch) => {
  mongoAPI.deleteObject(p._id, "person").then(() => {
    return dispatch({
      type: "PEOPLE",
      payload: state.people.filter(item => item._id !== p._id)
    });
    // setItems(items.filter(item => item._id !== p._id))
  });
};

export default PersonRender;
