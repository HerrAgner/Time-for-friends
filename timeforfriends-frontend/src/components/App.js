import React, { useState, useEffect } from "react";
import "./App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";

const Filter = ({ setFilter }) => {

    const handleFilter = event => setFilter(event.target.value)

    return (
        <div>
            filter: <input onKeyUp={handleFilter} />
        </div>
    )
}

const App = props => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("")

  useEffect(() => {
    mongoService.getAll("person").then(res => {
      setItems(res);
    });
  }, []);

  return (
    <div className="App">
        <Filter filter={filter} setFilter={setFilter} />
        <ul>
          <div>{PersonRender(items, filter)}</div>
      </ul>
    </div>
  );
};

export default App;
