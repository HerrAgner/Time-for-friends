import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import mongoAPI from "../api/mongoAPI";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Store } from "../Store";

const PersonForm = () => {
  const initialItem = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    country: "",
    city: ""
  };
  const { dispatch } = useContext(Store);
  const [errors, setErrors] = useState([]);
  const [newItem, setNewItem] = useState(initialItem);

  useEffect(() => {
    Object.keys(newItem).forEach(name => {
      if (Object.keys(newItem[name]).includes("timeZone")) {
        mongoAPI.create(newItem, "person").then(res => {
          mongoAPI.getAll("person").then(res => {
            return dispatch({
              type: "PEOPLE",
              payload: res
            });
          });
        });
        setNewItem({initialItem});
      }
    });
  }, [newItem, dispatch]);
  console.log(Object.keys(newItem).forEach(name => name));

  const blurValidation = props => {
    if (props.target.value.length < 1) {
      setErrors([...errors, props.target.name]);
    }
  };

  const validateFields = () => {
    loopNestedObj(newItem);
  };

  const loopNestedObj = obj => {
    let tempArray = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (val && typeof val === "object") loopNestedObj(val);
      else {
        if (val === null || val === "") {
        }
      }
    });
  };

  const handleNewItemChange = (event, itemType) => {
    if (errors.includes(event.target.name)) {
      setErrors(errors.filter(error => event.target.name !== error));
    }
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
    validateFields();
    if (errors.length === 0) {
      // let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
      //   process.env.REACT_APP_API_ID
      // }&app_code=${process.env.REACT_APP_API_CODE}&searchtext=${
      //   newItem.location.country
      // }+${newItem.location.city}&gen=9&locationattributes=tz`;
      // axios.get(url).then(response => {
      //   console.log(response);
      //   let tz =
      //     response.data.Response.View[0].Result[0].Location.AdminInfo.TimeZone
      //       .id;
      //   setNewItem({
      //     ...newItem,
      //     location: {
      //       ...newItem.location,
      //       timeZone: tz
      //     }
      //   });
      // });
    }
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
              value={newItem.firstName}
              onChange={e => handleNewItemChange(e, "name")}
              onBlur={blurValidation}
              error={errors.includes("firstName")}
            />
            {errors.includes("firstName") && (
              <FormHelperText id="firstName-error" error={true}>
                First name must not be empty.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastName-input">Last name</InputLabel>
            <Input
              id="lastName-input"
              name="lastName"
              value={newItem.lastName}
              onChange={e => handleNewItemChange(e, "name")}
              onBlur={blurValidation}
              error={errors.includes("lastName")}
            />
            {errors.includes("lastName") && (
              <FormHelperText id="lastName-error" error={true}>
                Last name must not be empty.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phoneNumber-input">Phone number</InputLabel>
            <Input
              id="phoneNumber-input"
              name="phoneNumber"
              value={newItem.phoneNumber}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.includes("phoneNumber")}
            />
            {errors.includes("phoneNumber") && (
              <FormHelperText id="phoneNumber-error" error={true}>
                Phone number must not be empty.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              name="email"
              value={newItem.email}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.includes("email")}
            />
            {errors.includes("email") && (
              <FormHelperText id="email-error" error={true}>
                Email must not be empty
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="country-input">Country</InputLabel>
            <Input
              id="country-input"
              name="country"
              value={newItem.country}
              onChange={e => handleNewItemChange(e, "location")}
              onBlur={blurValidation}
              error={errors.includes("country")}
            />
            {errors.includes("country") && (
              <FormHelperText id="country-error" error={true}>
                Country must not be empty.
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="city-input">City</InputLabel>
            <Input
              id="city-input"
              name="city"
              value={newItem.city}
              onChange={e => handleNewItemChange(e, "location")}
              onBlur={blurValidation}
              error={errors.includes("city")}
            />
            {errors.includes("city") && (
              <FormHelperText id="city-error" error={true}>
                City must not be empty.
              </FormHelperText>
            )}
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
