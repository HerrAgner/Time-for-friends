import React, { useContext } from "react";
import mongoAPI from "../api/mongoAPI";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Clock from "./Clock";
import moment from "moment-timezone";
// import Map from "./Map";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Card,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Store } from "../Store";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Text from "./Text";

const PersonRender = (filter, timeFilter, timeZoneFilter, sort) => {
  const { state, dispatch } = useContext(Store);

  let max = timeFilter.max % 1 === 0 ? 0 : 30;
  let min = timeFilter.min % 1 === 0 ? 0 : 30;
  let tempArray = sortList(state.people, sort);
  let startTiming = 50;
  return tempArray
    .filter(p =>
      p.location.timeZone.toUpperCase().includes(timeZoneFilter.toUpperCase())
    )
    .filter(
      p =>
        p.name.firstName.toUpperCase().includes(filter.name.toUpperCase()) ||
        p.name.lastName.toUpperCase().includes(filter.name.toUpperCase())
    )
    .filter(p => {
      if (
        timeForComparison(p)[0] < Math.floor(timeFilter.max) ||
        (timeForComparison(p)[0] === Math.floor(timeFilter.max) &&
          timeForComparison(p)[1] < max)
      ) {
        return p;
      }
      return null;
    })
    .filter(p => {
      if (
        timeForComparison(p)[0] > Math.floor(timeFilter.min) ||
        (timeForComparison(p)[0] === Math.floor(timeFilter.min) &&
          timeForComparison(p)[1] > min)
      ) {
        return p;
      }
      return null;
    })
    .map((p, index) => (
      <PersonItem
        key={p._id}
        person={p}
        deleteItem={() => deleteFromDb(p, state, dispatch)}
        transitionTiming={startTiming * index + "ms"}
      />
    ));
};

const timeForComparison = p => {
  let currHour = Number(
    moment()
      .tz(p.location.timeZone)
      .format("HH")
  );
  let currMin = Number(
    moment()
      .tz(p.location.timeZone)
      .format("mm")
  );
  return [currHour, currMin];
};

const sortList = (tempArray, sort) => {
  if (sort === "NAME") {
    tempArray.sort((a, b) => {
      if (a.name.firstName < b.name.firstName) {
        return -1;
      }
      if (a.name.firstName > b.name.firstName) {
        return 1;
      }
      return 0;
    });
    return tempArray;
  }
  if (sort === "TIMEZONE") {
    tempArray.sort((a, b) => {
      if (a.location.timeZone < b.location.timeZone) {
        return -1;
      }
      if (a.location.timeZone > b.location.timeZone) {
        return 1;
      }
      return 0;
    });
    return tempArray;
  }
};

const PersonItem = ({ person, deleteItem, transitionTiming }) => {
  const T = Text();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fade in={true} style={{ transitionDelay: transitionTiming }}>
      <ExpansionPanel
        TransitionProps={{ unmountOnExit: true }}
        style={{ width: "100%" }}
        TransitionComponent={Grow}
      >
        <ExpansionPanelSummary>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={3} style={{ padding: 0 }}>
              {person.name.firstName} {person.name.lastName}
            </Grid>
            <Grid item xs={3} style={{ padding: 0 }}>
              <Clock timeZone={person.location.timeZone} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            item
            direction="column"
            // justify="center"
            // alignItems="center"
          >
            <Card>
              <CardContent>
                {T.personForm.formCountry}: {person.location.country}
              </CardContent>
              <CardContent>
                {T.personForm.formCity}: {person.location.city}
              </CardContent>
              <CardContent>
                {T.sort.timeZone}: {person.location.timeZone}
              </CardContent>
              <CardContent>
                {T.personForm.formEmail}: {person.email.join(", ")}
              </CardContent>
              <CardContent>
                {T.personForm.formPhoneNumber}: {person.phoneNumber.join(", ")}
              </CardContent>
            </Card>
            {/*<Map*/}
            {/*  zoom="12"*/}
            {/*  city={person.location.city}*/}
            {/*  country={person.location.country}*/}
            {/*  _id={person._id}*/}
            {/*/>*/}
            <IconButton aria-label="delete" onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {T.friend.deleteFriend}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {T.friend.areYouSure} {person.name.firstName}{" "}
                  {person.name.lastName}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {T.friend.no}
                </Button>
                <Button onClick={deleteItem} color="primary" autoFocus>
                  {T.friend.yes}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fade>
  );
};

const deleteFromDb = (p, state, dispatch) => {
  mongoAPI.deleteObject(p._id, "person").then(() => {
    return dispatch({
      type: "PEOPLE",
      payload: state.people.filter(item => item._id !== p._id)
    });
    // setItems(items.filter(item => item._id !== p._id))
  });
};

export default PersonRender;
