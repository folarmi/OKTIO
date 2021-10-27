import React from "react";
import { makeStyles } from "@material-ui/core";
import CustomSelect from "./CustomSelect";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    width: "100%",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  sort: {
    display: "flex",
  },
}));

const Searchbar = ({ ifSortByLatest = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchBar}>
      <div className="container">
        <div className="searchInputWrapper">
          <input
            className="searchInput"
            type="text"
            placeholder="Search using keyword or tags"
          ></input>
        </div>
      </div>
      <div className={classes.sort}>
        <CustomSelect label="Show 10 entries" />
        {ifSortByLatest && <CustomSelect label="Sort by Latest" />}
      </div>
    </div>
  );
};

export default Searchbar;
