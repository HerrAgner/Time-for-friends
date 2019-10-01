import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
// import Map from "../Map";
import Button from "@material-ui/core/Button";

const AddressForm = ({ queryValue, suggestion, setSuggestion }) => {
  const address = { city: "", country: "" };
  const [state, setState] = useState({
    address: address,
    query: "",
    locationId: ""
  });
  const [result, setResult] = useState("");

  useEffect(() => {
    const query = queryValue;
    if (!query.length > 0) {
      return setState({
        address: address,
        query: "",
        locationId: ""
      });
    }

    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: process.env.REACT_APP_API_ID,
          app_code: process.env.REACT_APP_API_CODE,
          query: query,
          maxresults: 5
        }
      })
      .then(function(response) {
        if (response.data.suggestions.length > 0) {
          const address = response.data.suggestions
            .filter(s => s.matchLevel === "city")
            .map(a => a.address);
          const id = response.data.suggestions
            .filter(s => s.matchLevel === "city")
            .map(a => a.locationId);
          setState({
            address: address[0],
            query: query,
            locationId: id
          });
        } else {
          setState({
            address: "",
            query: query,
            locationId: ""
          });
        }
      });
  }, [queryValue]);

  const onCheck = evt => {
    if (state.address !== undefined) {
      axios
        .get(
          `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
            process.env.REACT_APP_API_ID
          }&app_code=${process.env.REACT_APP_API_CODE}&searchtext=${
            state.address.country
          }+${state.address.city}&gen=9&locationattributes=tz`
        )
        .then(function(response) {
          const view = response.data.Response.View;
          if (
            view.length > 0 &&
            view[0].Result[0].Location.LocationId !==
              "NT_AXGFqBCoXjiDukylKDqQQC"
          ) {
            const location = view[0].Result[0].Location;
            setState({
              isChecked: true,
              coords: {
                lat: location.DisplayPosition.Latitude,
                lon: location.DisplayPosition.Longitude
              },
              address: {
                city: location.Address.City,
                country: location.Address.Country
              }
            });
            if (location.Address.City) {
              setSuggestion({
                ...suggestion,
                city: location.Address.City,
                country: location.Address.Country,
                label: location.Address.Label,
                timeZone: location.AdminInfo.TimeZone.id
              });
            }
          } else {
            setState({
              address: {
                city: "",
                country: ""
              },
              isChecked: true,
              coords: null
            });
            setSuggestion({
              ...suggestion,
              city: "",
              country: "",
              label: ""
            });
          }
        });
    } else {
      setResult("Invalid. The address is not recognized.");
    }
  };

  useEffect(() => {
    if (!state.isChecked) {
      return;
    }
    // console.log(state);

    if (state.coords === null) {
      setResult("Invalid. The address is not recognized.");
    } else {
      setResult(
        "Valid Address. Location is " +
          state.coords.lat +
          " " +
          state.coords.lon
      );
    }
  }, [state]);

  return (
    <Grid container>
      {/*<AddressSuggest query={state.query} onChange={() => onQuery} />*/}
      {/*<AddressInput*/}
      {/*  city={state.address.city}*/}
      {/*  // state={state.address.state}*/}
      {/*  country={state.address.country}*/}
      {/*/>*/}
      {/*<br />*/}
      {result}
      <Button
        variant="contained"
        style={{ margin: "1vh" }}
        type="submit"
        onClick={onCheck}
      >
        Get location
      </Button>
    </Grid>
  );
};

export default AddressForm;
