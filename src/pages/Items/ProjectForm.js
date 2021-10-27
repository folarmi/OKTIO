import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";
import { makeStyles } from "@material-ui/styles";
import Formsteps from "../../components/Formsteps";
import { useDispatch } from "react-redux";
import { addFirstForm } from "../../store/actions/ProjectActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import Popup from "../../components/Popup";
// import ProjectFormstep2 from "./ProjectFormstep2";

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

const initialFValues = {
  item_name: "",
  manufacturer: "",
  notes: "",
  unit: "",
  category: "",
  model: "",
  group_name: "",
  tags: "",
};

const useStyles = makeStyles((theme) => ({
  formPart1: {
    "& .MuiFormControl-root": {
      width: "90%",
    },
  },
  Button: {
    padding: ".4rem 3rem",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
  },
}));

export default function EmployeeForm(props) {
  const [currency, setCurrency] = React.useState("EUR");
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

    if ("item_name" in fieldValues)
      temp.item_name = fieldValues.item_name ? "" : "This field is required.";

    if ("manufacturer" in fieldValues)
      temp.manufacturer = fieldValues.manufacturer
        ? ""
        : "This field is required.";

    if ("notes" in fieldValues)
      temp.notes = fieldValues.notes ? "" : "This field is required.";

    if ("unit" in fieldValues)
      temp.unit = fieldValues.unit ? "" : "This field is required.";

    if ("category" in fieldValues)
      temp.category = fieldValues.category ? "" : "This field is required.";

    if ("model" in fieldValues)
      temp.model = fieldValues.category ? "" : "This field is required.";

    if ("group_name" in fieldValues)
      temp.group_name = fieldValues.group_name ? "" : "This field is required.";

    if ("model" in fieldValues)
      temp.model = fieldValues.model ? "" : "This field is required.";

    if ("tags" in fieldValues)
      temp.tags = fieldValues.tags ? "" : "This field is required.";
    // if ("email" in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email)
    //     ? ""
    //     : "Email is not valid.";
    // if ("mobile" in fieldValues)
    //   temp.mobile =
    //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("location" in fieldValues)
      temp.location =
        fieldValues.location.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

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

  return (
    <>
      {/* className={classes.formPart1} */}
      <Form onSubmit={handleSubmit}>
        <Formsteps step1></Formsteps>
        {/* <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div> */}
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Controls.Input
              name="item_name"
              label="Item Name"
              fullWidth
              value={values.item_name}
              onChange={handleInputChange}
              error={errors.item_name}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              name="manufacturer"
              label="Manufacturer"
              value={values.manufacturer}
              onChange={handleInputChange}
              error={errors.manufacturer}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Project Description"
              name="notes"
              value={values.notes}
              onChange={handleInputChange}
              error={errors.notes}
              multiline="multiline"
              maxRows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              name="unit"
              label="Unit"
              value={values.unit}
              onChange={handleInputChange}
              error={errors.unit}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.category}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="model"
              label="Model"
              value={values.model}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.model}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="group_name"
              label="Group Name"
              value={values.location}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.group_name}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              name="tags"
              label="Tags"
              value={values.location}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.tags}
            />
          </Grid>
        </Grid>
        <Box
          display="flex"
          p={1}
          bgcolor="background.paper"
          style={{ marginTop: "1rem" }}
        >
          <Box p={0} flexGrow={1}>
            <Controls.Button
              text="Cancel"
              disableElevation
              onClick={() => {
                setOpenPopup(false);
              }}
              style={{ backgroundColor: "#E2F2FF", color: "#2170FF" }}
              color="default"
              className={classes.Button}
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
              type="submit"
              disableElevation
              text="Next"
              className={classes.Button}
            />
          </Box>
          <Box p={0}></Box>
        </Box>
      </Form>
      {/* <Popup
        title="Create Project222"
        openPopupstep2={openPopupstep2}
        setOpenPopupstep2={setOpenPopupstep2}
      >
        <EmployeeFormstep2 recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup> */}
    </>
  );
}
