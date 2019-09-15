import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import CustomizedSlider from "./sliderFilter";

const App = props => {
  const [items, setItems] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [timeZoneFilter, setTimeZoneFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({ min: 0, max: 24 });
  useEffect(() => {
    mongoService.getAll(props.match.params.collection || "person").then(res => {
      setItems(res);
    });
  }, [props]);

  return (
    <div className="App">
        <Filter setFilter={setTimeZoneFilter}>Timezone filter: </Filter>
        <Filter setFilter={setNameFilter}>Name filter: </Filter>
      <CustomizedSlider timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <ul>
        <div>{PersonRender(items, setItems, nameFilter, timeFilter, timeZoneFilter)}</div>
      </ul>
    </div>
  );
};

const Filter = (props) => {
  const handleFilter = event => props.setFilter(event.target.value);

  return (
    <div>
        {props.children} <input onKeyUp={handleFilter} />
    </div>
  );
};

export default App;
