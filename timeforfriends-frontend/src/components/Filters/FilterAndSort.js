import React from "react";
import NameFilter from "./NameFilter";
import SliderFilter from "./SliderFilter";
import TimeZoneFilter from "./SelectFilter";
import SortButtons from "./SortButtons";
import Grid from "@material-ui/core/Grid";

const FilterAndSort = ({
  items,
  setNameFilter,
  setSort,
  sort,
  timeZoneFilter,
  setTimeZoneFilter,
  timeFilter,
  setTimeFilter
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <NameFilter setNameFilter={setNameFilter}>Name filter: </NameFilter>
        <TimeZoneFilter
          setTimeZoneFilter={setTimeZoneFilter}
          timeZoneFilter={timeZoneFilter}
          items={items}
        />
        <SortButtons setSort={setSort} sort={sort} />
      </Grid>
      <SliderFilter timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
    </>
  );
};

export default FilterAndSort;
