import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'
import Controls from './controls/Controls';
import AddIcon from "@material-ui/icons/Add";
import {Box} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'transparent'
    },
    pageHeader:{
        padding:theme.spacing(1),
        display:'flex',
        marginBottom:theme.spacing(0)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#2170ff'
    },
    
    pageTitle:{
        paddingLeft:theme.spacing(2),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6',
            
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                {/* <Card className={classes.pageIcon}>
                    {icon}
                </Card> */}

<div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', p: 0,  }}>
        <Box sx={{ p: 1, flexGrow: 1, }}>
        <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
        </Box>
        <Box sx={{ p: 1, }}>
        <Controls.Button
            text="Add New"
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.newButton}
            // onClick={() => {
            //   setOpenPopup(true);
            //   setRecordForEdit(null);
            // }}
          />
            
        </Box>
         
      </Box>
    </div></div>
                
                
                
           
        </Paper>
    )
}
