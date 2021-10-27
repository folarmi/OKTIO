import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels() {
  const [age, setAge] = React.useState("");

  const useStyles = makeStyles((theme) => ({
    label: {
      color: "red",
    },
  }));

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const classes = useStyles();

  return (
    <div>
      <FormControl
        size="small"
        sx={{
          border: "none",
          backgroundColor: "#DEF8F3",
        }}
      >
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{ border: "0px", outline: "0px" }}
          size="small"
        >
          <MenuItem value="" className={classes.label}>
            Active
          </MenuItem>
          <MenuItem
            style={{
              color: "#00D4B5",
              backgroundColor: "#DEF8F3",
              margin: "3px 8px",
              borderRadius: "8px",
              fontSize: "10px",
            }}
            value={"active"}
          >
            Active
          </MenuItem>
          <MenuItem
            style={{
              color: "#F1F0F2",
              backgroundColor: "#A19B9D",
              margin: "3px 8px",
              borderRadius: "8px",
              fontSize: "10px",
            }}
            value={"inactive"}
          >
            Inactive
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
