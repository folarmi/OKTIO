import React, { useEffect, useState, useMemo } from "react";
import ProjectForm from "./ProjectForm";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import Search from "@material-ui/icons/Search";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl from "@mui/material/FormControl";
import {
  Paper,
  makeStyles,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Box,
  Grid,
  Container,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
// import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
// import CloseIcon from "@material-ui/icons/Close";
import CloseIcon from "@mui/icons-material/Close";
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

//My imports
import Table from "../../components/Table";
import { getData } from "../../data/Tabledata";
import CustomSelect from "../../components/CustomSelect";
import Searchbar from "../../components/Searchbar";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "100%",
    border: "0px solid #ccc",
    [`& fieldset`]: {
      borderRadius: 6,
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
  wrapper: {
    borderRadius: "12px",
    padding: "0 12px",
    backgroundColor: "red",
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

const headCells = [
  { id: "id", label: "ID" },
  { id: "image", label: "Images" },
  { id: "project_name", label: "Name" },
  { id: "start", label: "category" },
  { id: "location", label: "Manufacture" },
  { id: "project_manager", label: "Model" },
  { id: "project_owner", label: "Unit" },
  { id: "actions", label: "Status", disableSorting: true },
  { id: "action", label: "Actions", disableSorting: true },
];

const ProjectList = React.forwardRef((props, ref) => {
  const classes = useStyles();
  // const AllProjects = useSelector((state) => state.projects);
  // console.log("AllProjects", AllProjects);
  // const { loading, projects } = AllProjects;
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [showFilterCategories, setShowFilterCategories] = useState(false);
  const [records, setRecords] = useState([]);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
      .get(`api/buyer/${props.auth.company_name}`)
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
  }, [dispatch]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  // const handleSearch = (e) => {
  //   let target = e.target;y
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value == "") return items;
  //       else
  //         return items.filter((x) =>
  //           x.fullName.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  const addOrEdit = (firstValues, resetForm) => {
    // if (firstValues.id === 0)
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

  //My imports
  const data = React.useMemo(() => getData(), []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Image",
        accessor: "image",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Manufacturer",
        accessor: "manufacturer",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "More",
        accessor: "longMenu",
      },
    ],
    []
  );

  return (
    <>
      <Paper elevation={0} square className={classes.wrapper}>
        <div className={classes.pageHeader}>
          <div style={{ width: "100%" }}>
            <Box sx={{ display: "flex", p: 0 }}>
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  className={classes.sectionText}
                >
                  Items
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
            <Paper className={classes.paper}>
              <Paper
                className={(classes.pageContent, classes.toolbars)}
                style={{ padding: "12px" }}
                elevation={0}
              >
                <Searchbar ifSortByLatest={false} />
                <Table columns={columns} data={data} />
              </Paper>
            </Paper>
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
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              New Item
            </Typography>
            <Controls.ActionButton
              color="secondary"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CloseIcon />
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
            <Typography
              variant="h6"
              component="div"
              className={classes.addLink}
              style={{ flexGrow: 1 }}
            >
              Add Document
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
