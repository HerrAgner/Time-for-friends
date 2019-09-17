import React from "react";
import {makeStyles, RadioGroup} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const SortButtons = ({ setSort, sort }) => {
  const classes = useStyles();

  const handleSort = event => {
    setSort(event.target.value);
  };

  return (
    <RadioGroup
      aria-label="sort"
      value={sort}
      onChange={handleSort}
      className={classes.buttonContainer}
    >
      <p >Sort by:</p>
      <FormControlLabel className={classes.button} value="NAME" control={<GreenRadio />} label="Name" />
      <FormControlLabel
        value="TIMEZONE"
        control={<GreenRadio />}
        label="Timezone"
        className={classes.button}
      />
    </RadioGroup>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  button: {
    margin: "8px"
  }
}));

export default SortButtons;
