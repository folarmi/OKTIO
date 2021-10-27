import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Appbars from "../../components/Appbar";
import { connect, useDispatch } from "react-redux";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

// import { logout } from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../store/selectors/AuthSelectors";
import Copyright from "../../components/Copyright";
import Employees from "./Employees";
import { Paper } from "@material-ui/core";
import clsx from "clsx";

// const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // abRoot: {
  //   backgroundColor: "#cccccc",
  // },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  // },
  // toolbarIcon: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: "0 8px",
  //   ...theme.mixins.toolbar,
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: "none",
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // drawerPaper: {
  //   position: "relative",
  //   whiteSpace: "nowrap",
  //   width: drawerWidth,
  //   background:
  //     "linear-gradient(0deg, rgba(51,54,204,1) 0%, rgba(33,112,255,1) 100%)",
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // drawerPaperClose: {
  //   overflowX: "hidden",
  //   transition: theme.transitions.create("width", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up("sm")]: {
  //     width: theme.spacing(9),
  //   },
  // },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "#f2f2f2",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  // fixedHeight: {
  //   height: 200,
  // },
  // logo: { position: "absolute", left: "35px", top: "15px" },
}));

const Rfx = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbars></Appbars>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
        <Container maxWidth="lg" className={classes.container}>
        
          <Grid container spacing={3}>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Employees />
              </Paper>
            </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* Recent Orders */}
            <Grid item xs={12}>
           
              <Paper className={classes.paper}>
                
                <Employees />
              </Paper>
            </Grid>
            {/* Users */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Users />
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(Rfx));
