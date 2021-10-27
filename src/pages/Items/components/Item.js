import { Chip, ClickAwayListener, Divider, Fab, Grow, InputLabel, makeStyles, MenuItem, MenuList, Paper, Popper, Select, TableCell, TableRow } from '@material-ui/core'
import React from 'react';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
    // searchInput: {
    //   width: "30%",
    //   border: "0px solid #ccc",
    //   [`& fieldset`]: {
    //     borderRadius: 10,
    //   },
    // },
    selectAction: {
      "& .MuiInputLabel-root": {
        display: "none",
      },
    },
    toolbars: {
      "& .MuiToolbar-gutters": {
        padding: "12px",
        margin: "0px",
      },
    },
    newButton: {
      position: "absolute",
      right: "10px",
    },
  
    // Forms
  
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
      "& .MuiDialogTitle-root": {
        padding: "1px",
      },
    },
    dialogTitle: {
      paddingRight: "0px",
      fontWeight: "600px",
    },
    dialog: {
      "& .MuiDialogContent-dividers ": {
        borderTop: "0px solid rgba(0, 0, 0, 0.12)",
        borderBottom: "0px solid rgba(0, 0, 0, 0.12)",
      },
    },
    // Header
  
    root: {
      backgroundColor: "transparent",
    },
    pageHeader: {
      padding: theme.spacing(1),
      display: "flex",
      marginBottom: theme.spacing(0),
    },
    pageIcon: {
      display: "inline-block",
      padding: theme.spacing(2),
      color: "#2170ff",
    },
    pname: { color: theme.palette.primary.main, fontWeight: "bold" },
    pdesc: { opacity: "0.5" },
  
    pageTitle: {
      paddingLeft: theme.spacing(2),
      "& .MuiTypography-subtitle2": {
        opacity: "0.6",
      },
    },
    warning: { backgroundColor: theme.palette.primary.warning },
    actionbtnRight: {
      position: "relative",
      top: 10,
      right: 10,
    },
    menupos: {
      // position: "relative",
      // right: "-18px",
    },
  }));
  

export default function Item(props) {
    const classes = useStyles();
    
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
    <>
               <TableCell>

                      
</TableCell>
<TableCell>
  {props.item.image ? (
    <img
      src={props.item.image}
      alt=""
      width="40"
      height="40"
    ></img>
  ) : (
    <img
      src={
        window.location.origin +
        "/assets/no_image_3x4.svg"
      }
      alt=""
      width="40"
      height="40"
    ></img>
  )}
</TableCell>
<TableCell>
  <div className={classes.pname}>
    {" "}
    {props.item.project_name}
  </div>
  <div className={classes.pdesc}>
    {" "}
    {props.item.description}{" "}
  </div>
</TableCell>
<TableCell>{props.item.startDate}</TableCell>
<TableCell>{props.item.location}</TableCell>
<TableCell>{props.item.project_manager}</TableCell>
<TableCell>{props.item.department}</TableCell>
<TableCell>
  <InputLabel id="demo-simple-select-standard-label">
    Age
  </InputLabel>
  <Select
    labelId="demo-simple-select-standard-label"
    id="demo-simple-select-standard"
    value={age}
    onChange={handleChange}
    hiddenLabel
    disableUnderline
    variant="standard"
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={1} selected>
      {" "}
      <Chip label="Active" color="primary" />
    </MenuItem>
    <MenuItem value={2}>
      {" "}
      <Chip label="Completed" color="secondary" />
    </MenuItem>
    <MenuItem value={3}>
      {" "}
      <Chip
        label="Archieved"
        color="warning"
        className={classes.warning}
      />
    </MenuItem>
    <MenuItem value={4}>
      {" "}
      <Chip label="Draft" color="success" />
    </MenuItem>
  </Select>

  {/* <Controls.ActionButton
color="primary"
onClick={() => {
openInPopup(item);
}}
>
<EditOutlinedIcon fontSize="small" />
</Controls.ActionButton>
<Controls.ActionButton
color="secondary"
onClick={() => {
setConfirmDialog({
isOpen: true,
title: "Are you sure to delete this record?",
subTitle: "You can't undo this operation",
onConfirm: () => {
  onDelete(item.id);
},
});
}}
>
<CloseIcon fontSize="small" />
</Controls.ActionButton> */}
</TableCell>
<TableCell>


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
key={Math.random()}
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
// key={Math.random()}
>
<MenuItem
  onClick={handleClose}
  className={classes.menuItemtxt}
  // key={Math.random()}
>
  Edit Project
</MenuItem>{" "}
<MenuItem
  onClick={handleClose}
  className={classes.menuItemtxt}
  key={Math.random()}
>
  Download
</MenuItem>{" "}
<MenuItem
  onClick={handleClose}
  className={classes.menuItemtxt}
  key={Math.random()}
>
  Archieve
</MenuItem>
<Divider />
<MenuItem
  onClick={handleClose}
  className={classes.menuItemtxtdel}
  key={Math.random()}
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
</TableCell>      </>
    )
}
