import React from 'react';
import{makeStyles} from '@material-ui/core/styles'
import {Paper,Grid,Button,Typography,Divider,Toolbar,IconButton} from '@material-ui/core';
import {AddBoxRounded, IndeterminateCheckBox, Language,LocationOnRounded,ViewCompact,People,Person, CalendarViewDay} from '@material-ui/icons';
import Cards from '../UI/Cards/Cards';


const useStyles = makeStyles(theme =>({
    
      divider:{
          margin:`${theme.spacing(2)}px`
      },
      FloatParent:{
          position:'relative',
          marginTop: `${theme.spacing(0.5)}px`,

      },
      Float:{
          backgroundColor:theme.palette.secondary.main,
          position:'relative',
          left: 0,
          top:`-${theme.spacing(2)}px`,
          boxShadow: '2px 3px 3px rgba(80,80,80,0.25)',
          borderRadius: `${theme.spacing(0.5)}px`,
          display: 'flex',
          justifyContent: 'center',
          padding:`${theme.spacing(2)}px`,
          marginRight: `${theme.spacing(1)}px`
      },
      location:{
          padding: `${theme.spacing(2)}px`
      },
      paper:{
          width:'98.5%',
          padding:`0 ${theme.spacing(2)}px`,
          marginTop: theme.spacing(2),
      }
}));
const Dashboard = props => { 
    const classes = useStyles();
    const locations = [
        {
            icon: LocationOnRounded,
            id: 0,
            label:"Corporate Head Office"
        },
        {
            icon: LocationOnRounded,
            id: 1,
            label:"Lagos Office" 
        },
        {
            icon: LocationOnRounded,
            id: 2,
            label:"Emele Base"
        },
        {
            icon: LocationOnRounded,
            id: 3,
            label:"Warri Base"
        }
    ];
    const stat = [
        {
            id: 0,
            label:"Total Employees",
            labelValue: 37,
            color: "primary",
            icon:Person,
        },
        {
            id: 1,
            label:"My Requests",
            labelValue: 0,
            color: "tertiary",
            icon:ViewCompact,
        },
        {
        id: 2,
        label:"Total Department",
        labelValue: 8,
        color: "secondary",
        icon:People,
    },{
        id: 3,
        label:"Total Payment Type",
        labelValue: 3,
        color: "secondary",
        icon:CalendarViewDay,
    },
    {
        id: 4,
        label:"Total Leave Reques",
        labelValue: 0,
        color: "secondary",
        icon:ViewCompact,
    },{
        id: 5,
        label:"Total Benefits and Compensation",
        labelValue: 0,
        color: "secondary",
        icon:CalendarViewDay,
    }
];
    const locationsMap = locations.map(location => {
        return (
            <Grid item key={location.id}>
                <Divider />
                <Grid container justify='space-between' style={{marginBottom:'20px'}}>
                        <location.icon/>
                        <Typography>{location.label}</Typography>
                    </Grid>
            </Grid>
        )
    });

return ( 
    
      
    <Grid container justify='space-between' direction='column' spacing={2}>
      <Grid item xs={1} />
      <Grid item>
        <Cards statistics={stat}/> 
      </Grid>
      <Grid item >
        <Paper className={classes.paper} elevation={12}>

            <Toolbar style={{color:'#ccc'}} >
                <div className={classes.FloatParent}>
                    <div className={classes.Float}>
                        <Language />
                    </div>
                </div>
                <Typography style={{textTransform:'none'}}> KGM LOcation </Typography>
            </Toolbar>
            <Grid container spacing={2}>
                <Grid item xs={5} className={classes.location}>
                    <Grid  item >
                        {locationsMap}
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid item>
                    <IconButton>
                        <AddBoxRounded/>
                    </IconButton>
                    <IconButton>
                        <IndeterminateCheckBox />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                    But Map Here
                </Grid>
            </Grid>

        </Paper>
      </Grid>
      <Grid item xs={1} />

    </Grid>
   
   
    );

}


export default Dashboard;