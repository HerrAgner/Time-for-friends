import React, { useState} from "react";
import "../style/App.css";
import PersonRender from "../components/Person";
import FilterAndSort from "./Filters/FilterAndSort";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  maino: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: "80vw"
  },
  personContainer: {
    minWidth: "80%",
    padding: 0
}
}));

const App = props => {
  const [nameFilter, setNameFilter] = useState({ name: "" });
  const [timeZoneFilter, setTimeZoneFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({ min: 0, max: 24 });
  const [sort, setSort] = useState("NAME");
  const classes = useStyles();

  return (
    <div>
      <div className={classes.maino}>
        <FilterAndSort
          setNameFilter={setNameFilter}
          setSort={setSort}
          sort={sort}
          timeZoneFilter={timeZoneFilter}
          setTimeZoneFilter={setTimeZoneFilter}
          setTimeFilter={setTimeFilter}
          timeFilter={timeFilter}
        />
        <ul className={classes.personContainer}>
          <div>
            {PersonRender(
              nameFilter,
              timeFilter,
              timeZoneFilter,
              sort
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default App;
