import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import CustomizedSlider from "./sliderFilter";

const App = props => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState({min:0, max:24})

  useEffect(() => {
    mongoService.getAll(props.match.params.collection || "person").then(res => {
      setItems(res);
    });
  }, [props]);

  return (
    <div className="App">
      <Filter setFilter={setFilter} />
      <CustomizedSlider timeFilter={timeFilter} setTimeFilter={setTimeFilter}/>
      <ul>
        <div>{PersonRender(items, setItems, filter)}</div>
      </ul>
    </div>
  );
};


const Filter = ({ setFilter }) => {
    const handleFilter = event => setFilter(event.target.value);

    return (
        <div>
            filter: <input onKeyUp={handleFilter} />
        </div>
    );
};

export default App;
