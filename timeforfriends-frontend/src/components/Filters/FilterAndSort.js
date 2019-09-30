import React, { useContext } from "react";
import NameFilter from "./NameFilter";
import SliderFilter from "./SliderFilter";
import TimeZoneFilter from "./SelectFilter";
import SortButtons from "./SortButtons";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Store } from "../../Store";
import Text from "../Text";

const FilterAndSort = ({
  setNameFilter,
  setSort,
  sort,
  timeZoneFilter,
  setTimeZoneFilter,
  timeFilter,
  setTimeFilter
}) => {
  const { state } = useContext(Store);
  const classes = useStyles();
  const T = Text();
  return (
    <Container maxWidth="md" className={classes.root} style={{ padding: 0 }}>
      <Card
        className={classes.card}
        style={{ margin: "10px", padding: "10px" }}
      >
        <NameFilter
          text={T.filter.name}
          setNameFilter={setNameFilter}
          className={classes.textField}
        />
        <TimeZoneFilter
          text={T.filter.timeZone}
          setTimeZoneFilter={setTimeZoneFilter}
          timeZoneFilter={timeZoneFilter}
          items={state.people}
        />
        <SortButtons setSort={setSort} sort={sort} />
        <SliderFilter timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      </Card>
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
