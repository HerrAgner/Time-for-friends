import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import mongoAPI from "../api/mongoAPI";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Store} from "../Store";

const PersonForm = () => {
  const { dispatch } = useContext(Store);
  const [newItem, setNewItem] = useState({});
  useEffect(() => {
    Object.keys(newItem).forEach(name => {
      if (Object.keys(newItem[name]).indexOf("timeZone") > -1) {
        mongoAPI.create(newItem, "person").then(res => {
          mongoAPI.getAll("person").then(res => {
            return dispatch({
              type: "PEOPLE",
              payload: res
            });
          });
        });
      }
    });
  }, [newItem]);

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
      console.log(response);
      let tz =
        response.data.Response.View[0].Result[0].Location.AdminInfo.TimeZone.id;
      setNewItem({
        ...newItem,
        location: {
          ...newItem.location,
          timeZone: tz
        }
      });
    });
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" alignItems="stretch" item xs={5}>
          <FormControl>
            <InputLabel htmlFor="firstName-input">First name</InputLabel>
            <Input
              id="firstName-input"
              name="firstName"
              onChange={e => handleNewItemChange(e, "name")}
            />
            <FormHelperText id="firstName-error">
              First name must not be empty.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastName-input">Last name</InputLabel>
            <Input
              id="lastName-input"
              name="lastName"
              onChange={e => handleNewItemChange(e, "name")}
            />
            <FormHelperText id="lastName-error">
              Last name must not be empty.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phoneNumber-input">Phone number</InputLabel>
            <Input
              id="phoneNumber-input"
              name="phoneNumber"
              onChange={handleNewItemChange}
            />
            <FormHelperText id="phoneNumber-error">
              Phone number must not be empy
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              name="email"
              onChange={handleNewItemChange}
            />
            <FormHelperText id="email-error">
              Email must not be empty
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="country-input">Country</InputLabel>
            <Input
              id="country-input"
              name="country"
              onChange={e => handleNewItemChange(e, "location")}
            />
            <FormHelperText id="country-error">
              Country must not be empty.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="city-input">City</InputLabel>
            <Input
              id="city-input"
              name="city"
              onChange={e => handleNewItemChange(e, "location")}
            />
            <FormHelperText id="city-error">
              City must not be empty.
            </FormHelperText>
          </FormControl>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonForm;
