import React from 'react';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {makeStyles} from'@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    margin: {
      margin: theme.spacing(1),
      
    },
    
    textField: {
      width: '100%',
      
    },

}));
const DatePicke = props => { 
    const {label,name,value, onChange,error} = props
    const classes = useStyles();
return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <div className={classes.margin} >
        <KeyboardDatePicker
       className={classes.textField}
        variant="inline"
        error={error}    
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={onChange} />
        </div>
        
    </MuiPickersUtilsProvider> 
    );

}


export default DatePicke;