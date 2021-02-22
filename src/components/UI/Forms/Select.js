import React  from 'react';
import {FormControl, Select as SelectMUI ,MenuItem,InputLabel,FormHelperText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width:"100%"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));
const Select = props => { 
    const classes = useStyles();
    
    const {options,label,name,value,onChange} = props;
    const menuItems = options.map(option => {
        return(
            <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
        )
    });
    
return ( 
    <FormControl variant="outlined" className={classes.formControl} error={props.error}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <SelectMUI
          labelId="demo-simple-select-outlined-label"
          id={name}
          value={value}
          onChange={onChange}
          label={label}
        >
          {menuItems}
        </SelectMUI>
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>);

}


export default Select;