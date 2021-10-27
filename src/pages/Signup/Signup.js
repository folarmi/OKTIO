import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Link from "@material-ui/core/Link";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import Input from "@material-ui/core/Input";
// import Notification from "../../components/Notification";
// import Avatar from "@material-ui/core/Avatar";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/octioLogo.svg";
import logopng from "../../assets/logotxt.png";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as Links } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, connect } from "react-redux";
import { Hidden, Paper, Snackbar, Tooltip } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import countries from "../../assets/countries.json";
import {
  signupAction,
  loadingToggleAction,
} from "../../store/actions/authActions";
import Loader from "../../components/Loader/Loader";
import ReCAPTCHA from "react-google-recaptcha";
import LanguageIcon from "@material-ui/icons/Language";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left 280px",
    // backgroundAttachment: "fixed",
    backgroundImage: `url(${logo})`,
  },
  paper: {
    marginTop: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 680,
    borderRadius: "15px",
  },
  linktxt: {
    textDecoration: "none",
    color: "#2170ff",
  },
  linktxt2: {
    textDecoration: "none",
    color: "#2170ff",
    textTransform:"uppercase",
    fontWeight:"bold",
    fontSize:"12px",
    paddingLeft: "20px",

  },
  backtxt: {
    textDecoration: "none",
    color: "#2170ff",
    fontSize: "12px",
    fontWeight: "bold",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "30px",
    textTransform: "none",
  },
  righttxt: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "11px",
    fontWeight: "bold",
    opacity: "0.8",
  },
  textField: {
    border: "0px solid #ccc",
    [`& fieldset`]: {
      borderRadius: 30,
    },
  },

  arrowIcon: { fontSize: "14px" },
  input: {
    color: "white",
  },
  formControl: {
    minWidth: "100%",

    "& .MuiOutlinedInput-root": {
      borderRadius: "36px",
      height: "39px",
      marginTop: "9px",
    },
  },
  error: {
    color: "red",
    fontSize: "11px",
    paddingLeft: "43px",
  },
  success: {
    color: "green",
    fontSize: "11px",
    padding: "5px",
    margin: "5px",
    border: "1px solid green",
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
  placeholder: {
    color: "#acacac"
  },
  signuptxt: { fontWeight: "bold", opacity: "0.8" },
  line: {borderLeft: "2px solid #cccccc"},
  selectAdornment: {
    "& .MuiButtonBase-root": {
      // position: "absolute",
      padding: 0,
      left: "0px",
      top: "calc(50% - 0px)",
    },
  },
}));

