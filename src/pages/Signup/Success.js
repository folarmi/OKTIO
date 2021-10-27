import {
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import logo from "../../assets/octioLogo.svg";
import logopng from "../../assets/logo.png";
import { Link as Links } from "react-router-dom";
// import Notification from "../../components/Notification";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    padding: theme.spacing(4),
    borderRadius: "15px",
  },
  paperRight: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: theme.spacing(0),
    borderRadius: "15px",
    boxShadow: "none",
    position: "relative",
  },
  linktxt: {
    textDecoration: "none",
    color: "#2170ff",
  },
}));

const Success = (props) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(0);

  useEffect(() => {
    if (props.successMessage) {
      setNotify({
        isOpen: true,
        message: props.successMessage,
        type: "success",
      });
    }
  }, []);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          <Grid item>
            {/* <Paper className={classes.paper} > */}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h3" variant="h5">
                  {props.successMessage}
                </Typography>

                <Typography component="h6" variant="subtitle2">
                  Login to Access ....
                  <Typography variant="caption" gutterBottom>
                    <Links
                      to="/signin"
                      variant="caption"
                      className={classes.linktxt}
                    >
                      Sign In
                    </Links>
                  </Typography>
                </Typography>
              </div>
              {/* <Box mt={8}>
          <Copyright />
        </Box> */}
            </Container>
          </Grid>
          <Hidden only="sm">
            <Grid item>
              <Paper className={classes.paperRight}>
                <div className={classes.logo}>
                  <img src={logopng} alt="Logo" width="100%"></img>
                </div>
                <div className={classes.logosvg}>
                  <img src={logo} alt="Logo" width="100%"></img>
                </div>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    successMessage: state.auth.successMessage,
  };
};

export default connect(mapStateToProps)(Success);
