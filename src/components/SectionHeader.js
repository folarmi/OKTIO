import { useState } from "react";
import { makeStyles, Box, Typography, Paper } from "@material-ui/core";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import AddIcon from "@material-ui/icons/Add";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Controls from "./controls/Controls";
import CustomSelect from "./CustomSelect";

const useStyles = makeStyles((theme) => ({
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
  Button: {
    padding: ".4rem 2rem",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
  },
  sectionText: {
    fontWeight: "600",
    fontSize: "24px",
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
  menupos: {
    // position: "relative",
    // right: "-18px",
  },
  filterDiv: {
    width: "100%",
    padding: "1rem",
    margin: ".3rem",
  },
  searchBar: {
    width: "100%",
    margin: "1rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  sort: {
    display: "flex",
  },
}));

const SectionHeader = ({
  sectionTitle,
  addText,
  showFilterCategories,
  setShowFilterCategories,
}) => {
  const classes = useStyles();

  //   const [showFilterCategories, setShowFilterCategories] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const toggleFilterCategory = () => {
    setShowFilterCategories(!showFilterCategories);
  };

  return (
    <div className={classes.pageHeader}>
      <div style={{ width: "100%" }}>
        <Box sx={{ display: "flex", p: 0 }}>
          <Box sx={{ p: 1, flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              className={classes.sectionText}
            >
              {sectionTitle}
            </Typography>
          </Box>
          <Box sx={{ p: 1 }}>
            <Stack direction="row">
              <Controls.Button
                variant="contained"
                className={classes.Button}
                text="Filter"
                onClick={toggleFilterCategory}
                startIcon={<FilterListSharpIcon style={{ color: "#2170FF" }} />}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#2170FF",
                }}
              />
              <Controls.Button
                text="Add Item"
                className={classes.Button}
                variant="contained"
                startIcon={<AddIcon />}
                endIcon={<ArrowDropDownIcon />}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Stack>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SectionHeader;
