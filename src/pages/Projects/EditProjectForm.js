import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";
import { makeStyles } from "@material-ui/styles";
import Formsteps from "../../components/Formsteps";
import { useDispatch } from "react-redux";
import { addFirstForm } from "../../store/actions/ProjectActions";
// import Popup from "../../components/Popup";
// import ProjectFormstep2 from "./ProjectFormstep2";

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

const initialFValues = {
  project_name: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
};

const useStyles = makeStyles((theme) => ({
  formPart1: {
    "& .MuiFormControl-root": {
      width: "90%",
    },
  },
  Button: {
    padding: ".4rem 2rem",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
  },
}));

export default function EditProjectForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    recordForEdit,
    // openPopup,
    setOpenPopup,
    openPopup2,
    setOpenPopup2,
  } = props;
  //  const [openPopup, setOpenPopup] = (false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("project_name" in fieldValues)
      temp.project_name = fieldValues.project_name
        ? ""
        : "Project Name is required.";

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Description is required.";
    if ("location" in fieldValues)
      temp.location =
        fieldValues.location.length !== 0 ? "" : "Location is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  console.log("Project id", props);
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(addFirstForm(values));
      setOpenPopup2(true);
      resetForm();
      // setRecordForEdit(null);
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  console.log("Edit project form", values);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Formsteps step1></Formsteps>
        <Grid container>
          <Grid item xs={12} className={classes.formPart1}>
            <Controls.Input
              name="project_name"
              label="Project Name"
              value={values.project_name}
              onChange={handleInputChange}
              error={errors.project_name}
            />
            <Controls.Input
              label="Project Description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              multiline="multiline"
              maxRows={4}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.DatePicker
              name="startDate"
              label="Start Date"
              value={values.startDate}
              onChange={handleInputChange}
              format="DD-MM-YYYY"
            />
          </Grid>

          <Grid item xs={3}>
            <Controls.DatePicker
              name="endDate"
              label="End Date"
              value={values.endDate}
              onChange={handleInputChange}
              format="DD-MM-YYYY"
            />
          </Grid>
          <Grid item xs={6} p={1}>
            <Controls.Input
              name="location"
              label="Location"
              value={values.location}
              onChange={handleInputChange}
              error={errors.location}
            />
            {/* <Controls.Select
              name="location"
              label="Locations"
              value={values.location}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.location}
            /> */}
          </Grid>
        </Grid>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={0} flexGrow={1}>
            <Controls.Button
              text="Cancel"
              onClick={() => {
                setOpenPopup(false);
              }}
              color="default"
              disableElevation
              className={classes.Button}
              style={{
                backgroundColor: "#E2F2FF",
                color: "#2170FF",
              }}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              text="Save as Draft"
              disableElevation
              color="default"
              onClick={resetForm}
              className={classes.Button}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              disableElevation
              type="submit"
              text="Next"
              className={classes.Button}
              onClick={() => {}}
            />
          </Box>{" "}
          <Box p={0}></Box>
        </Box>
      </Form>
    </>
  );
}
