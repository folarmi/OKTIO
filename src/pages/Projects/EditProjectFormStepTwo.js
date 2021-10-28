import React, { useState, useEffect } from "react";
import { Box, Grid, Input } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";
import { makeStyles } from "@material-ui/styles";
import Formsteps from "../../components/Formsteps";
import Popup from "../../components/Popup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect, useDispatch } from "react-redux";
import { addSecondForm } from "../../store/actions/ProjectActions";
import Notification from "../../components/Notification";

const initialFValues = {
  business_unit: "",
  department: "",
  project_reference_number: "",
  project_manager: "",
  currency: "",
  project_status: "",
  image: "",
};

const useStyles = makeStyles((theme) => ({
  errMsg: {
    color: "red",
    fontSize: "14px",
    margin: "3px 0",
  },
  imgPreview: {
    width: "100%",
    height: "460px",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#ccc",
    padding: "100px",
    border: "1px solid #000",
    background: "#cccccc",
  },

  customFileUpload: {
    color: "#55d6d6",
    fontSize: "22px",
    fontWeight: "500",
    padding: "6px 12px",
    cursor: "pointer",
  },
  files: { padding: "5px" },
  customeFileUpload: {
    position: "absolute",
    padding: "47px 20px",
    cursor: "pointer",
  },
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

const EditProjectFormStepTwo = (props) => {
  const classes = useStyles();
  const {
    onFormEdit,
    recordForEdit,
    openPopup,
    setOpenPopup,
    openPopup2,
    setOpenPopup2,
    projects,
  } = props;
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);
  const [img, setImg] = useState("");
  const [error, setError] = useState();
  const [imgError, setImgError] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("business_unit" in fieldValues)
      temp.business_unit = fieldValues.business_unit
        ? ""
        : "Business Unit is required.";

    if ("department" in fieldValues)
      temp.department = fieldValues.department ? "" : "Department is required.";

    if ("project_reference_number" in fieldValues)
      temp.project_reference_number = fieldValues.project_reference_number
        ? ""
        : "Project Reference Number is required.";

    if ("project_manager" in fieldValues)
      temp.project_manager = fieldValues.project_manager
        ? ""
        : "Project Manager is required.";

    if ("currency" in fieldValues)
      temp.currency =
        fieldValues.currency.length !== 0 ? "" : "Currency is required.";
    if ("project_status" in fieldValues)
      temp.project_status =
        fieldValues.project_status.length !== 0
          ? ""
          : "Project Status is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const editProject = (e) => {
    e.preventDefault();
    if (validate()) {
      values.image = imgPreview ? imgPreview : " ";
      onFormEdit(values, resetForm);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }
    console.log("submitEdit", values);
  };

  console.log("props", props);
  const maxSize = 1024 * 1;

  const validateImageSize = (file) => {
    if (file) {
      const fsize = file.size / maxSize;
      if (fsize > maxSize) {
        setImgError(
          `Maximum file size exceed, This file size is: ${fsize} kb. Please check the tips for the required size, height and width`
        );
        return;
      }
      setImgError("");
    }
  };

  console.log("imgPreview", imgPreview);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      validateImageSize(file);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        // set the state to the base64string
        setImgPreview(base64String);
        setImg(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      // make a decision
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type.substring(0, 5) === "image") {
  //     setImg(file);
  //   }
  // };

  // useEffect(() => {
  //   if (img) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result;
  //       setImgPreview(base64String);
  //     };
  //     reader.readAsDataURL(img);
  //   } else {
  //     setImgPreview("");
  //   }
  // }, [img]);

  useEffect(() => {
    if (recordForEdit)
      setValues((prev) => ({
        ...prev,
        business_unit: recordForEdit.business_unit,
        department: recordForEdit.department,
        project_reference_number: recordForEdit.project_reference_number,
        project_manager: recordForEdit.project_manager,
        currency: recordForEdit.currency,
        project_status: recordForEdit.project_status,
      }));
    setImgPreview(recordForEdit.image);
  }, [recordForEdit]);

  console.log("record", values);

  return (
    <>
      <Form onSubmit={editProject}>
        <Formsteps step1 step2></Formsteps>

        <Grid container>
          <Grid item xs={6} className={classes.formPart1}>
            <Controls.Select
              name="business_unit"
              label="Select Business Unit"
              value={values.business_unit}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.business_unit}
            />
            <Controls.Input
              label="Department"
              name="department"
              value={values.department}
              onChange={handleInputChange}
              error={errors.department}
            />

            <Grid container spacing={3}>
              <Grid item xs>
                <div className="container">
                  {error && (
                    <p
                      className="errMsg"
                      style={{
                        color: "red",
                        fontSize: "11px",
                        margin: "3px 0",
                        paddingLeft: "10px",
                      }}
                    >
                      {" "}
                      File Not Supported{" "}
                    </p>
                  )}

                  <div
                    className="imgPreview"
                    style={{
                      background: imgPreview
                        ? `url("${imgPreview}") no-repeat center/cover`
                        : "#e2f2ff",
                      width: "120px",
                      height: "120px",
                      display: "flex",
                      flexDirection: "column",
                      alignItem: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "8px",
                      margin: "10px 0 0 10px",
                      color: "#000000",
                    }}
                  >
                    {!imgPreview && (
                      <>
                        <p>
                          <AddCircleIcon color="primary" />
                        </p>
                        <label
                          htmlFor="fileUpload"
                          className="customeFileUpload"
                          style={{
                            position: "absolute",
                            padding: "47px 57px",
                            cursor: "pointer",
                          }}
                        >
                          &nbsp;
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          hidden
                          onChange={handleImageChange}
                          // value={values.image}
                        />
                      </>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs
                direction="row"
                alignItems="center"
                justifyContent="left"
                container
              >
                {imgPreview && (
                  <Controls.Button
                    text="Delete"
                    color="primary"
                    onClick={() => setImgPreview(null)}
                    size="small"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} p={1}>
            <Controls.Input
              label="Internal Project Reference ID"
              name="project_reference_number"
              value={values.project_reference_number}
              onChange={handleInputChange}
              error={errors.project_reference_number}
            />{" "}
            <Controls.Input
              label="Project Manager"
              name="project_manager"
              value={values.project_manager}
              onChange={handleInputChange}
              error={errors.project_manager}
            />
            <Controls.Select
              name="currency"
              label="Currency"
              value={values.currency}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.currency}
            />
            <Controls.Select
              name="project_status"
              label="Project Status"
              value={values.project_status}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.project_status}
            />
          </Grid>
        </Grid>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={0} flexGrow={1}>
            <Controls.Button
              disableElevation
              text="Back"
              color="default"
              className={classes.Button}
              style={{
                backgroundColor: "#E2F2FF",
                color: "#2170FF",
                padding: ".4rem 4rem",
              }}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              disableElevation
              text="Save as draft"
              color="default"
              onClick={resetForm}
              className={classes.Button}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              disableElevation
              type="submit"
              text="Create Project"
              className={classes.Button}
            />
          </Box>{" "}
          <Box p={0}></Box>
        </Box>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    projects: state.projects.projectsFirstForm,
  };
};

export default connect(mapStateToProps)(EditProjectFormStepTwo);
