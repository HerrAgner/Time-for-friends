import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    // // width: 600 + theme.spacing(5) * 2,
    width: "100%"
  },
  margin: {
    // height: theme.spacing(5)
  }
}));
const marks = [
  {
    value: 0,
    label: "00:00"
  },
  {
    value: 2,
    label: "02:00"
  },
  {
    value: 4,
    label: "04:00"
  },
  {
    value: 6,
    label: "06:00"
  },
  {
    value: 8,
    label: "08:00"
  },
  {
    value: 10,
    label: "10:00"
  },
  {
    value: 12,
    label: "12:00"
  },
  {
    value: 14,
    label: "14:00"
  },
  {
    value: 16,
    label: "16:00"
  },
  {
    value: 18,
    label: "18:00"
  },
  {
    value: 20,
    label: "20:00"
  },
  {
    value: 22,
    label: "22:00"
  },
  {
    value: 24,
    label: "24:00"
  }
];

// const marks = [
//   {
//     value: 0,
//     label: "00:00"
//   },
//   {
//     value: 1,
//     label: "01:00"
//   },
//   {
//     value: 2,
//     label: "02:00"
//   },
//   {
//     value: 3,
//     label: "03:00"
//   },
//   {
//     value: 4,
//     label: "04:00"
//   },
//   {
//     value: 5,
//     label: "05:00"
//   },
//   {
//     value: 6,
//     label: "06:00"
//   },
//   {
//     value: 7,
//     label: "07:00"
//   },
//   {
//     value: 8,
//     label: "08:00"
//   },
//   {
//     value: 9,
//     label: "09:00"
//   },
//   {
//     value: 10,
//     label: "10:00"
//   },
//   {
//     value: 11,
//     label: "11:00"
//   },
//   {
//     value: 12,
//     label: "12:00"
//   },
//   {
//     value: 13,
//     label: "13:00"
//   },
//   {
//     value: 14,
//     label: "14:00"
//   },
//   {
//     value: 15,
//     label: "15:00"
//   },
//   {
//     value: 16,
//     label: "16:00"
//   },
//   {
//     value: 17,
//     label: "17:00"
//   },
//   {
//     value: 18,
//     label: "18:00"
//   },
//   {
//     value: 19,
//     label: "19:00"
//   },
//   {
//     value: 20,
//     label: "20:00"
//   },
//   {
//     value: 21,
//     label: "21:00"
//   },
//   {
//     value: 22,
//     label: "22:00"
//   },
//   {
//     value: 23,
//     label: "23:00"
//   },
//   {
//     value: 24,
//     label: "24:00"
//   }
// ];

const TimeSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    padding: '13px 0',
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
  },
})(Slider);

const TimeDisplay = ({ timeFilter }) => {
  let hour = /([^.]+)/.exec(timeFilter)[0];
  if (timeFilter < 10) hour = "0" + hour;
  let min = timeFilter % 1 === 0 ? "00" : "30";
  return (
    <div>
      {hour}:{min}
    </div>
  );
};

const SliderFilter = props => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
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
        style={{maxWidth: "98%"}}
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
