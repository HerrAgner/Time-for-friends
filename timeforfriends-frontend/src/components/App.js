import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import { Store } from "../Store";
import FilterAndSort from "./Filters/FilterAndSort";

const App = props => {
  const { state, dispatch } = React.useContext(Store);
  const [items, setItems] = useState([]);
  const [nameFilter, setNameFilter] = useState({ name: "" });
  const [timeZoneFilter, setTimeZoneFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({ min: 0, max: 24 });
  const [sort, setSort] = useState("name");
  useEffect(() => {
    mongoService.getAll(props.match.params.collection || "person").then(res => {
      setItems(res);
    });
  }, [props]);

  return (
    <div className="App">
      <FilterAndSort
        items={items}
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
            items,
            setItems,
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

export default App;
