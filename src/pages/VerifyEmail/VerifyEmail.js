import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { email_verification } from "../../store/actions/authActions";
import logo from "../../assets/octioLogo.svg";
import logopng from "../../assets/logo.png";
import { Link as Links } from "react-router-dom";
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

const VerifyEmail = (props) => {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(0);
  let { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(email_verification(token));
  }, [token, dispatch]);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          <Grid item>
            {/* <Paper className={classes.paper} > */}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  {props.emaiVerify}
                </Typography>

                <Typography component="h6" variant="subtitle2">
                  Login to Access ....
                  <Typography variant="caption" gutterBottom>
                    <Links
                      to="/signin"
                      variant="caption"
                      className={classes.linktxt}
                    >
                      Signin
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
    emaiVerify: state.auth.emaiVerify,
  };
};

export default connect(mapStateToProps)(VerifyEmail);
