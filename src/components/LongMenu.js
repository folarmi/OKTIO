import React from "react";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const LongMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const MyOptions = ["Edit Item", "Delete"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#F7FAFC",
        borderRadius: "50%",
        border: "1px solid #2170FF",
        height: "50px",
        width: "50px",
      }}
    >
      <IconButton
        aria-label="more"
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="long-menu"
      >
        <MoreHorizIcon style={{ color: "#2170FF" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted onClose={handleClose} open={open}>
        {MyOptions.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LongMenu;
