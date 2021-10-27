import React from "react";
// import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
// import List from "@material-ui/core/List";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import { ListItems } from "./ListItems";
import SideMenu from "./SideMenu";
// import logo from "../assets/octioLogo.svg";
import user from "../assets/user.jpg";
import logopng from "../assets/dashboard_logo.png";
 
import { Search } from "@material-ui/icons";

// import Title from "./Title";
import { connect, useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import { isAuthenticated } from "../store/selectors/AuthSelectors";
import { withRouter } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Avatar,  ClickAwayListener, Grid, Grow, InputAdornment, MenuItem, MenuList, Popper } from "@material-ui/core";
// import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
// import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
// import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Controls from "./controls/Controls";

// function preventDefault(event) {
//   event.preventDefault();
// }
const drawerWidth = 215;
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Arial',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '15px 15px',
    textTransform: 'none',
    width: '100%',
    '&$selected': {
      backgroundColor: 'rgba(33, 137, 214, 0.14)',
      color: 'rgb(26, 88, 159)',
      '&:hover': {
        backgroundColor: 'rgba(33, 137, 214, 0.14)',
        color: 'rgb(26, 88, 159)',
      },
    },
  },
  selected: {},
   abRoot: {
    backgroundColor: "#ffffff",
  },
  searchInput: {
    width: "30%",
    border: "0px solid #ccc",
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background:
      "linear-gradient(0deg, rgba(51,54,204,1) 0%, rgba(33,112,255,1) 100%)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  // appBarSpacer: theme.mixins.toolbar,
  // content: {
  //   flexGrow: 1,
  //   height: "100vh",
  //   overflow: "auto",
  //   background: "#f2f2f2",
  // },
  // container: {
  //   paddingTop: theme.spacing(4),
  //   paddingBottom: theme.spacing(4),
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   display: "flex",
  //   overflow: "auto",
  //   flexDirection: "column",
  // },
  fixedHeight: {
    height: 215,
  },
  logo: { position: "absolute", left: "35px", top: "15px" },
  // buttonColor:{ backgroundColor:"#fff"}
  
  MuiToggleButtonGroupRoot :{
    "& .MuiToggleButton-root.Mui-selected": {
          backgroundColor:"#fff",
        },
  },
  menupos:{
    position: "absolute",
    right: "-18px"
  }
 }));

const Appbar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSearch = (e) => {
    // let target = e.target;
    // setFilterFn({
    //   fn: (items) => {
    //     if (target.value == "") return items;
    //     else
    //       return items.filter((x) =>
    //         x.fullName.toLowerCase().includes(target.value)
    //       );
    //   },
    // });
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  function onLogout() {
    dispatch(logout(props.history));
  }
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //   menu Start
  const [openmenu, setOpenmenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenmenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenmenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenmenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openmenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openmenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openmenu;
  }, [openmenu]);


  // menu End
  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        classes={{
          root: classes.abRoot,
        }}
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Controls.Input
            placeholder="Search for anything"
            className={classes.searchInput}
          
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Typography
            component="h1"
            variant="h6"
            color="primary"
            noWrap
            className={classes.title}
          >
            {/* Projects  */}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon htmlColor="#000000"/>
            </Badge>
          </IconButton>
          {/* <button onClick={onLogout}>Logout</button> */}

          <div>
          <Avatar 
          ref={anchorRef}
          aria-controls={openmenu ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          alt="Remy Sharp" src={user} className={classes.small} />
        {/* <Button
          ref={anchorRef}
          aria-controls={openmenu ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button> */}
        <Popper open={openmenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              className={classes.menupos}
            >
              <Paper >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={openmenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem> <Divider />
                    <MenuItem onClick={handleClose}>My account</MenuItem> <Divider />
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                     
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <img
          src={logopng}
          alt="Logo"
          width="124"
          className={classes.logo}
        ></img>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SideMenu></SideMenu>
        
        
        <Divider />
        {/* <List>{secondaryListItems}</List> */}

        <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item  >
        <ToggleButtonGroup variant ="outlined" 
        size="small" value={alignment} exclusive onChange={handleChange}>
          <ToggleButton value="left"  >
           Buyer
          </ToggleButton>
          <ToggleButton value="center"  >
          Supplier 
          </ToggleButton>
          
        </ToggleButtonGroup>
      </Grid>
      </Grid>
      </Drawer>

     
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};
export default withRouter(connect(mapStateToProps)(Appbar));
