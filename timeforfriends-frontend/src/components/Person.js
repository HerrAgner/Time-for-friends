import React from "react";
import mongoAPI from "../api/mongoAPI";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Clock from "./Clock";
import moment from "moment-timezone";

const PersonItem = props => {
  return (
    <div>
      {props.firstName} {props.lastName} {props.country} {props.city}
      <Clock timeZone={props.timeZone} />
      <IconButton aria-label="delete" onClick={props.deleteItem}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const deleteFromDb = (p, items, setItems) => {
  mongoAPI
    .deleteObject(p._id, "person")
    .then(() => setItems(items.filter(item => item._id !== p._id)));
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

const PersonRender = (items, setItems, filter, timeFilter) => {
  let max = timeFilter.max % 1 === 0 ? 0 : 30;
  let min = timeFilter.min % 1 === 0 ? 0 : 30;
  return items
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
        firstName={p.name.firstName}
        lastName={p.name.lastName}
        country={p.location.country}
        city={p.location.city}
        key={p._id}
        id={p._id}
        timeZone={p.location.timeZone}
        deleteItem={() => deleteFromDb(p, items, setItems)}
      />
    ));
};

export default PersonRender;
