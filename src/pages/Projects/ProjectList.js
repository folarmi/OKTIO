import React, { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import {
  Paper,
  makeStyles,
  Toolbar,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Box,
  Grid,
  Container,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
// import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { connect, useDispatch, useSelector } from "react-redux";
import { addSecondForm } from "../../store/actions/ProjectActions";
import axiosInstance from "../../services/AxiosInstance";
import {
  CONFIRMED_GET_PROJECTS,
  GET_PROJECTS_FAIL,
} from "../../store/constant/projectConstants";
import ProjectFormstep2 from "./ProjectFormstep2";
import ProjectCard from "./components/ProjectCard";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import CustomSelect from "../../components/CustomSelect";
import { ProjectRecords } from "../../data/ProjectCardRecords";
import Searchbar from "../../components/Searchbar";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "30%",
    border: "0px solid #ccc",
    [`& fieldset`]: {
      borderRadius: 10,
    },
  },
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
}));

const ProjectList = React.forwardRef((props, ref) => {
  const classes = useStyles();
  // const AllProjects = useSelector((state) => state.projects);
  // const { loading, projects } = AllProjects;
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(ProjectRecords);
  const [showFilterCategories, setShowFilterCategories] = useState(false);
  const toggleFilterCategory = () => {
    setShowFilterCategories(!showFilterCategories);
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  React.useImperativeHandle(ref, () => ({
    foo() {
      alert("Hello world");
    },
  }));

  const dispatch = useDispatch();
  const { editData } = props;
  console.log("editData", editData);

  const getAllProjectsAction = () => {
    axiosInstance
      .get(`api/buyer/${props.auth.user.company_name}`)
      .then((response) => {
        if (response.data.responseCode === "00") {
          let allProjects = response.data.project;
          setRecords(allProjects);

          dispatch({
            type: CONFIRMED_GET_PROJECTS,
            payload: allProjects,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_PROJECTS_FAIL });
      });
  };
  useEffect(() => {
    getAllProjectsAction();
  }, [dispatch, editData]);

  // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  //   useTable(records, headCells, filterFn);

  const addOrEdit = (firstValues, resetForm) => {
    // if (firstValues.id === 0)
    console.log("addOr edit", firstValues);
    dispatch(addSecondForm(firstValues));
    // else
    // employeeService.updateEmployee(firstValues);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup2(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
    getAllProjectsAction();
  };

  const [age, setAge] = React.useState("1");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          <div style={{ width: "100%" }}>
            <Box sx={{ display: "flex", p: 0 }}>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.sectionText}
                >
                  Projects
                </Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                <Stack direction="row">
                  <Controls.Button
                    variant="contained"
                    className={classes.Button}
                    text="Filter"
                    onClick={toggleFilterCategory}
                    startIcon={
                      <FilterListSharpIcon style={{ color: "#2170FF" }} />
                    }
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#2170FF",
                    }}
                  />
                  <Controls.Button
                    text="Add Project"
                    className={classes.Button}
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setOpenPopup(true);
                      setRecordForEdit(null);
                    }}
                  />
                </Stack>
              </Box>
            </Box>
            {showFilterCategories && (
              <Paper elevation={1} className={classes.filterDiv}>
                <Stack direction="row" spacing={1}>
                  <CustomSelect label="Category" />
                  <CustomSelect label="Model" />
                  <CustomSelect label="Manufacturer" />
                  <CustomSelect label="Status" />
                  <Box p={0} style={{ marginTop: "1rem" }}>
                    <Controls.Button
                      text="Clear"
                      disableElevation
                      color="default"
                      className={classes.Button}
                    />
                  </Box>
                  <Box p={0} style={{ marginTop: "1rem" }}>
                    <Controls.Button
                      type="submit"
                      disableElevation
                      text="Apply Filter"
                      className={classes.Button}
                    />
                  </Box>
                </Stack>
              </Paper>
            )}
          </div>
        </div>
      </Paper>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="project-card-container">
              <div
                className={(classes.pageContent, classes.toolbars)}
                style={{ padding: "12px" }}
                elevation={0}
              >
                <Toolbar>
                  <Searchbar />
                </Toolbar>

                <Grid container justifyContent="left" spacing={4}>
                  {records.map((item) => (
                    <Grid key={item} item xs={3}>
                      <ProjectCard
                        project={item}
                        sx={{ height: 140, width: 100 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* Form 1 */}
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              component="div"
              style={{ flexGrow: 1, fontWeight: "600", fontSize: "16px" }}
            >
              New Project
            </Typography>
            <Controls.ActionButton
              color="secondary"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CancelIcon
                style={{
                  color: "#424143",
                  backgroundColor: "white",
                  border: "0px",
                  outline: "none",
                }}
              />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <ProjectForm
            recordForEdit={recordForEdit}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
          />
        </DialogContent>
      </Dialog>

      {/* Form 2 */}

      <Dialog
        open={openPopup2}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Create Project
            </Typography>

            <Controls.ActionButton
              color="secondary"
              onClick={() => {
                setOpenPopup2(false);
              }}
            >
              <CloseIcon />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {/* {children} */}
          <ProjectFormstep2
            // openPopup={openPopup}
            // setOpenPopup={setOpenPopup}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </DialogContent>
      </Dialog>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    editData: state.projects.editData,
  };
};
export default connect(mapStateToProps)(ProjectList);
