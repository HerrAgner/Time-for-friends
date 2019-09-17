import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import mongoAPI from "../api/mongoAPI";
import axios from "axios";

const PersonForm = () => {
  const [newItem, setNewItem] = useState({});
  useEffect(() => {
     Object.keys(newItem).forEach((name) => {
      if (Object.keys(newItem[name]).indexOf("timeZone") > -1) {
            mongoAPI.create(newItem, "person").then(res => {
            console.log(res);
          })
      }
    });
  }, [newItem])

  const handleNewItemChange = (event, itemType) => {
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
    let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
      process.env.REACT_APP_API_ID
    }&app_code=${process.env.REACT_APP_API_CODE}&searchtext=${
      newItem.location.country
    }+${newItem.location.city}&gen=9&locationattributes=tz`;
    axios.get(url).then(response => {
      let tz = response.data.Response.View[0].Result[0].Location.AdminInfo.TimeZone.id
      setNewItem({
        ...newItem,
        location: {
          ...newItem.location,
          timeZone: tz
        }
      })
    })
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
          {/*<TextField*/}
          {/*  id="timeZone-newItem"*/}
          {/*  label="Timezone"*/}
          {/*  name="timeZone"*/}
          {/*  onChange={e => handleNewItemChange(e, "location")}*/}
          {/*  style={{ margin: 8 }}*/}
          {/*/>*/}
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Button variant="contained" onClick={() => postToDb()}>
            Post
          </Button>
          {/*<Button variant="contained">Update</Button>*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonForm;
