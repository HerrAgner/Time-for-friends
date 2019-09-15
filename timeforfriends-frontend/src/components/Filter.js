import React from "react"

const Filter = ({setFilter, children}) => {
    const handleFilter = event => setFilter(event.target.value);

    return (
        <div>
            {children} <input onKeyUp={handleFilter} />
        </div>
    );
};

export default Filter