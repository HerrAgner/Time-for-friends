import React, { useContext, useState } from "react";
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
const marks = [
  {
    value: 0,
    label: ""
  },
  {
    value: 2,
    label: "|"
  },
  {
    value: 4,
    label: "|"
  },
  {
    value: 6,
    label: "|"
  },
  {
    value: 8,
    label: "|"
  },
  {
    value: 10,
    label: "|"
  },
  {
    value: 12,
    label: "|"
  },
  {
    value: 14,
    label: "|"
  },
  {
    value: 16,
    label: "|"
  },
  {
    value: 18,
    label: "|"
  },
  {
    value: 20,
    label: "|"
  },
  {
    value: 22,
    label: "|"
  },
  {
    value: 24,
    label: ""
  }
];

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
  if (timeFilter < 10 && lang !== "en") {
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
  const [time, setTime] = useState([0, 24]);
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
        defaultValue={time}
        valueLabelDisplay="off"
        max={24}
        onChangeCommitted={(e, val) =>
          props.setTimeFilter({
            min: val[0],
            max: val[1]
          })
        }
        onChange={(e, val) => {
          setTime([val[0], val[1]]);
        }}
        step={0.5}
        style={{ maxWidth: "98%" }}
        marks={marks}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <TimeDisplay timeFilter={time[0]} />
        <TimeDisplay timeFilter={time[1]} />
      </Grid>
    </div>
  );
};
export default SliderFilter;
