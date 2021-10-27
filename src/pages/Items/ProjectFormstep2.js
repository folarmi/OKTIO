import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { withStyles } from "@material-ui/styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box, Grid, Input, Typography } from "@material-ui/core";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

const initialFValues = {
  unit: "",
  notes: "",
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
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    padding: ".5rem 2rem",
    fontWeight: "700",
  },
  input: {
    display: "none",
  },
  attachmentText: {
    fontWeight: "700",
  },
  attachment: {
    margin: "2rem 0",
  },
  Button: {
    padding: ".4rem 3rem",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
  },
  imageInfo: {
    color: "#A19B9D",
    fontSize: "12px",
    maxWidth: "10.5rem",
  },
  imageInfoTwo: {
    color: "#A19B9D",
    fontSize: "12px",
  },
  modalContent: {
    width: "100%",
  },
  addLink: {
    color: "#1E1D1D",
    margin: "1rem 0",
    fontSize: "14px",
    fontWeight: "700",
  },
  dragAndDrop: {
    fontWeight: "700",
    fontSize: "18px",
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
  const [open, setOpen] = React.useState(false);
  const [openAddDocument, setOpenAddDocument] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenDocument = () => setOpenAddDocument(true);
  const handleClose = () => setOpen(false);
  const handleCloseDocument = () => setOpenAddDocument(false);
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

  const BlueText = withStyles({
    root: {
      color: "#2170FF;",
      fontWeight: "600",
      cursor: "pointer",
    },
  })(Typography);

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
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(setImgPreview(reader.result));
      reader.onerror = (error) => reject(error);
    });

  async function handleImageChange(e) {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setImg(await toBase64(selected));
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
            {/* <Controls.Input
              name="business_unit"
              label="Business Unit"
              value={values.business_unit}
              onChange={handleInputChange}
              error={errors.business_unit}
            /> */}
            {/* <Controls.Input
              label="Department"
              name="department"
              value={values.department}
              onChange={handleInputChange}
              error={errors.department}
            /> */}
          </Grid>
        </Grid>
        <Grid container spacing={20}>
          <Grid item xs={3}>
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
                  backgroundColor: "#E2F2FF",
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
          <Grid item xs={8}>
            <input
              accept="image/*"
              className={classes.input}
              id="outlined-button-file"
              multiple
              type="file"
            />
            <label>
              <Controls.Button
                component="span"
                text="Choose File"
                disableElevation
                className={classes.button}
              />
            </label>
            <Controls.Button
              text="Delete"
              color="default"
              disableElevation
              onClick={() => setImgPreview(null)}
              className={classes.button}
            />
            <Typography className={classes.imageInfo}>
              540x540 px recommended. JPG or PNG. Max size of 800K
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.attachment}>
          <Typography variant="body" className={classes.attachmentText}>
            Attachments
          </Typography>
          <Divider variant="middle" />
          <Grid container style={{ marginTop: "1rem" }}>
            <Grid item xs={2}>
              <BlueText variant="sub" onClick={handleOpen}>
                + Add Link
              </BlueText>
            </Grid>
            <Grid item xs={3}>
              <BlueText variant="sub" onClick={handleOpenDocument}>
                + Add Document
              </BlueText>
            </Grid>
          </Grid>
        </div>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={0} flexGrow={1}>
            <Controls.Button
              text="Back"
              disableElevation
              className={classes.Button}
              style={{ backgroundColor: "#E2F2FF", color: "#2170FF" }}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              text="Save as Draft"
              color="default"
              disableElevation
              onClick={resetForm}
              className={classes.Button}
            />
          </Box>
          <Box p={0}>
            <Controls.Button
              // type="Publish"
              text="Publish"
              disableElevation
              className={classes.Button}
            />
          </Box>{" "}
          <Box p={0}></Box>
        </Box>
      </Form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className={classes.addLink}>
            Add Link
          </Typography>
          <div className={classes.modalContent}>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              value={values.unit}
              onChange={handleInputChange}
            />
            <Controls.Input
              fullWidth
              label="Project Description"
              name="notes"
              value={values.notes}
              onChange={handleInputChange}
              error={errors.notes}
              multiline="multiline"
              maxRows={4}
            />
          </div>
          <Stack direction="row" style={{ marginTop: "2rem" }}>
            <Controls.Button
              variant="contained"
              disableElevation
              className={classes.Button}
              onClick={handleClose}
              text="Cancel"
              style={{
                backgroundColor: "#E2F2FF",
                color: "#2170FF",
                marginRight: "2.5rem",
              }}
            />
            <Controls.Button
              variant="contained"
              disableElevation
              className={classes.Button}
              onClick={handleClose}
              text="Save"
            />
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openAddDocument}
        onClose={handleCloseDocument}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className={classes.addLink}>
            Add Document
          </Typography>
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
                width: "100%",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                // alignItem: "center",
                // justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#DBE8FF",
                border: "1px dashed #2170FF",
                borderRadius: "8px",
                marginBottom: "1rem",
                color: "#000000",
              }}
            >
              {!imgPreview && (
                <>
                  <div className="">
                    <p>
                      <CloudUploadOutlinedIcon color="primary" />
                    </p>
                    <p className={classes.dragAndDrop}>
                      Drag or drop files here
                    </p>
                    <p className={classes.imageInfoTwo}>
                      Max. file size is 10mb Files must be .pdf, .exl, .png, or
                      .jpg
                    </p>
                    <label htmlFor="outlined-button-file">
                      <Controls.Button
                        component="span"
                        text="Choose File"
                        disableElevation
                        className={classes.button}
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#2170FF",
                        }}
                      />
                    </label>
                  </div>
                  <label
                    htmlFor="fileUpload"
                    className="customeFileUpload"
                    style={{
                      position: "absolute",
                      // padding: "47px 57px",
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
          <Controls.Input
            label="Project Description"
            name="notes"
            fullWidth
            value={values.notes}
            onChange={handleInputChange}
            error={errors.notes}
            multiline="multiline"
            maxRows={4}
          />
          <Stack direction="row" style={{ marginTop: "2rem" }}>
            <Controls.Button
              variant="contained"
              disableElevation
              className={classes.Button}
              onClick={handleCloseDocument}
              text="Cancel"
              style={{
                backgroundColor: "#E2F2FF",
                color: "#2170FF",
                marginRight: "2.5rem",
              }}
            />
            <Controls.Button
              variant="contained"
              disableElevation
              className={classes.Button}
              onClick={handleCloseDocument}
              text="Save"
            />
          </Stack>
        </Box>
      </Modal>
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
