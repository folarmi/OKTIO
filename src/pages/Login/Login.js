import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
import Loader from "../../components/Loader/Loader";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as Links } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import logo from "../../assets/octioLogo.svg";
import logopng from "../../assets/logotxt.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { connect, useDispatch } from "react-redux";
// import CloseIcon from "@material-ui/icons/Close";
// import Notification from "../../components/Notification";
import { Snackbar } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

import { Alert } from "@material-ui/lab";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/authActions";

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
  logo: {
    background: "rgb(236 236 236 / 25%)",
    padding: "30px 70px",
    opacity: 0.8,
    borderRadius: "50px 0",
    position: "absolute",
    left: "-80px",
    top: "-30px",
    width: "270px",
    // opacity: "0.6",
  },
  logosvg: {
    marginTop: "100px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    border: "0px solid #ccc",
    borderRadius: "30px",
    textTransform: "none",
  },
  linktxt: {
    textDecoration: "none",
    color: "#2170ff",
  },
  normal: {
    textDecoration: "none",
    fontSize: "11px",
    fontWeight: "bold",
    opacity: "0.7",
  },

  textField: {
    border: "0px solid #ccc",
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },

   
  txtcheckbox: {
    "& .MuiTypography-body1": {
      fontSize: "13px",
    },
  },
  forgot: {
    display: "flex",
    padding: "10px 0 0 0",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    color: "white",
  },
  error: {
    color: "red",
    fontSize: "11px",
    paddingLeft: "43px",
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: { password: "" } };
  const [errors, setErrors] = useState(errorsObj);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const userDetails = localStorage.getItem("userDetails");
  if(!userDetails)
  localStorage.setItem("guest", "true");

  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(0);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (!email) {
      errorObj.email = "Email is required";
      error = true;
    }
    if (email !== "") {
      error = /$^|.+@.+..+/.test(email) ? false : true;

      if (error) errorObj.nemail = "Invalid Email";
    }
    if (!password.password) {
      errorObj.password.password = "Password  is required ";
      error = true;
    }

    setErrors(errorObj);

    if (error) return;
    dispatch(loadingToggleAction(true));

    dispatch(loginAction(email, password.password, props.history));
    if (props.errorMessage) {
      setNotify({
        isOpen: true,
        message: props.errorMessage,
        type: "error",
      });
    }
    if (props.successMessage) {
      setNotify({
        isOpen: true,
        message: props.successMessage,
        type: "success",
      });
    }
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>
              {/* <Paper className={classes.paper} > */}
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Login to your Account
                  </Typography>
                  {props.showLoading && <Loader />}

                  <Typography
                    component="h6"
                    variant="subtitle2"
                    className={classes.normal}
                  >
                    Enter to continue and explore within your grasp
                  </Typography>
                  <form className={classes.form} onSubmit={onLogin} noValidate>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      margin="dense"
                      required
                      fullWidth
                      id="email"
                      placeholder="Email Address"
                      name="email"
                      autoComplete=""
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className={classes.error}>{errors.email}</div>
                    )}
                    {errors.nemail && (
                      <div className={classes.error}>{errors.nemail}</div>
                    )}
                    <TextField
                      variant="outlined"
                      className={classes.textField}
                      margin="dense"
                      required
                      fullWidth
                      name="password"
                      // type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      type={password.showPassword ? "text" : "password"}
                      onChange={handlePasswordChange("password")}
                      value={password.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="primary" fontSize="small" />
                          </InputAdornment>
                        ),

                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {password.showPassword ? (
                                <Visibility color="primary" fontSize="small" />
                              ) : (
                                <VisibilityOff
                                  color="primary"
                                  fontSize="small"
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.password.password && (
                      <div className={classes.error}>
                        {errors.password.password}
                      </div>
                    )}
                    <Grid container alignContent="center">
                      <Grid item xs>
                        <FormControlLabel
                          className={classes.txtcheckbox}
                          control={
                            <Checkbox value="remember" color="primary" />
                          }
                          label="Remember Me"
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          className={classes.forgot}
                        >
                          <Links
                            to="/forgotpassword"
                            className={classes.linktxt}
                          >
                            Forgot Password?
                          </Links>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Login to Continue
                    </Button>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography variant="caption" gutterBottom>
                          Don't have an account? &nbsp;
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          <Links
                            to="/signup"
                            variant="caption"
                            className={classes.linktxt}
                          >
                            Sign up
                          </Links>
                        </Typography>
                      </Grid>
                    </Grid>
                  </form>
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
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
      <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity={notify.type} onClose={handleClose}>
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
