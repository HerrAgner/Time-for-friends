import React, { useState, useEffect } from "react";
import "../style/App.css";
import mongoService from "../api/mongoAPI";
import PersonRender from "../components/Person";
import PostForm from "../components/PersonForm"

const App = props => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [newItem, setNewItem] = useState({})

  useEffect(() => {
    mongoService.getAll("person").then(res => {
      setItems(res);
    });
  }, []);

  return (
    <div className="App">
      {/*<Filter setFilter={setFilter} />*/}
      {/*<ul>*/}
      {/*  /!*<div>{PersonRender(items, filter)}</div>*!/*/}
      {/*</ul>*/}
        {PostForm(newItem, setNewItem)}
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
