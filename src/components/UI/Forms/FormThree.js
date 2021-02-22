import React, {  useState } from 'react';
import {Grid,Button,Typography} from '@material-ui/core';
import {Person,Mail,Phone,Public,Home, } from '@material-ui/icons'

import Input from './Input';
import Select from './Select';

const initialState = {
    bankName: '',
    bankAccount: '',
    bvn: '',
    pensionManager:'',
    pensionNumber: '',
    
}



const Form = props => { 
    
     const [state , setState] = useState(initialState);
     const [errors, setErrors] = useState(initialState);
    
    const bankName =[{
        id:0,
        value: 'first',
        label: 'First Bank'
    },{
        id:1,
        value: 'unity',
        label: 'Unity Bank'
    },
    {
        id:2,
        value: 'gtb',
        label: "Guarantee Trust Bank"
    },{
        id:3,
        value:'union',
        label:'Union Bank'
    },{
        id:4,
        value: 'others',
        label:'Others'
    }
]
const pensionManager =[{
    id:0,
    value: 'fcmb',
    label: 'FCMB'
},{
    id:1,
    value: 'stanbic',
    label: 'Stanbic IBTC'
},
{
    id:3,
    value: 'other',
    label: "Not specified"
}
];
const validate = () => {
    const helperTextObj = {};
    helperTextObj.bankName= state.bankName ?"" : "First Name is required";
   
    helperTextObj.pensionManager = state.pensionManager ?"" : "You have not selected your manager";
   
    helperTextObj.pensionNumber = state.pensionNumber.length > 8 && parseInt(state.pensionNumber) > 99999999 ?"" 
                        : "Account number is required";
    helperTextObj.bankAccount = state.bankAccount.length > 8 && parseInt(state.bankAccount) > 99999999 ?"" 
                        : "Account number is required";
    helperTextObj.bvn = state.bvn.length > 9 && parseInt(state.bvn) > 999999999 ?"" 
                        : "Bank Verification number is required";
    
    
        setErrors({...helperTextObj});
        
    return Object.values(helperTextObj).every(ele => ele === "");

    }

return ( 
    <form style={{margin:0,width:'100%'}} autoComplete="false" onSubmit={(ev) => {props.onSubmit(ev,validate,state)}}>

        <Grid container direction='column' spacing={2} >
            <Grid  item container direction='row' spacing={2}>
                
                <Grid item xs={6}>
                <Select options={bankName} label="Bank Name*" onChange={(ev) => {setState({...state,bankName:ev.target.value})}} 
                value={state.bankName} name="bankName"
                error={errors.bankName == ''? false: true} helperText={errors.bankName}/>
                </Grid>
                <Grid item xs={6}>
                    <Input  name='bankAccount' onChange={(ev) => {setState({...state,bankAccount:ev.target.value})}}
                    value= {state.bankAccount}  placeholder="Bank Account*"
                    error={errors.bankAccount == ''? false: true} helperText={errors.bankAccount}/>
                </Grid>
                
            </Grid>
             <Grid item  container  >
                
                <Grid item xs={12}>
                    <Input   placeholder="Bank Verification NUmber*"
                    name='bvn' error={errors.bvn == ''? false: true}
                     helperText={errors.bvn}
                    onChange={(ev) => {setState({...state,bvn:ev.target.value})}} value={state.bvn}/>
                </Grid>
            </Grid>
            <Grid item  container direction='row' spacing={2}>
                <Grid item xs={6}>
                <Select options={pensionManager} label="Pension Manager*" 
                onChange={(ev) => {setState({...state,pensionManager:ev.target.value})}} 
                value={state.pensionManager} name="pensionManager"
                error={errors.pensionManager == ''? false: true} helperText={errors.pensionManager}/>
                </Grid>
                <Grid item md={6}>
                <Input   placeholder="Pension Number*"
                    name='pensionNumber' error={errors.pensionNumber == ''? false: true}
                     helperText={errors.personalEmail}
                    onChange={(ev) => {setState({...state,pensionNumber:ev.target.value})}} 
                    value={state.pensionNumber}/>
                </Grid>
                

            </Grid>
           
            
            <Grid item style={{justifySelf: 'center'}}>
                {!props.valid &&
                <Button variant='contained' color='primary' size='medium' type='submit'>
                    <Typography>Done</Typography>
                </Button>}
                
            </Grid>
        </Grid>
    </form>);

}


export default Form;