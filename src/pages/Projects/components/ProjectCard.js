import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  CardActionArea,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  MenuList,
  Popper,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fab from "@material-ui/core/Fab";

import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  pname: { color: theme.palette.primary.main, fontWeight: "bold" },
  pdesc: { lineHeight: "12px" },
  descBox: { minHeight: "55px" },

  showContent: { zIndex: "1", marginTop: "-73px" },

  showImg: {
    opacity: 0.1,
  },

  morebtn: {
    fontSize: "12px",
    textTransform: "none",
    color: theme.palette.primary.main,
  },
  sdate: { fontSize: "9px", opacity: "0.5" },
  date: { fontSize: "10px", fontWeight: "bold" },
  actionbtn: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  actionbtnRight: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  menupos: {
    position: "absolute",
    right: "-18px",
  },
  green: {
    backgroundColor: theme.palette.primary.green,
    color: "#5de3cf",
  },
  blue: {
    backgroundColor: theme.palette.primary.blue,
    color: "#69a1ff",
  },
  violet: {
    backgroundColor: theme.palette.primary.blue,
    color: "#7f83c1",
  },
  menuItemsbtn: { border: "0px solid #000" },
  menuItemtxt: { fontSize: "12px" },
  menuItemtxtdel: { fontSize: "12px", color: "red" },
}));
export default function ProjectCard(props, setOpenPopup, setRecordForEdit) {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const showdetails = () => {
    setShow(true);
  };
  const hidedetails = () => {
    setShow(false);
  };
  const [age, setAge] = React.useState("1");

  const handleChange = (event) => {
    setAge(event.target.value);
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
    if (event.key === "Tab") {
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
    <div>
      {" "}
      <Card
        sx={{ width: 400, height: 367 }}
        // onMouseOut={hidedetails}
        onMouseOver={showdetails}
      >
        <CardActionArea onMouseOut={hidedetails}>
          <CardMedia
            component="img"
            height="110"
            image={props.project.image}
            alt={props.project.project_name}
            className={show ? `${classes.showImg}` : ""}
          />
          {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            hiddenLabel
            disableUnderline
            variant="standard"
            className={classes.actionbtn}
          >
            <MenuItem value="" className={classes.menuItemsbtn}>
              <Chip label="None" color="grey" size="small" />
            </MenuItem>
            <MenuItem value={1} selected>
              {" "}
              <Chip label="Active" className={classes.green} size="small" />
            </MenuItem>
            <MenuItem value={2}>
              {" "}
              <Chip
                label="Completed"
                color="secondary"
                className={classes.blue}
                size="small"
              />
            </MenuItem>
            <MenuItem value={3}>
              {" "}
              <Chip label="Archieved" className={classes.violet} size="small" />
            </MenuItem>
            <MenuItem value={4}>
              {" "}
              <Chip label="Draft" color="success" size="small" />
            </MenuItem>
          </Select>

          <div className={classes.actionbtnRight}>
            <Fab color="white" aria-label="add" size="small" disableRipple>
              <MoreHorizIcon
                ref={anchorRef}
                aria-controls={openmenu ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                alt="Remy Sharp"
                className={classes.small}
                size="small"
              />
            </Fab>

            <Popper
              style={{ zIndex: 1 }}
              open={openmenu}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                  className={classes.menupos}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openmenu}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          // onClick={handleClose}
                          onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                          }}
                          className={classes.menuItemtxt}
                        >
                          Edit Project
                        </MenuItem>{" "}
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItemtxt}
                        >
                          Download
                        </MenuItem>{" "}
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItemtxt}
                        >
                          Archieve
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItemtxtdel}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <CardContent className={show ? `${classes.showContent}` : ""}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              {props.project.project_name}
            </Typography>
            <div className={classes.descBox}>
              <Typography
                variant="caption"
                color="text.secondary"
                className={classes.pdesc}
              >
                {props.project.description.substring(0, 85)}
              </Typography>

              {props.project.description.length >= 85 ? (
                <span>
                  <Button
                    size="small"
                    disableFocusRipple
                    disableRipple
                    className={classes.morebtn}
                  >
                    more
                  </Button>
                </span>
              ) : (
                ""
              )}
            </div>

            <div style={{ width: "100%" }}>
              <Box sx={{ display: "flex", pt: 1 }}>
                <Box sx={{ p: 0, order: 2, flexGrow: 1 }}>
                  <Typography className={classes.sdate}>Start Date</Typography>
                  <Typography className={classes.date}>
                    {props.project.startDate}
                  </Typography>
                </Box>
                <Box sx={{ p: 0, order: 3 }}>
                  <Typography className={classes.sdate}>End Date</Typography>
                  <Typography className={classes.date}>
                    {props.project.endDate}
                  </Typography>
                </Box>
              </Box>

              {show ? (
                <>
                  <Box sx={{ display: "flex", pt: 1 }}>
                    <Box sx={{ p: 0, order: 2, flexGrow: 1 }}>
                      <Typography className={classes.sdate}>
                        Location
                      </Typography>
                      <Typography className={classes.date}>
                        {props.project.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", pt: 1 }}>
                    <Box sx={{ p: 0, order: 2, flexGrow: 1 }}>
                      <Typography className={classes.sdate}>
                        Project Manager
                      </Typography>
                      <Typography className={classes.date}>
                        {props.project.project_manager}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 0, order: 3 }}>
                      <Typography className={classes.sdate}>
                        Project Owner
                      </Typography>
                      <Typography className={classes.date}>
                        {props.project.project_owner}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                ""
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
