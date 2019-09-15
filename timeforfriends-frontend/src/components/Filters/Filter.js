import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Filter = ({ setFilter, children }) => {
  const classes = useStyles();
  const handleFilter = event => setFilter(event.target.value);

  return (
    <FormControl className={classes.formControl}>
        <p></p>
        <InputLabel htmlFor="name-filter">Name filter</InputLabel>
        <TextField onKeyUp={handleFilter} />
    </FormControl>
  );
};

export default Filter;
