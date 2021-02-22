import React,{useState} from 'react';
import {Stepper as StepperMUI, Step,StepLabel,StepConnector} from '@material-ui/core';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {Person,Work,AccountBalance,ListAlt} from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    stepper:{
        padding: '10px 10%',
        width:'100%',
        boxSizing: 'border-box'
    },
    root: {
        width: '100%',
      },
      button: {
        marginRight: theme.spacing(1),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
}));
const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundColor: "#e4827d",
      },
    },
    completed: {
      '& $line': {
        backgroundColor:'#018b01',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
const useColorlibStepIconStyles = makeStyles(theme =>({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor:"#e4827d",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundColor: theme.palette.secondary.main,
    }
  }));
  
function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <Person/>,
      2: <Work />,
      3: <AccountBalance/>,
      4:<ListAlt />
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

const Stepper = props => {
    const classes = useStyles();
    const {steps,activeStep} = props
    // const steps = [
    //     "Personal Data","Employee Info", "Bank & Position","Other Date"
    // ];
    

    
return ( 
    <StepperMUI alternativeLabel 
                activeStep={activeStep} 
                connector={<ColorlibConnector />}
                className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </StepperMUI>
    );

}


export default Stepper;