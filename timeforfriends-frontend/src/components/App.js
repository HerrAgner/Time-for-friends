import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import CustomizedSlider from "./sliderFilter";
import Filter from "./Filters/Filter"
import SelectFilter from "./Filters/SelectFilter";
import Grid from "@material-ui/core/Grid";


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
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <SelectFilter setFilter={setTimeZoneFilter} filter={timeZoneFilter} items={items}>Timezone filter: </SelectFilter>
        <Filter setFilter={setNameFilter}>Name filter: </Filter>
      </Grid>
      <CustomizedSlider timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <ul>
        <div>{PersonRender(items, setItems, nameFilter, timeFilter, timeZoneFilter)}</div>
      </ul>
    </div>
  );
};



export default App;
