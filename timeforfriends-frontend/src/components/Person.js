import React from "react";
import mongoAPI from "../api/mongoAPI";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment-timezone";

const PersonItem = props => {
    const time = moment().tz(props.timeZone).format('hh:mm')

  return (
    <div>
      <p>
        {props.firstName} {props.lastName} {props.country} {props.city} {time}
      </p>
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

const PersonRender = (items, setItems, filter) => {
  return items
    .filter(p => p.name.firstName.toUpperCase().includes(filter.toUpperCase()))
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
