import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Controls from "./controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import ProjectFormstep2 from "../pages/Projects/ProjectFormstep2";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Popup(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    openPopup2,
    setOpenPopup2,
    recordForEdit,
    addOrEdit,
  } = props;
  const classes = useStyles();

  return (
    <>
     {/* Form 1 */}
      <Dialog
        open={openPopup}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
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
        <DialogContent dividers>{children}</DialogContent>
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
              {title}
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
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            openPopup2={openPopup2}
            setOpenPopup2={setOpenPopup2}
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
