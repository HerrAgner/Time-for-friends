import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import React from "react";
import { makeStyles } from "@material-ui/core";

const TimeZoneFilter = ({ items, setTimeZoneFilter, timeZoneFilter, text }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      minWidth: "80%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  const classes = useStyles();

  function handleChange(event) {
    setTimeZoneFilter(event.target.value);
  }
  let availableTimeZones = () => {
    let tempArray = [
      ...new Set(items.map(tz => tz.location.timeZone).sort())
    ].map(tz => (
      <MenuItem key={tz} value={tz}>
        {tz}
      </MenuItem>
    ));
    tempArray.unshift(
      <MenuItem key={"empty"} value={""}>
        No filter
      </MenuItem>
    );
    return tempArray;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="tz-filter">{text}</InputLabel>
      <Select
        value={timeZoneFilter}
        onChange={handleChange}
        inputProps={{
          filter: "Timezone",
          id: "tz-select"
        }}
      >
        {availableTimeZones()}
      </Select>
    </FormControl>
  );
};

export default TimeZoneFilter;
