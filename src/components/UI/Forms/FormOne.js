import React, {  useState } from 'react';
import {Grid,Button,Typography} from '@material-ui/core';
import {Person,Mail,Phone,Public,Home, } from '@material-ui/icons'

import Input from './Input';
import Select from './Select';
import DatePicker from './DatePicker';

const initialState = {
    lastName: '',
    firstName: '',
    gender: '',
    dateOfBirth:'',
    phoneNumber: '',
    maritalStatus: '',
    personalEmail: '',
    nationality:'',
    currentAddress: '',
    permanentAddress: '',
    states: '',
    town: '',
    otherName: ''
}



const Form = props => { 
    const [date,setDate] = useState(new Date());
     const [state , setState] = useState(initialState);
     const [errors, setErrors] = useState(initialState);
    // const [firstName, setFirstName] = useState('')
    // const [state,dispatch] = useReducer(reducer,initailState) 
    const gender =[{
        id:0,
        value: 'male',
        label: 'Male'
    },{
        id:1,
        value: 'female',
        label: 'Female'
    },
    {
        id:2,
        value: 'other',
        label: "Not specified"
    }
]
const maritalStatus =[{
    id:0,
    value: 'single',
    label: 'Single'
},{
    id:1,
    value: 'married',
    label: 'Married'
},
{
    id:2,
    value: 'other',
    label: "Not specified"
}
];
const validate = () => {
    const helperTextObj = {};
    helperTextObj.firstName = state.firstName ?"" : "First Name is required";
    helperTextObj.lastName = state.lastName ?"" : "Last Name is required";
    helperTextObj.gender = state.gender ?"" : "You have not selected gender";
    helperTextObj.maritalStatus = state.maritalStatus ?"" : "No status have been selected";
    helperTextObj.phoneNumber = state.phoneNumber.length > 9 && parseInt(state.phoneNumber) > 999999999 ?"" 
                        : "Your number is required";
    helperTextObj.personalEmail = (/^.+\@.+\..+/).test(state.personalEmail) ?"" : "An Email is required";
    helperTextObj.dateOfBirth = date  < (new Date() )? '' : "Please put a real Date";
    helperTextObj.nationality = state.nationality ? '' : "Please type your country";
    helperTextObj.currentAddress = state.currentAddress ? '' : "Please input your address";
    helperTextObj.permanentAddress = state.permanentAddress ? '' : "Please input your address";
    helperTextObj.town = state.town ? '' : "Please input your Town";
    helperTextObj.states = state.states ? '' : "Please input your State";
        setErrors({...helperTextObj});
        let see = Object.values(helperTextObj).every(ele => ele === "");
        
    return see

    }

return ( 
    <form style={{margin:0,width:'100%'}}  onSubmit={(ev) => {props.onSubmit(ev,validate,state)}}>

        <Grid container direction='column' spacing={2} >
            <Grid  item container direction='row' spacing={2}>
                
                <Grid item xs={4}>
                    <Input icon={Person} name="firstName" onChange={(ev) => {setState({...state,firstName:ev.target.value})}}
                    value= {state.firstName} placeholder="First Name*" error={errors.firstName == ''? false: true} helperText={errors.firstName}/>
                </Grid>
                <Grid item xs={4}>
                    <Input icon={Person} name='lastName' onChange={(ev) => {setState({...state,lastName:ev.target.value})}}
                    value= {state.lastName}  placeholder="Last Name*"
                    error={errors.lastName == ''? false: true} helperText={errors.lastName}/>
                </Grid>
                <Grid item xs={4}>
                    <Input icon={Person} name='otherName' value={state.otherName} 
                    placeholder="Other Name " onChange={(ev) => {setState({...state,otherName:ev.target.value})}}
                   />
                </Grid> 
            </Grid>
             <Grid item  container direction='row' spacing={2}>
                <Grid item xs={4}>
                <Select options={gender} label="Gender*" onChange={(ev) => {setState({...state,gender:ev.target.value})}} 
                value={state.gender} name="gender"
                error={errors.gender == ''? false: true} helperText={errors.gender}/>
                </Grid>
                <Grid item xs={4}>
                    <Select options={maritalStatus} label="Marital Status*"
                    name='maritalStatus' onChange={(ev) => {setState({...state,maritalStatus:ev.target.value})}} 
                    value={state.maritalStatus} error={errors.maritalStatus == ''? false: true} helperText={errors.maritalStatus}/>
                </Grid>
                <Grid item xs={4}>
                    <Input icon={Mail}  placeholder="Personal Email*"
                    type='email'name='personalEmail' error={errors.personalEmail == ''? false: true}
                     helperText={errors.personalEmail}
                    onChange={(ev) => {setState({...state,personalEmail:ev.target.value})}} value={state.personalEmail}/>
                </Grid>
            </Grid>
            <Grid item  container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <Input icon={Phone} placeholder="Phone Number*" 
                    error={errors.phoneNumber == ''? false: true} helperText={errors.phoneNumber}
                    name="phoneNumber" onChange={(ev) => {setState({...state,phoneNumber:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                   <DatePicker label="Set Date Of Birth *" name="birthDate" value={date}
                    error={errors.dateOfBirth == ''? false: true} helperText={errors.dateOfBirth} 
                   onChange={(date) => setDate(date)} />
                </Grid>
                <Grid item xs={4}>
                    <Input icon={Public} placeholder="Nationality*"
                    error={errors.nationality == ''? false: true} helperText={errors.nationality}
                    name="nationality" value={state.nationality} onChange={(ev) => {setState({...state,nationality:ev.target.value})}} />
                </Grid>

            </Grid>
           
            <Grid item  container direction='row' spacing={2}> 
                <Grid item xs={6}>
                    <Input icon={Home} placeholder="Current Address*"
                    error={errors.currentAddress == ''? false: true} helperText={errors.currentAddress}
                    name="currentAddress" value={state.currentAddress} onChange={(ev) => {setState({...state,currentAddress:ev.target.value})}}/>
                </Grid>
                <Grid item xs={6}>
                    <Input icon={Home} placeholder="Permanent Address*"
                    error={errors.permanentAddress == ''? false: true} helperText={errors.permanentAddress}
                    name="permanentAddress" value={state.permanentAddress} onChange={(ev) => {setState({...state,permanentAddress:ev.target.value})}}/>
                </Grid>    
            </Grid>
            <Grid item  container direction='row' spacing={2}>
                <Grid item xs={6}>
                    <Input icon={Home} placeholder="State*"
                    error={errors.states == ''? false: true} helperText={errors.states}
                    name="states" value={state.states} onChange={(ev) => {setState({...state,states:ev.target.value})}}/>
                </Grid>
                <Grid item xs={6}>
                    <Input icon={Home} placeholder="Town*"
                    error={errors.town == ''? false: true} helperText={errors.town}
                     name="town" value={state.town} onChange={(ev) => {setState({...state,town:ev.target.value})}}/>
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