import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import mongoAPI from "../api/mongoAPI";

const PersonForm = () => {
  const [newItem, setNewItem] = useState({});

  const handleNewItemChange = (event, itemType) => {
    console.log(itemType);
    switch (itemType) {
      case "name":
        setNewItem({
          ...newItem,
          name: {
            ...newItem.name,
            [event.target.name]: event.target.value
          }
        });
        break;
      case "location":
        setNewItem({
          ...newItem,
          location: {
            ...newItem.location,
            [event.target.name]: event.target.value
          }
        });
        break;
      default:
        setNewItem({
          ...newItem,
          [event.target.name]: event.target.value
        });
        break;
    }
  };

  const postToDb = () => {
    mongoAPI.create(newItem, "person").then(res => {
      // setItems([...items, res]);
      console.log(res);
    });
    // setNewItem({});
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" alignItems="stretch" item xs={5}>
          <TextField
            id="firstName-newItem"
            label="First name"
            name="firstName"
            onChange={e => handleNewItemChange(e, "name")}
            style={{ margin: 8 }}
          />
          <TextField
            id="lastName-newItem"
            label="Last name"
            name="lastName"
            onChange={e => handleNewItemChange(e, "name")}
            style={{ margin: 8 }}
          />
          <TextField
            id="phoneNumber-newItem"
            label="Phone Number"
            name="phoneNumber"
            onChange={handleNewItemChange}
            style={{ margin: 8 }}
          />
          <TextField
            id="email-newItem"
            label="E-mail"
            name="email"
            onChange={handleNewItemChange}
            style={{ margin: 8 }}
          />
          <TextField
            id="country-newItem"
            label="Country"
            name="country"
            onChange={e => handleNewItemChange(e, "location")}
            style={{ margin: 8 }}
          />
          <TextField
            id="city-newItem"
            label="City"
            name="city"
            onChange={e => handleNewItemChange(e, "location")}
            style={{ margin: 8 }}
          />
          <TextField
            id="timeZone-newItem"
            label="Timezone"
            name="timeZone"
            onChange={e => handleNewItemChange(e, "location")}
            style={{ margin: 8 }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button variant="contained" onClick={() => postToDb()}>Post</Button>
          {/*<Button variant="contained">Update</Button>*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonForm;
