import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Text from "../Text";

const AddressForm = ({ queryValue, suggestion, setSuggestion }) => {
  const T = Text();
  const [state, setState] = useState({
    address: { city: "", country: "" },
    query: "",
    locationId: ""
  });
  const [result, setResult] = useState("");

  const onCheck = () => {
    const query = queryValue;
    if (!query.length > 0) {
      return;
    }

    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: process.env.REACT_APP_API_ID,
          app_code: process.env.REACT_APP_API_CODE,
          query: query,
          maxresults: 20
        }
      })
      .then(function(response) {
        const address = response.data.suggestions
          .filter(s => s.matchLevel === "city")
          .map(a => a.address);
        const id = response.data.suggestions
          .filter(s => s.matchLevel === "city")
          .map(a => a.locationId);
        if (address.length > 0 && id.length > 0) {
          setState({
            address: address[0],
            query: query,
            locationId: id
          });
        } else {
          setState({
            ...state,
            address: {
              city: "",
              country: ""
            },
            isChecked: true,
            coords: null,
            locationId: undefined
          });
          setSuggestion({
            city: "",
            country: "",
            label: "",
            timeZone: ""
          });
        }
      });
  };

  useEffect(() => {
    if (
      !(
        state.locationId === undefined ||
        state.locationId === ""
      )
    ) {
      axios
        .get(
          `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
            process.env.REACT_APP_API_ID
          }&app_code=${process.env.REACT_APP_API_CODE}&searchtext=${
            state.address.country
          }+${state.address.city}&gen=9&locationattributes=tz`
        )
        .then((response) => {
          const view = response.data.Response.View;
          if (
            view.length > 0 &&
            view[0].Result[0].Location.LocationId !==
              "NT_AXGFqBCoXjiDukylKDqQQC"
          ) {
            const location = view[0].Result[0].Location;
            setState({
              ...state,
              isChecked: true,
              coords: {
                lat: location.DisplayPosition.Latitude,
                lon: location.DisplayPosition.Longitude
              },
              address: location.Address
            });
            if (location.Address.Label) {
              setSuggestion({
                ...suggestion,
                city: location.Address.City,
                country: location.Address.Country,
                label: location.Address.Label,
                timeZone: location.AdminInfo.TimeZone.id,
                submitted: false
              });
            }
          } else {
            setState({
              ...state,
              address: {
                city: "",
                country: ""
              },
              isChecked: true,
              coords: null,
              locationId: null
            });
            setSuggestion({
              city: "",
              country: "",
              label: null,
              timeZone: "",
              submitted: false
            });
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.locationId]);

  useEffect(() => {
    if (!state.isChecked) {
      return;
    }
    if (state.coords === null) {
      setResult(T.suggest.invalid);
    } else {
      setResult(T.suggest.valid + state.coords.lat + " " + state.coords.lon);
    }
  }, [state, T.suggest.valid, T.suggest.invalid]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {/*<AddressSuggest query={state.query} onChange={() => onQuery} />*/}
      {/*<AddressInput*/}
      {/*  city={state.address.city}*/}
      {/*  // state={state.address.state}*/}
      {/*  country={state.address.country}*/}
      {/*/>*/}
      {/*<br />*/}
      {suggestion.label && (
        <Grid container direction="column" justify="center" alignItems="center">
          {T.personForm.formSuggestedLocation}
          <b>{suggestion.label}</b>
          {T.sort.timeZone}:<b>{suggestion.timeZone}</b>
          <br />
        </Grid>
      )}
      {!suggestion.submitted &&
      <p>{result}</p>}
      <Button
        variant="contained"
        style={{ margin: "1vh" }}
        type="submit"
        onClick={onCheck}
      >
        {T.personForm.formGetLocationButton}
      </Button>
    </Grid>
  );
};

export default AddressForm;
