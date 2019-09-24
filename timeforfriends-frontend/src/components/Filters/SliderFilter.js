import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import { Store } from "../../Store";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  margin: {}
}));

const TimeSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    padding: "13px 0"
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const TimeDisplay = ({ timeFilter }) => {
  const { state } = useContext(Store);
  const lang = state.language.code;
  let hour = /([^.]+)/.exec(timeFilter)[0];
  let ampm;
  if (timeFilter < 10) {
    hour = "0" + hour;
  }
  if (Number(hour) >= 12 && lang === "en") {
    hour = /([^.]+)/.exec(timeFilter - 12)[0];
    ampm = "pm";
  } else if (lang === "en") {
    ampm = "am";
  } else {
    ampm = null;
  }
  let min = timeFilter % 1 === 0 ? "00" : "30";
  return (
    <div>
      {hour}:{min} {ampm}
    </div>
  );
};

const SliderFilter = props => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <TimeSlider
        defaultValue={[0, 24]}
        valueLabelDisplay="auto"
        max={24}
        onChangeCommitted={(e, val) =>
          props.setTimeFilter({
            min: val[0],
            max: val[1]
          })
        }
        step={0.5}
        style={{ maxWidth: "98%" }}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <TimeDisplay timeFilter={props.timeFilter.min} />
        <TimeDisplay timeFilter={props.timeFilter.max} />
      </Grid>
    </div>
  );
};
export default SliderFilter;
