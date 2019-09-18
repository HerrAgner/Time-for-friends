import React, { useState, useEffect, useContext} from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import FilterAndSort from "./Filters/FilterAndSort";
import { makeStyles } from "@material-ui/core";
import WorldMap from "./WorldMap";
import  {Store} from "../Store";

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
  // const [items, dispatch] = useReducer(reducer, []);
  const { state, dispatch } = useContext(Store);
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

// const reducer = (items, action) => {
//   switch (action.type) {
//     case "SET":
//       return action.payload
//     case "NAMEFILTER":
//       return [
//         ...action.initState.filter(p =>
//             p.name.firstName
//                 .toUpperCase()
//                 .includes(action.payload.toUpperCase())
//         )
//       ];
//     case "TIMEZONE":
//       return [
//         ...action.initState.filter(p =>
//             p.location.timeZone
//                 .toUpperCase()
//                 .includes(action.payload.toUpperCase())
//         )
//       ];
//     case "MIN":
//     case "MAX":
//     case "NAMESORT":
//     case "TIMEZONESORT":
//     default:
//   }
// };

export default App;
