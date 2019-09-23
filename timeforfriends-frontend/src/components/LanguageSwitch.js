import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { purple, green, grey } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { Store } from "../Store";

const GreenSwitch = withStyles({
  switchBase: {
    color: green[400],
    "&$checked": {
      color: green[400]
    },
    "&$checked + $track": {
      backgroundColor: grey[500]
    }
  },
  checked: {},
  track: { backgroundColor: grey[500] }
})(Switch);

export default function LanguageSwitch() {
  const { state, dispatch } = useContext(Store);
  const [checked, setChecked] = React.useState({
    checked: true
  });

  const handleChange = name => event => {
      console.log(event.target.checked);
    setChecked({ ...checked, [name]: event.target.checked });
      dispatch({
          type: "LANGUAGE",
          payload: event.target.checked ? {name: "English", code: "en"} : {name: "Swedish", code: "sv"}
      });
  };

  return (
    <FormGroup>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>{state.language.name}</Grid>
        <Grid item>
          <GreenSwitch
            checked={checked.checked}
            onChange={handleChange("checked")}
            value="checked"
          />
        </Grid>
          <Grid item>Toggle language</Grid>
      </Grid>
    </FormGroup>
  );
}
