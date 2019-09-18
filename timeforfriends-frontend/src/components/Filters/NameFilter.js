import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: "80%"
  }
}));


const NameFilter = ({ setNameFilter}) => {
  const classes = useStyles();
  const handleFilter = event => setNameFilter({ name: event.target.value });
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <TextField
            placeholder="Name filter"
            onKeyUp={handleFilter} />
      </FormControl>
    </div>
  );
};

export default NameFilter;
