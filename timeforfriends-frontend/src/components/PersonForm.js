import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import mongoAPI from "../api/mongoAPI";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Notification from "./Notification";
import { Store } from "../Store";
import Text from "./Text";

const PersonForm = () => {
  const T = Text();
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
  const [submitCheck, setSubmitCheck] = useState(false);
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });

  useEffect(() => {
    if (Object.keys(newItem).includes("timeZone")) {
      let sendItem = {
        name: {
          firstName: newItem.firstName,
          lastName: newItem.lastName
        },
        phoneNumber: newItem.phoneNumber,
        email: newItem.email,
        location: {
          country: newItem.country,
          city: newItem.city,
          timeZone: newItem.timeZone
        }
      };
      mongoAPI
        .create(sendItem, "person")
        .then(res => {
          mongoAPI.getAll("person").then(res => {
            return dispatch({
              type: "PEOPLE",
              payload: res
            });
          });
        })
        .then(() => {
          setNotification({
            message: `${newItem.firstName} ${newItem.lastName} ${
              T.personForm.notificationAdded
            }`,
            type: "notification"
          });
          setTimeout(() => {
            setNotification({ name: null, type: null });
          }, 5000);
        });
      setNewItem(initialItem);
    }
  }, [newItem, notification, initialItem, dispatch, T]);

  useEffect(() => {
    if (errors.length === 0 && Object.values(newItem).every(v => v !== "")) {
      setSubmitCheck(true);
    } else {
      setSubmitCheck(false);
    }
  }, [errors, newItem]);

  const blurValidation = props => {
    if (
      props.target.value.length < 1 &&
      !errors.some(e => e.name === props.target.name)
    ) {
      setErrors([
        ...errors,
        {
          name: props.target.name,
          text: `Field must not be empty`,
          type: "empty"
        }
      ]);
    }
  };

  const validateFields = () => {
    Object.entries(newItem).forEach(([key, val]) => {
      if (val === "" && !errors.some(e => e.name === key)) {
        if (key === "email") {
          handleEmail(val);
        } else if (key === "phoneNumber") {
          handlePhoneNumber(val);
        } else {
          setErrors(oldArray => [
            ...oldArray,
            {
              name: key,
              text: `${key} ${T.personForm.errorEmpty}`,
              type: "empty"
            }
          ]);
        }
      }
    });
  };

  const handleNewItemChange = event => {
    if (errors.some(e => e.name === event.target.name)) {
      setErrors(errors.filter(error => event.target.name !== error.name));
    }
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value
    });
  };

  const handlePhoneNumber = event => {
    const re = /[(]?[+]?(\d{2}|\d{3})[)]?[\s]?((\d{6}|\d{8})|(\d{3}[*.\-\s]){3}|(\d{2}[*.\-\s]){4}|(\d{4}[*.\-\s]){2})|\d{8}|\d{10}|\d{12}/;

    if (event === "" || event.target.value === "") {
      setErrors(oldArray => [
        ...oldArray,
        {
          name: "phoneNumber",
          text: `${T.personForm.formPhoneNumber} ${T.personForm.errorEmpty}`,
          type: "empty"
        }
      ]);
    } else if (!re.test(event.target.value)) {
      setErrors([
        ...errors,
        {
          name: event.target.name,
          text: T.personForm.errorPhoneInvalid,
          type: "error"
        }
      ]);
    }
  };

  const handleEmail = event => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (event === "" || event.target.value === "") {
      setErrors(oldArray => [
        ...oldArray,
        {
          name: "email",
          text: `${T.personForm.formEmail} ${T.personForm.errorEmpty}`,
          type: "empty"
        }
      ]);
    } else if (!re.test(event.target.value)) {
      setErrors([
        ...errors,
        {
          name: event.target.name,
          text: T.personForm.errorEmailInvalid,
          type: "error"
        }
      ]);
    }
  };

  const postToDb = () => {
    validateFields();
    if (submitCheck) {
      let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
        process.env.REACT_APP_API_ID
      }&app_code=${process.env.REACT_APP_API_CODE}&searchtext=${
        newItem.country
      }+${newItem.city}&gen=9&locationattributes=tz`;
      axios.get(url).then(response => {
        let tz =
          response.data.Response.View[0].Result[0].Location.AdminInfo.TimeZone
            .id;
        setNewItem({
          ...newItem,
          timeZone: tz
        });
      });
    }
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid container direction="column" alignItems="stretch" item xs={5}>
          <FormControl>
            <InputLabel htmlFor="firstName-input">
              {T.personForm.formFirstName}
            </InputLabel>
            <Input
              id="firstName-input"
              name="firstName"
              value={newItem.firstName}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.some(e => e.name === "firstName")}
            />
            {errors.some(e => e.name === "firstName") && (
              <FormHelperText id="firstName-error" error={true}>
                {T.personForm.formFirstName} {T.personForm.errorEmpty}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="lastName-input">
              {T.personForm.formLastName}
            </InputLabel>
            <Input
              id="lastName-input"
              name="lastName"
              value={newItem.lastName}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.some(e => e.name === "lastName")}
            />
            {errors.some(e => e.name === "lastName") && (
              <FormHelperText id="lastName-error" error={true}>
                {T.personForm.formLastName} {T.personForm.errorEmpty}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phoneNumber-input">
              {T.personForm.formPhoneNumber}
            </InputLabel>
            <Input
              id="phoneNumber-input"
              name="phoneNumber"
              value={newItem.phoneNumber}
              onChange={handleNewItemChange}
              onBlur={handlePhoneNumber}
              error={errors.some(e => e.name === "phoneNumber")}
            />
            {errors.some(e => e.name === "phoneNumber") && (
              <FormHelperText id="phoneNumber-error" error={true}>
                {errors.filter(e => e.name === "phoneNumber")[0].type ===
                "error"
                  ? `${T.personForm.errorPhoneInvalid}`
                  : `${T.personForm.formPhoneNumber} ${
                      T.personForm.errorEmpty
                    }`}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email-input">
              {T.personForm.formEmail}
            </InputLabel>
            <Input
              id="email-input"
              name="email"
              value={newItem.email}
              onChange={handleNewItemChange}
              onBlur={handleEmail}
              error={errors.some(e => e.name === "email")}
            />
            {errors.some(e => e.name === "email") && (
              <FormHelperText id="email-error" error={true}>
                {errors.filter(e => e.name === "email")[0].type === "error"
                  ? `${T.personForm.errorEmailInvalid}`
                  : `${T.personForm.formEmail} ${T.personForm.errorEmpty}`}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="country-input">
              {T.personForm.formCountry}
            </InputLabel>
            <Input
              id="country-input"
              name="country"
              value={newItem.country}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.some(e => e.name === "country")}
            />
            {errors.some(e => e.name === "country") && (
              <FormHelperText id="country-error" error={true}>
                {T.personForm.formCountry} {T.personForm.errorEmpty}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="city-input">
              {T.personForm.formCity}
            </InputLabel>
            <Input
              id="city-input"
              name="city"
              value={newItem.city}
              onChange={handleNewItemChange}
              onBlur={blurValidation}
              error={errors.some(e => e.name === "city")}
            />
            {errors.some(e => e.name === "city") && (
              <FormHelperText id="city-error" error={true}>
                {T.personForm.formCity} {T.personForm.errorEmpty}
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
          <Button variant="contained" style={{margin: "1vh"}} onClick={() => postToDb()}>
            {T.personForm.button}
          </Button>
        </Grid>
        <Notification message={notification.message} type={notification.type} />
      </Grid>
    </div>
  );
};

export default PersonForm;
