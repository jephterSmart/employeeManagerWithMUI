import React,{useState,useEffect} from 'react';
import {Paper, Toolbar, Typography,Grid, Divider,Button, Snackbar, IconButton} from '@material-ui/core';
import {makeStyles,useTheme} from '@material-ui/core/styles'
import {ArrowForwardIos, ArrowBackIos, Close} from '@material-ui/icons'
import axios from 'axios';

import Stepper from '../components/UI/Stepper';
import FormOne from '../components/UI/Forms/FormOne';
import FormTwo from '../components/UI/Forms/FormTwo';
import FormThree from '../components/UI/Forms/FormThree';
import FormFour from '../components/UI/Forms/FormFour';
import Modal from '../components/UI/Modal/Modal';


const useStyles = makeStyles(theme => ({
    stepper:{
        padding: '10px 10%',
        width:'100%',
        boxSizing: 'border-box'
    }
    ,controls:{
        display:'flex',
        justifyContent:'space-between',
        width: '100%',
        margin:'0',
        marginTop: theme.spacing(4),
        marginBottom:theme.spacing(4)
    },
    weak:{
        backgroundColor:'#999',
        color:'#fff'
    },
    Snackbar: {
      
      '& .MuiSnackbarContent-root':{
        backgroundColor: '#fff',
        color:theme.palette.primary.main,
        borderRadius: theme.spacing(0.5),
        border:`2px solid ${theme.palette.primary.main}`,
        fontSize:'18px',
      }

    }
}))


  
const AddComponent = props => { 
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep]= useState(0);
    const [isStageValid, setIsStageValid] = useState(false);
    const [snackOpen,setSnackOpen] = useState(false);
    const [employeeInfo,setEmployeeInfo] = useState({});
    const [error,setError] = useState(false);
    const steps = [
        "Personal Data","Employee Info", "Bank & Position","Other Date"
    ]; 
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsStageValid(false);
        
      };
    const handleReset = () =>{
        setActiveStep(0);
    }
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    const handleStageSubmit =(e,validate,obj) =>{
      e.preventDefault();
      setIsStageValid(validate());
      switch(activeStep){
        case 0: setEmployeeInfo({...employeeInfo,personalData:obj}); break;
        case 1: setEmployeeInfo({...employeeInfo,employeeInfos:obj}); break;
        case 2: setEmployeeInfo({...employeeInfo,bankAndPosition:obj}); break;
        case 3: setEmployeeInfo({...employeeInfo,otherData:obj}); break;
      }
    }
    useEffect(()=>{
      if(activeStep === 4){
        let token = localStorage.getItem('idToken');
        let userId = localStorage.getItem('userId');
        const payload = {
          ...employeeInfo,
          userId: userId
        }
        axios.post('https://employee-manager-js-default-rtdb.firebaseio.com/employees.json?auth='+token,payload)
        .then(response => {
            setError(false);
            handleSnackOpen();
        })
        .catch(err =>{
          setError(true);
        })
      }
    },[activeStep]);
    const handleSnackClose = () =>{
      setSnackOpen(false)
    }
    const handleSnackOpen = () =>{
      setSnackOpen(true);
    }
   
    const controls = (
        <div className={classes.controls}>
        {activeStep === steps.length ? (
          <div>
            <Typography >
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button} variant="contained"
            classes={{
                contained:classes.weak
            }}>
              Reset
            </Button>
          </div>
        ) : (
          
            
            <div className={classes.controls}>
              <Button disabled={activeStep === 0} size='small' onClick={handleBack} variant="contained" 
              className={classes.button}
              classes={{
                  contained: classes.weak
              }}>
                  <ArrowBackIos/>
                <Typography>Back</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={!isStageValid}
                color={isStageValid ? 'primary':'default'}
              >
                {activeStep === steps.length - 1 ? <Typography>Finish</Typography> : (<>
                <Typography>Next</Typography>
                <ArrowForwardIos /></>)}
              </Button>
            </div>
         
        )}
      </div>
    );
    
    let form =  null;
    switch(activeStep){
      case 0: form = <FormOne onSubmit={handleStageSubmit} valid={isStageValid}/>; break;
      case 1: form = <FormTwo onSubmit={handleStageSubmit} valid={isStageValid}/>; break;
      case 2: form = <FormThree onSubmit={handleStageSubmit} valid={isStageValid}/>; break;
      case 3: form = <FormFour onSubmit={handleStageSubmit} valid={isStageValid}/>; break;
      default: form = null;
    }
    
     const action = (
      <IconButton onClick ={handleSnackClose} >
        <Close />
      </IconButton>
     )

return (
    <> 
        {error&&<Modal show={error} >
          <Typography>
            There is an Error,could not submit
            <Button onClick={() => setActiveStep(3)}>Try again</Button>
          </Typography>
          </Modal>}
        <Paper elevation={12} >
            
            <Toolbar style={{backgroundColor:theme.palette.primary.main,color:'#fff'}} >
                <Typography style={{textTransform:'none'}}> Add Employee </Typography>
            </Toolbar>
           
            <Grid container direction='column' style={{padding:theme.spacing(1)}}>
                <Grid item >
                <Stepper steps={steps} activeStep={activeStep}/>
                </Grid>
                <Grid item style={{margin:'30px 0'}}>
                    <Divider />
                </Grid>
                <Grid item style={{width:'98%'}}>
                  {form}
                   
                </Grid>
            </Grid>
        </Paper>
        {controls}
        <Snackbar open={snackOpen} autoHideDuration={500} 
        className= {classes.Snackbar}
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        message="Thank you for filling in the Form" 
        action = {action}
        />
        
      
    </> 
    );

}


export default AddComponent;