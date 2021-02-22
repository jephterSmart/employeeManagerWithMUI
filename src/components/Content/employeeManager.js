import React,{useEffect,useState} from 'react';
import{makeStyles} from '@material-ui/core/styles'
import {Paper,Grid,Button,Typography,Divider,} from '@material-ui/core';
import {PersonAdd} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Cards from '../UI/Cards/Cards';


const useStyles = makeStyles(theme =>({
    summary:{
        width: '95%',
        margin: 'auto',
        position: "absolute",
        backgroundColor:"#42949d",
        color: '#FFF',
        top: '-20px',
        left: '2.5%',
        borderRadius: '4px',
        padding: theme.spacing(1),
        boxShadow:"1px 2px 5px rgba(80,80,80,0.2)",
      },
      space:{
          height: '60px',
      },
      paper:{
          position:"relative"
          ,marginTop:'40px',
      },
      divider:{
          margin:'15px'
      }

}));
const EmployeeManager = props => { 
    const classes = useStyles();
    const token = localStorage.getItem('idToken');
    const [employees,setEmployees] = useState([]);
useEffect(() => {
  axios.get('https://employee-manager-js-default-rtdb.firebaseio.com/employees.json?auth='+token)
  .then(response =>{
      const {data} = response;
      const employees = [];
      for(let key in data){
        employees.push({...data[key],id:key})
      }
      setEmployees(employees);
  }).catch(err => {
    console.log(err);
  })
},[]);
const totalEmployees = employees.length;
//Use this function when we have complete information on our database.
const convertTostatistics = (employees) => {
 
  
  return ( {id: 0,
      label:"Total Employees",
      labelValue: 34,
      color: "primary",
      icon:'',
      
  })
  
}
return ( 
    <Paper className={classes.paper} elevation={5}>
      <div className={classes.space}/>
      <div className={classes.summary} > Employee Summary</div>
      
    <Grid container justify='space-between' >
      <Grid item xs={1} />
      <Grid item xs={10} >
        <Grid container direction='column' >
        <Link to='/addEmployee' style={{textDecoration:'none '}}>
        <Button endIcon={<PersonAdd />} color="primary" 
        variant="contained"  >
          <Typography>Add Employee</Typography>
        </Button>
        </Link>
        <Divider className={classes.divider}/>
         <Cards totalEmployees={totalEmployees}/> 
         </Grid>
      </Grid>
      <Grid item xs={1} />

    </Grid>
    </Paper>
    );

}


export default EmployeeManager;