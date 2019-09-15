import React from "react";
import mongoAPI from "../api/mongoAPI";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Clock from "./Clock";
import moment from "moment-timezone";
import Map from "./Map";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const PersonItem = ({person, deleteItem}) => {
  return (
    <ExpansionPanel
      TransitionProps={{ unmountOnExit: true }}
      style={{ width: "50%" }}
    >
      <ExpansionPanelSummary>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          {person.name.firstName} {person.name.lastName}
          <Clock timeZone={person.location.timeZone} />
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
        >
          <p>Country: {person.location.country}</p>
          <p>City: {person.location.city}</p>
          <p>Timezone: {person.location.timeZone}</p>
          <Map
            apikey="lJGja1orB-44nvo6kd9bg99cdqsq3h2eRLNsvHlZoH8"
            zoom="12"
            geocodingParams={person.location.city}
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

const deleteFromDb = (p, items, setItems) => {
  mongoAPI
    .deleteObject(p._id, "person")
    .then(() => setItems(items.filter(item => item._id !== p._id)));
};

const PersonRender = (items, setItems, filter, timeFilter, timeZoneFilter) => {
  let max = timeFilter.max % 1 === 0 ? 0 : 30;
  let min = timeFilter.min % 1 === 0 ? 0 : 30;
  return items
    .filter(p =>
      p.location.timeZone.toUpperCase().includes(timeZoneFilter.toUpperCase())
    )
    .filter(p => p.name.firstName.toUpperCase().includes(filter.toUpperCase()))
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
        deleteItem={() => deleteFromDb(p, items, setItems)}
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

export default PersonRender;
