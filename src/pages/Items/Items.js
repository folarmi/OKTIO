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
import ProjectList from "./ProjectList";
import { Paper } from "@material-ui/core";
import clsx from "clsx";

// const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "#f2f2f2",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
 
}));

const Projects = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Appbars></Appbars>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <PageHeader
        title="Projects"
        subTitle="Projects"
         icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      /> */}
      
        <Container maxWidth="lg" className={classes.container} >
        
        
        <ProjectList /> 
                
              
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

export default withRouter(connect(mapStateToProps)(Projects));
