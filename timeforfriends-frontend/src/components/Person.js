import React from "react";

const PersonItem = props => {
  return (
    <p>
      {props.firstName} {props.lastName} {props.country} {props.city}
    </p>
  );
};

const PersonRender = (items, filter) => {
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
      // deleteItem={() => deleteFromDb(p)}
    />
  ));
};

export default PersonRender;
