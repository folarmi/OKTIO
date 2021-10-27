import { Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(0),

    textAlign: "center",
    "& .MuiGrid-item": {
      padding: "0px",
    },
  },
  /* Checkout Steps */
  checkoutSteps: {
    borderTop: "0.3rem #c0c0c0 solid",
    color: "#c0c0c0",
    flex: 1,
    padding: "1rem",
    fontWeight: "bold",
  },
  active: {
    borderTopColor: "#00D4B5",
    color: "#00D4B5",
  },
  inactive: {
    color: "#00d4b5",
  },
  steps: { marginBottom: theme.spacing(2) },
  gridCol: { textAlign: "center", width: "106px", fontSize: "11px" },
  divider: {
    width: "100px",
  },
  divider2: {
    width: "20px",
  },
  hrline: { borderTop: "1px solid #A19B9D", marginTop: "12px" },
  stepperText: {
    fontSize: "14px",
  },
}));
export default function Formsteps(props) {
  const classes = useStyles();
  // const [spacing, setSpacing] = React.useState(2);

  return (
    <Grid container className={(classes.root, classes.steps)} spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          className={classes.control}
          justifyContent="center"
        >
          <Grid item>
            {props.step1 ? (
              <CheckCircleIcon className={classes.active} />
            ) : (
              <RadioButtonUncheckedIcon className={classes.inactive} />
            )}
          </Grid>
          <Grid item>
            <div className={classes.divider}>
              <hr className={classes.hrline} />
            </div>
          </Grid>

          <Grid item>
            {props.step2 ? (
              <CheckCircleIcon className={classes.active} />
            ) : (
              <RadioButtonUncheckedIcon className={classes.inactive} />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          className={classes.control}
          justifyContent="center"
        >
          <Grid item className={classes.gridCol}>
            <div className={classes.active}>1</div>
          </Grid>
          <Grid item>
            <div className={classes.divider2}>
              {/* <hr className={classes.hrline} />{" "} */}
            </div>
          </Grid>

          <Grid item className={classes.gridCol}>
            {props.step2 ? (
              <div className={classes.active}>2</div>
            ) : (
              <div className={classes.inactive}>2</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* ---------------------------- */}

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          className={classes.control}
          justifyContent="center"
        >
          <Grid item className={classes.gridCol}>
            {props.step1 ? (
              <div className={classes.active}>
                <span className={classes.stepperText}>Initiation</span>
              </div>
            ) : (
              <div className={classes.inactive}>Initiation</div>
            )}
          </Grid>
          <Grid item>
            <div className={classes.divider2}>
              {/* <hr className={classes.hrline} />{" "} */}
            </div>
          </Grid>

          <Grid item className={classes.gridCol}>
            {props.step2 ? (
              <div className={classes.active}>Details</div>
            ) : (
              <div className={classes.inactive}>Details</div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
