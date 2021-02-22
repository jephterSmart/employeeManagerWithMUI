import { Divider,Grid,Typography,Button} from '@material-ui/core';
import {Mail,People} from '@material-ui/icons';
import React,{useState} from 'react';

import Input from './Input';
import Select from './Select';




const initialState = {
    spouseFirstName: '',
    spouseLastName: '',
    spousePhone: '',
    spouseMail: '',
    numberOfChildren: '',
    kinFirstName: '',
    kinLastName: '',
    kinPhone: '',
    kinAddress: '',
    kinMail: '',
    kinRelationship: '',
    emerName1: '',
    emerAddress1: '',
    emerPhone1: '',
    emerName2: '',
    emerAddress2: '',
    emerPhone2: '',
    
}



const Form = props => { 
    
     const [state , setState] = useState(initialState);
     const [errors, setErrors] = useState(initialState);
    
    
const relationship =[{
    id:0,
    value: 'parent',
    label: 'Parent'
},{
    id:1,
    value: 'cousin',
    label: 'Cousin'
},
{
    id:4,
    value: 'wife',
    label: "Wife"
},{
    id:5,
    value:'child',
    label:'Child'
}
];

const validate = () => {
    const helperTextObj = {};
    helperTextObj.spouseFirstName = state.spouseFirstName ?'':"Name is required";
    helperTextObj.spouseLastName = state.spouseLastName?'':"Name is Required";
    helperTextObj.spouseMail = (/.+\@.+\..+/).test(state.spouseMail) ?"" : "An Email is required";
    helperTextObj.spousePhone = state.spousePhone.length > 9 && parseInt(state.spousePhone) > 999999999 ?"" 
                        : "Spouse number is required";
    helperTextObj.kinFirstName = state.kinFirstName?'':"Name is required";
    helperTextObj.kinLastName = state.kinLastName?'':"Name is Required";
    helperTextObj.kinMail = (/.+\@.+\..+/).test(state.kinMail) ?"" : "An Email is required";
    helperTextObj.kinPhone = state.kinPhone.length > 9 && parseInt(state.kinPhone) > 999999999 ?"" 
                        : "Spouse number is required";
    helperTextObj.kinRelationship = state.kinRelationship?'':"Select relationship is required"; 
    helperTextObj.kinAddress = state.kinAddress ? '':'Put the Address of next of kin'
    helperTextObj.numberOfChildren = !isNaN(Number(state.numberOfChildren) ) && state.numberOfChildren >= 0? 
        '': "specify Number of children"
    helperTextObj.emerName1 = state.emerName1 ?"" : "Name is required";
    helperTextObj.emerName2 = state.emerName2 ?"" : " Name is required";
    helperTextObj.emerAddress1 = state.emerAddress1 ?"" : "Address is required";
    helperTextObj.emerAddress2 = state.emerAddress2 ?"" : "Address is required";
    
    helperTextObj.emerPhone1 = state.emerPhone1.length > 9 && parseInt(state.emerPhone1) > 999999999 ?"" 
                        : "emere number is required";
    helperTextObj.emerPhone2 = state.emerPhone2.length > 9 && parseInt(state.emerPhone2) > 999999999 ?"" 
                        : "Referree number is required";
    
        setErrors({...helperTextObj});
        
    return Object.values(helperTextObj).every(ele => ele === "");

    }


return ( 
    <form style={{margin:0,width:'100%'}} autoComplete="false" onSubmit={(ev) => {props.onSubmit(ev,validate,state)}}>

        <Grid container direction='column' spacing={1} >
            <Grid item container direction='column'>
                <Typography>Spouse Details</Typography>
                <Divider />
            </Grid>
            <Grid  item container direction='row' spacing={2} justify='space-between'>
                
                <Grid item xs={6}>
                    <Input  name="spouseFirstName" 
                    value= {state.spouseFirstName} placeholder="First Name "
                    onChange={(ev) => {setState({...state,spouseFirstName:ev.target.value})}}
                    error={errors.spouseFirstName == ''? false: true} helperText={errors.spouseFirstName}
                    />
                </Grid>
                <Grid item xs={6} >
                    <Input  name='spouseLastName' onChange={(ev) => {setState({...state,spouseLastName:ev.target.value})}}
                    value= {state.spouseLastName}  placeholder="Last Name*"
                     error={errors.spouseLastName == ''? false: true} helperText={errors.spouseLastName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input name="spousePhone" 
                    value= {state.spousePhone} placeholder="Phone Number"
                    onChange={(ev) => {setState({...state,spousePhone:ev.target.value})}}
                    error={errors.spousePhone == ''? false: true} helperText={errors.spousePhone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input icon={Mail} name='spouseMail' onChange={(ev) => {setState({...state,spouseMail:ev.target.value})}}
                    value= {state.spouseMail}  placeholder="Spouse Mail*" type='email'
                     error={errors.spouseMail == ''? false: true} helperText={errors.spouseMail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input icon={People} name='numberOfChildren' onChange={(ev) => {setState({...state,numberOfChildren:ev.target.value})}}
                    value= {state.numberOfChildren}  placeholder="Number Of Children*" type='number'
                     error={errors.numberOfChildren == ''? false: true} helperText={errors.numberOfChildren}
                    />
                </Grid>
                
            </Grid>
            <Grid item container direction='column'>
                <Typography>Next Of kin Details</Typography>
                <Divider />
            </Grid>
            <Grid item  container direction='row' spacing={2} style={{alignContent: 'stretch'}}>
            <Grid item xs={6}>
                    <Input  name="kinFirstName" 
                    value= {state.kinFirstName} placeholder="First Name "
                    onChange={(ev) => {setState({...state,kinFirstName:ev.target.value})}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input  name='kinLastName' onChange={(ev) => {setState({...state,kinLastName:ev.target.value})}}
                    value= {state.kinLastName}  placeholder="Last Name*" 
                     error={errors.kinLastName == ''? false: true} helperText={errors.kinLastName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input name="kinPhone" 
                    value= {state.kinPhone} placeholder="Phone Number*"
                    onChange={(ev) => {setState({...state,kinPhone:ev.target.value})}}
                    error={errors.kinPhone == ''? false: true} helperText={errors.kinPhone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input name="kinAddress" 
                    value= {state.kinAddress} placeholder="Address *"
                    onChange={(ev) => {setState({...state,kinAddress:ev.target.value})}}
                    error={errors.kinAddress == ''? false: true} helperText={errors.kinAddress}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Input icon={Mail} name='kinMail' onChange={(ev) => {setState({...state,kinMail:ev.target.value})}}
                    value= {state.kinMail}  placeholder="EMail Address*" type='email'
                     error={errors.kinMail == ''? false: true} helperText={errors.kinMail}
                    />
                </Grid>
                <Grid item xs={6}>
                <Select options={relationship} label="Relationship *" 
                onChange={(ev) => {setState({...state,kinRelationship:ev.target.value})}} 
                value={state.kinRelationship} name="kinRelationship"
                error={errors.kinRelationship == ''? false: true} helperText={errors.kinRelationship}/>
                </Grid>
                
            </Grid>
            <Grid item container direction='column'>
                <Typography>Emergency Contact Details</Typography>
                <Divider />
            </Grid>
            <Grid item  container direction='row' spacing={2} justify='space-between'>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Name 1*" 
                    error={errors.emerName1 == ''? false: true} helperText={errors.emerName1}
                    name="emerName1" onChange={(ev) => {setState({...state,emerName1:ev.target.value})}} 
                    value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Address 1*" 
                    error={errors.emerAddress1 == ''? false: true} helperText={errors.emerAddress1}
                    name="emerAddress1" onChange={(ev) => {setState({...state,emerAddress1:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Phone 1*" 
                    error={errors.emerPhone1 == ''? false: true} helperText={errors.emerPhone1}
                    name="emerPhone1" onChange={(ev) => {setState({...state,emerPhone1:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Name 2*" 
                    error={errors.emerName2 == ''? false: true} helperText={errors.emerName2}
                    name="emerName2" onChange={(ev) => {setState({...state,emerName2:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Address 2*" 
                    error={errors.emerAddress2 == ''? false: true} helperText={errors.emerAddress2}
                    name="emerAddress2" onChange={(ev) => {setState({...state,emerAddress2:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Emergency Phone 2*" 
                    error={errors.emerPhone2 == ''? false: true} helperText={errors.emerPhone2}
                    name="emerPhone2" onChange={(ev) => {setState({...state,emerPhone2:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                </Grid>
                
            
           
            <Grid item style={{AlignSelf: 'center'}}>
                {!props.valid &&
                <Button variant='contained' color='primary' size='medium' type='submit'>
                    <Typography>Done</Typography>
                </Button>}
                
            </Grid>
        </Grid>
    </form>);
   
}


export default Form;
