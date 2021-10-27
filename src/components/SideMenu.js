import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    IconColor: {
        color: "#FFFFFF"
    },

    listItems: {
        "& .MuiListItemIcon-root": {
            minWidth: "40px",
        },
    },

});

export default function SideMenu() {
    const classes = useStyles();
    return (
        <React.Fragment >
            <div className={classes.listItems}>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <DashboardIcon className={classes.IconColor} />
                    </ListItemIcon>
                    <ListItemText
                        disableTypography
                        primary={
                            <Typography variant="body2" gutterBottom className={classes.IconColor}  >
                                Dashboard
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem button component={Link} to="/projects">
                    <ListItemIcon className={classes.IconColor}>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Projects
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/rfx">
                    <ListItemIcon className={classes.IconColor}>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        RFX
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Auctions
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Suppliers
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/items">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Items
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Reports
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Company Users
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Settings
                    </Typography>} />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon className={classes.IconColor}>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText className={classes.IconColor} primary={<Typography variant="body2" gutterBottom className={classes.IconColor}  >
                        Supports
                    </Typography>} />
                </ListItem>
            </div>
        </React.Fragment>
    );
}