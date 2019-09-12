import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const postForm = (newItem, setNewItem) => {
    const handleNewItemChange = event => {
        console.log(event.target);
        setNewItem({
            ...newItem,
            [event.target.name]: event.target.value
        });
    };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            id="firstName-newItem"
            label="First name"
            name="firstName"
            onChange={handleNewItemChange}
            style={{ margin: 8 }}
          />
          <TextField
            id="lastName-newItem"
            label="Last name"
            name="lastName"
            nest="name"
            onChange={handleNewItemChange}
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
            onChange={handleNewItemChange}
            style={{ margin: 8 }}
          />
          <TextField
            id="city-newItem"
            label="City"
            name="city"
            onChange={handleNewItemChange}
            style={{ margin: 8 }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button variant="contained">Post</Button>
          <Button variant="contained">Update</Button>
        </Grid>
      </Grid>
    </div>
  );
};



export default postForm;
