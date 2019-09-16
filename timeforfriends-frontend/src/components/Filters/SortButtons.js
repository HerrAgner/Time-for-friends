import React, {useState} from "react"
import {RadioGroup} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import {green} from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
    root: {
        color: green[400],
        "&$checked": {
            color: green[600]
        }
    },
    checked: {}
})(props => <Radio color="default" {...props} />);


const SortButtons = ({setSort, sort}) => {
    const handleSort = event => {setSort(event.target.value);};

    return (
    <RadioGroup
        aria-label="sort"
        value={sort}
        onChange={handleSort}
        // className={classes.radioButtons}
    >
        <p>Sort by:</p>
        <FormControlLabel value="name" control={<GreenRadio />} label="Name" />
        <FormControlLabel
            value="timezone"
            control={<GreenRadio />}
            label="Timezone"
        />
    </RadioGroup>
)}

export default SortButtons