import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";

const App = props => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    mongoService.getAll(props.match.params.collection || "person").then(res => {
      setItems(res);
    });
  }, [props]);


  return (
    <div className="App">
      <Filter setFilter={setFilter} />
      <ul>
        <div>{PersonRender(items, setItems, filter)}</div>
      </ul>
        {/*{PostForm(newItem, setNewItem)}*/}
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