// export default function Signup(props) {
const Signup = (props) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [country, setCountry] = useState("");
  // const [cpassword, setCpassword] = useState("");

  let errorsObj = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    nemail: "",
    companyname: "",
    country: "",
    password: { password: "" },
    cpassword: "",
    passwordnotmatch: "",
    passwordNumber: "",
    passwordLower: "",
    passwordUpper: "",
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState(errorsObj);
  const [spacing, setSpacing] = React.useState(0);
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [cpassword, setCpassword] = useState({
    cpassword: "",
    showCPassword: false,
  });

  const [vcaptcha, setVaptcha] = useState(false);

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
    // setCpassword({ ...cpassword, showCPassword: !cpassword.showCPassword });
  };
  const handleClickShowCPassword = () => {
    setCpassword({ ...cpassword, showCPassword: !cpassword.showCPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleCPasswordChange = (prop) => (event) => {
    setCpassword({ ...cpassword, [prop]: event.target.value });
  };
  const Placeholder = ({ children }) => {
     
    return <div className={classes.placeholder}>{children}</div>;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  const onChange = () => {
    setVaptcha(true);
  };

  function onSignUp(e) {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (!firstName) {
      errorObj.firstName = "First name is required";
      error = true;
    } else if (firstName.length < 3) {
      errorObj.firstName = "Minimun 3 Charecter required";
      error = true;
    }
    if (!lastName) {
      errorObj.lastName = "Last name is required";
      error = true;
    } else if (lastName.length < 3) {
      errorObj.lastName = "Minimun 3 Charecter required";
      error = true;
    }
    if (!role) {
      errorObj.role = "Position is required";
      error = true;
    }

    if (!email) {
      errorObj.email = "Email is required";
      error = true;
    }
    if (email !== "") {
      error = /$^|.+@.+..+/.test(email) ? false : true;

      if (error) errorObj.nemail = "Invalid Email";
    }
    if (!companyname) {
      errorObj.companyname = "Company Name is required ";
      error = true;
    }
    if (!country) {
      errorObj.country = "Country Name is required ";
      error = true;
    }

    if (!password.password) {
      errorObj.password.password = "Password  is required ";
      error = true;
    }
    if (password.password.length < 8) {
      errorObj.password.passwordlength = "Password  must be 8 charecter ";
      error = true;
    }

    if (password.password !== "") {
      error = /[0-9]/.test(password.password) ? false : true;

      if (error)
        errorObj.password.passwordNumber = "Password  must be 1 Number ";
    }
    if (password.password !== "") {
      error = /[a-z]/.test(password.password) ? false : true;

      if (error)
        errorObj.password.passwordLower =
          "Password  must be 1 Lowercase letter ";
    }

    if (password.password !== "") {
      error = /[A-Z]/.test(password.password) ? false : true;

      if (error)
        errorObj.password.passwordUpper =
          "Password  must be 1 Uppercase letter ";
    }

    if (!cpassword) {
      errorObj.cpassword = "Confirm Password  is required ";
      error = true;
    }
    if (cpassword.cpassword !== password.password) {
      errorObj.passwordnotmatch = " Password not matched ";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;

    dispatch(loadingToggleAction(true));
    dispatch(
      signupAction(
        firstName,
        lastName,
        role,
        email,
        companyname,
        country,
        password.password,
        props.history
      )
    );
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
    <Grid
      container
      justifyContent="center"
      spacing={spacing}
      className={classes.body}
    >
      <Grid item>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            {props.showLoading && <Loader />}
            <form className={classes.form} onSubmit={onSignUp} noValidate>
              <Grid container spacing={1}>
                <Grid container justifyContent="flex-start">
                  <Grid item>
                    <Links
                      to="/signin"
                      variant="body1"
                      className={classes.backtxt}
                    >
                      <ArrowBackIosIcon
                        color="primary"
                        className={classes.arrowIcon}
                      />
                      Go Back
                    </Links>
                  </Grid>
                </Grid>
                <Grid item sm={6}>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontWeight="fontWeightBold"
                    m={1}
                    className={classes.signuptxt}
                  >
                    Manage your tenders and Negociate with auctions
                  </Typography>
                </Grid>
                {/* <Grid item sm={1} justifyContent="flex-center">
                  <Divider orientation="vertical" />
                </Grid> */}
                <Grid
                  container
                  sm={6}
                  // justifyContent="flex-center"
                  className={classes.righttxt}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.line}
                >
                  {/* <Grid>
                  <Divider orientation="vertical" />
                  </Grid> */}
                  <Grid   justifyContent="center"
                  alignItems="center" >
                  <Typography className={classes.righttxt}>
                    No credit cards required
                  </Typography>
                  <Links
                    to="/signup"
                    variant="caption"
                    className={classes.linktxt2}
                  >
                    14 days free trial
                  </Links>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    placeholder="First Name"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <div className={classes.error}>{errors.firstName}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    autoComplete="lname"
                    className={classes.textField}
                    margin="dense"
                    placeholder="Last Name"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <div className={classes.error}>{errors.lastName}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    margin="dense"
                    autoComplete="role"
                    name="role"
                    variant="outlined"
                    required
                    fullWidth
                    id="role"
                    placeholder="Position"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CardTravelIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  {errors.role && (
                    <div className={classes.error}>{errors.role}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    className={classes.textField}
                    margin="dense"
                    type="email"
                    placeholder="Email"
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
                  />{" "}
                  {errors.email && (
                    <div className={classes.error}>{errors.email}</div>
                  )}
                  {errors.nemail && (
                    <div className={classes.error}>{errors.nemail}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="companyname"
                    name="companyname"
                    autoComplete="companyname"
                    placeholder="Company Name"
                    className={classes.textField}
                    margin="dense"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                  />
                  {errors.companyname && (
                    <div className={classes.error}>{errors.companyname}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <Select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      displayEmpty
                      className={classes.selectEmpty}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          className={classes.selectAdornment}
                        >
                          <IconButton>
                            <Tooltip title="tooltip text">
                              <LanguageIcon color="primary" fontSize="small" />
                            </Tooltip>
                          </IconButton>
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="" disabled >
                      <Placeholder>Country</Placeholder>
                      </MenuItem>

                      {countries.map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                      {/* <MenuItem value="UAE">UAE</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="us">United States</MenuItem> */}
                    </Select>
                    {/* <FormHelperText>Placeholder</FormHelperText> */}
                  </FormControl>
                  {errors.country && (
                    <div className={classes.error}>{errors.country}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    value={password.password}
                    onChange={handlePasswordChange("password")}
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
                              <VisibilityOff color="primary" fontSize="small" />
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
                  {errors.password.passwordlength && (
                    <div className={classes.error}>
                      {errors.password.passwordlength}
                    </div>
                  )}
                  {errors.password.passwordNumber && (
                    <div className={classes.error}>
                      {errors.password.passwordNumber}
                    </div>
                  )}
                  {errors.password.passwordLower && (
                    <div className={classes.error}>
                      {errors.password.passwordLower}
                    </div>
                  )}
                  {errors.password.passwordUpper && (
                    <div className={classes.error}>
                      {errors.password.passwordUpper}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="cpassword"
                    // type="password"
                    type={cpassword.showCPassword ? "text" : "password"}
                    id="password"
                    placeholder="Confirm Password"
                    autoComplete="current-password"
                    className={classes.textField}
                    margin="dense"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowCPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {cpassword.showCPassword ? (
                              <Visibility color="primary" fontSize="small" />
                            ) : (
                              <VisibilityOff color="primary" fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // value={cpassword}
                    value={cpassword.cpassword}
                    // onChange={(e) => setCpassword(e.target.value)}
                    onChange={handleCPasswordChange("cpassword")}
                  />
                  {errors.cpassword && (
                    <div className={classes.error}>{errors.cpassword}</div>
                  )}
                  {errors.passwordnotmatch && (
                    <div className={classes.error}>
                      {errors.passwordnotmatch}
                    </div>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!vcaptcha}
                  >
                    Create Account
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography variant="caption" gutterBottom>
                    By Clicking the "Create Account" button, I expressly agree
                    to the Oktio &nbsp;
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    <Links
                      to="/signup"
                      variant="caption"
                      className={classes.linktxt}
                    >
                      Terms of Use
                    </Links>
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    &nbsp; and understand that my account information will be
                    used according to the Oktio &nbsp;
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    <Links
                      to="/signup"
                      variant="caption"
                      className={classes.linktxt}
                    >
                      Privacy Policy
                    </Links>
                  </Typography>
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
                  {props.successMessage}
                </Alert>
              </Snackbar>
            </form>
          </div>
          {/* <Box mt={5}>
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
            {/* <div className={classes.logosvg}>
              <img src={logo} alt="Logo" width="80%"></img>
            </div> */}
          </Paper>
        </Grid>
      </Hidden>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Signup);
