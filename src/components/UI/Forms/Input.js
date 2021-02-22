import React from 'react';
import clsx from 'clsx';
import {FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton, FormHelperText} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    
      margin: {
        margin: theme.spacing(1),
      },
      
      textField: {
        width: '100%',
      },
      errorField:{
        display:'inline-block',
        color:'red',
        padding:theme.spacing(1),
      }
}));


const Input = props => { 
    const classes = useStyles();
    const {placeholder,name,value,type,icon,helperText,error,onChange ,disabled} = props;
    const Icon = icon || null;
    
return ( 
    <FormControl  className={clsx(classes.margin, classes.textField)} variant="outlined" error={error}>
          <InputLabel htmlFor={`outlined-adornment-${placeholder}`}>{placeholder}</InputLabel>
          <OutlinedInput
            readOnly={disabled}
            id={`outlined-adornment-${placeholder}`}
            type={type|| 'text'}
            name={name} 
            value={value}
            onChange={onChange}
            endAdornment={ Icon && value === '' ?
              (<InputAdornment position="end">
                <Icon />
              </InputAdornment>) : <div />
          }
            error={error}
            label={placeholder}
            placeholder={placeholder}
          />
          <FormHelperText> {helperText}</FormHelperText> 
          {/* {props.error?<span className={classes.errorField}>{helperText}</span>:null} */}
        </FormControl>);

}


export default Input;