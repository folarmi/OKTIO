import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
// render

import React from "react";

const SearchField = () => {
  return (
    <div>
      <TextField
        label="With normal TextField"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchField;

{
  /* <TextField
  label="With normal TextField"
  InputProps={{
    endAdornment: (
      <InputAdornment>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
/>  */
}
