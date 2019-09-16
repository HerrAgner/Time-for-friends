import React, {useState, useEffect, useReducer} from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import { Store } from "../Store";
import FilterAndSort from "./Filters/FilterAndSort";

const App = props => {
  const [initalItems, setInitialItems] = useState([]);
  // const [items, dispatch] = useReducer(reducer, []);
  const [nameFilter, setNameFilter] = useState({ name: "" });
  const [timeZoneFilter, setTimeZoneFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({ min: 0, max: 24 });
  const [sort, setSort] = useState("NAME");
  useEffect(() => {
    mongoService.getAll(props.match.params.collection || "person").then(res => {
      setInitialItems(res);
      // dispatch({ type: "SET", payload: res })
    });
  }, [props]);
  return (
    <div className="App">
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
      <ul>
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
