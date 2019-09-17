import React, { useReducer } from "react";
import NameFilter from "./NameFilter";
import SliderFilter from "./SliderFilter";
import TimeZoneFilter from "./SelectFilter";
import SortButtons from "./SortButtons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

const FilterAndSort = ({
  items,
  setNameFilter,
  setSort,
  sort,
  timeZoneFilter,
  setTimeZoneFilter,
  timeFilter,
  setTimeFilter
}) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.card}>
        <NameFilter setNameFilter={setNameFilter} className={classes.textField}>Name filter: </NameFilter>
        <TimeZoneFilter
          setTimeZoneFilter={setTimeZoneFilter}
          timeZoneFilter={timeZoneFilter}
          items={items}
        />
        <SortButtons setSort={setSort} sort={sort} />
      </Card>
      <SliderFilter timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: "10px"
  },
  card: {
    alignItems: "center",
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  sortByContainer: {
    width: "100%",
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  sortByText: {
    textAlign: "left",
    paddingRight: theme.spacing(1)
  },
  sortByAlternatives: {
    display: "flex",
    justifyContent: "left"
  },
  sortByAlternative: {
    paddingRight: theme.spacing(1),
    color: "#999",
    cursor: "pointer"
  },
  activeSort: {
    color: "#000"
  }
}));

export default FilterAndSort;
