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
// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
//   { id: "other", title: "Other" },
// ];

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
}));

const ProjectFormstep2 = (props) => {
  const classes = useStyles();
  const {
    addOrEdit,
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
        : "This field is required.";

    if ("department" in fieldValues)
      temp.department = fieldValues.department ? "" : "This field is required.";

    if ("project_reference_number" in fieldValues)
      temp.project_reference_number = fieldValues.project_reference_number
        ? ""
        : "This field is required.";

    if ("project_manager" in fieldValues)
      temp.project_manager = fieldValues.project_manager
        ? ""
        : "This field is required.";

    if ("currency" in fieldValues)
      temp.currency =
        fieldValues.currency.length !== 0 ? "" : "This field is required.";
    if ("project_status" in fieldValues)
      temp.project_status =
        fieldValues.project_status.length !== 0
          ? ""
          : "This field is required.";
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
      values.image = img ? img : " ";
      addOrEdit(values, resetForm);
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }
  };
  //   const toBase64 = file => new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(setImgPreview(reader.result));
  //     reader.onerror = error => reject(error);
  // });

  async function handleImageChange(e) {
    const selected = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selected);

    const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      reader.onload = (e) => {
        setImgPreview(reader.result);
        setImg(e.target.result);
      };
      setError(false);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    // if (recordForEdit !== null)
    //   setValues({
    //     ...recordForEdit,
    //   });
  }, [recordForEdit]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Formsteps step1 step2></Formsteps>

        <Grid container>
          <Grid item xs={6} className={classes.formPart1}>
            <Controls.Input
              name="business_unit"
              label="Business Unit"
              value={values.business_unit}
              onChange={handleInputChange}
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
                          value={values.image}
                        />
                        {/* <span>( jpg, jpeg or png)</span> */}
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
              label="Project Reference Number"
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
            {/* <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
            {/* <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div> */}
          </Grid>
        </Grid>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={0} flexGrow={1}>
            <Controls.Button text="Cancel" color="default" />
          </Box>
          <Box p={0}>
            <Controls.Button
              text="Save as Draftss"
              color="default"
              onClick={resetForm}
            />
          </Box>
          <Box p={0}>
            <Controls.Button type="submit" text="Next" />
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

export default connect(mapStateToProps)(ProjectFormstep2);
