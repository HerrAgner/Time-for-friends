import React, { useState, useEffect} from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import FilterAndSort from "./Filters/FilterAndSort";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  },
  margin: {
    height: theme.spacing(5)
  }
}));

const App = props => {
  const [initalItems, setInitialItems] = useState([]);
  // const [items, dispatch] = useReducer(reducer, []);
  const [nameFilter, setNameFilter] = useState({ name: "" });
  const [timeZoneFilter, setTimeZoneFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({ min: 0, max: 24 });
  const [sort, setSort] = useState("NAME");
  const classes = useStyles();
  useEffect(() => {
    mongoService.getAll("person").then(res => {
      setInitialItems(res);
      // dispatch({ type: "SET", payload: res })
    });
  }, [props]);

  return (
    <Box className="main-box">
      <Container className="app">
        <FilterAndSort
          items={initalItems}
          setNameFilter={setNameFilter}
          setSort={setSort}
          sort={sort}
          timeZoneFilter={timeZoneFilter}
          setTimeZoneFilter={setTimeZoneFilter}
          setTimeFilter={setTimeFilter}
          timeFilter={timeFilter}
        />
        <ul className="person-container">
          <div>
            {PersonRender(
              initalItems,
              setInitialItems,
              nameFilter,
              timeFilter,
              timeZoneFilter,
              sort
            )}
          </div>
        </ul>
      </Container>
    </Box>
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
