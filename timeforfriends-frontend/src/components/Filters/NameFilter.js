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
  }
}));


const NameFilter = ({ setNameFilter}) => {
  const classes = useStyles();
  const handleFilter = event => setNameFilter({ name: event.target.value });
  return (
    <div>
      <FormControl className={classes.formControl}>
        <p />
        <InputLabel htmlFor="name-filter">Name filter</InputLabel>
        <TextField onKeyUp={handleFilter} />
      </FormControl>
    </div>
  );
};

export default NameFilter;
