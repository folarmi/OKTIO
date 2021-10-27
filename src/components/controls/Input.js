import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    multiline,
    maxRows = 0,
    onChange,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      size="small"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
      margin="dense"
      multiline
      minRows={maxRows}
    //   fullWidth
      autoComplete=""
    //   autoFocus
    />
  );
}
