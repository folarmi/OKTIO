import { Link, Typography } from "@material-ui/core";
import React from "react";

export default function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </div>
  );
}
