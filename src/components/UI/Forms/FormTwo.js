import { Divider,Grid,Typography,Button} from '@material-ui/core';
import {Mail,BrandingWatermark,} from '@material-ui/icons';
import React,{useState} from 'react';

import Input from './Input';
import Select from './Select';
import DatePicker from './DatePicker';


//helper function to help me create unique Id for customer
const createId = () =>{
    const mapLetter= {
        1:'A',2:'B',3:'C',4:'D',5:'E',6:'F',7:'G',8:'H',9:'I',10:'J',11:'K',12:'L',13:'M',14:'N',15:'O',16:'P',
        17:'Q',18:'R',19:'S',20:'T',21:'U',22:'V',23:'W',24:'X',25:'Y',26:'Z' 
    }
    let retStr = '';
    for(let i = 1; i < 12; i++){
        if(i % 3  === 0)
        retStr += mapLetter[Math.floor((Math.random() *  26) )+ 1];
        else if(i % 4 === 0)
        retStr += mapLetter[Math.floor((Math.random() *  26)) + 1].toLowerCase();
        else retStr += Math.floor((Math.random() * 9)) + 1;


    }
    return retStr;
    
}
const initialState = {
    staffId: createId(),
    officeMail: '',
    employmentType: '',
    employeeDesignation: '',
    employeeDepartment: '',
    employeeStatus:'',
    employeeConfirmation:'',
    employeeLocation:'',
    grossSalary:'',
    dateOfEmployment: 0,
    dateOfLeaving:0,
    referreName1: '',
    referreAddress1:'',
    referrePhone1:'',
    referreName2: '',
    referreAddress2:'',
    referrePhone2:''

}



const Form = props => { 
    const [employmentDate,setEmploymentDate] = useState(new Date());
    const [leavingDate,setLeavingDate] = useState(new Date());
     const [state , setState] = useState(initialState);
     const [errors, setErrors] = useState(initialState);
    
    const employmentType =[{
        id:0,
        value: 'kgc',
        label: 'KGC Employment'
    },{
        id:1,
        value: 'nysc',
        label: 'NYSC'
    },
    {
        id:2,
        value: 'contract',
        label: 'Contract'
    },
    {
        id:3,
        value: 'others',
        label: "Others"
    }
];
const employeeDesignation =[{
    id:0,
    value: 'headOfDepartment',
    label: 'Head Of Department'
},{
    id:1,
    value: 'manager',
    label: 'Manager'
},
{
    id:3,
    value: 'assistant',
    label: "Assistant"
},{
    id:4,
    value:'hiringManager',
    label:'Hiring Manager'
},{
    id:5,
    value:'others',
    label:'Others'
}
];
const employeeDepartment =[{
    id:0,
    value: 'engineering',
    label: 'Engineering'
},{
    id:1,
    value: 'businessAdmin',
    label: 'Businees Administrator'
},
{
    id:4,
    value: 'lawyer',
    label: "Lawyer"
},{
    id:10,
    value:'hiringManager',
    label:'Hiring Manager'
},{
    id:5,
    value:'others',
    label:'Others'
}
];
const employeeStatus = [{
    id:0,
    value:'available',
    label:'Available'
},{
    id:1,
    value:'notAvailable',
    label:'Not Available'
}];
const employeeConfirmation =[{
    id:0,
    label:'Ready',
    value:'ready'
},{
    id:1,
    label:'Others',
    value:'others'
}];
const employeeLocation =[{
    id:10,
    label:'Delta',
    value:'delta',
},{
    id:11,
    label:"Lagos",
    value:'lagos'
},{
    id:12,
    label:"Port Harcourt",
    value:'portHarcourt'
},{
    id:13,
    value:'others',
    label:'Others'
}]
const validate = () => {
    const helperTextObj = {};
    helperTextObj.grossSalary = state.grossSalary > 1000?'':"Money too low";
    helperTextObj.referreName1 = state.referreName1 ?"" : "Referree Name is required";
    helperTextObj.referreName2 = state.referreName2 ?"" : "Referree Name is required";
    helperTextObj.referreAddress1 = state.referreAddress1 ?"" : "Referree Address is required";
    helperTextObj.referreAddress2 = state.referreAddress2 ?"" : "Referree Address is required";
    
    helperTextObj.referrePhone1 = state.referrePhone1.length > 9 && parseInt(state.referrePhone1) > 999999999 ?"" 
                        : "Referree number is required";
    helperTextObj.referrePhone2 = state.referrePhone2.length > 9 && parseInt(state.referrePhone2) > 999999999 ?"" 
                        : "Referree number is required";
    helperTextObj.officeMail = (/.+\@.+\..+/).test(state.officeMail) ?"" : "An Email is required";
    helperTextObj.dateOfEmployment = employmentDate  > new Date()  ? '' : "Please put a real Date";
    helperTextObj.dateOfLeaving = leavingDate  > new Date()  ? '' : "Please put a real Date";
    helperTextObj.employmentType = state.employmentType ?"" : "You have not made a sealection";
    helperTextObj.employeeConfirmation = state.employeeConfirmation ?"" : "No Selection has been made";
    helperTextObj.employeeDesignation = state.employeeDesignation ? '' : "No Selection has been made";
    helperTextObj.employeeStatus = state.employeeStatus ? '' : "No Status has been choosen";
    helperTextObj.employeeLocation = state.employeeLocation ? '' : "Please input your address";
    helperTextObj.employeeDepartment= state.employeeDepartment ? '' : "Please Select your Department";
    
        setErrors({...helperTextObj});
        
        let see = Object.values(helperTextObj).every(ele => ele === "");
        
    return see;

    }
 

return ( 
    <form style={{margin:0,width:'100%'}} autoComplete="false" onSubmit={(ev) => {props.onSubmit(ev,validate,state)}}>

        <Grid container direction='column' spacing={2} >
            <Grid  item container direction='row' spacing={2}>
                
                <Grid item xs={6}>
                    <Input icon={BrandingWatermark} name="enterStaffId" 
                    value= {state.enterStaffId} placeholder={`Your StaffId is ${state.staffId}`}
                    disabled/>
                </Grid>
                <Grid item xs={6}>
                    <Input icon={Mail} name='officeMail' onChange={(ev) => {setState({...state,officeMail:ev.target.value})}}
                    value= {state.officeMail}  placeholder="Office Mail*" type='email'
                    error={errors.officeMail == ''? false: true} helperText={errors.officeMail}
                    />
                </Grid>
                
            </Grid>
            <Grid item  container direction='row' spacing={2} style={{alignContent: 'stretch'}}>
              <Grid item xs={4}>
                <Select options={employmentType} label="Employment Type*" 
                onChange={(ev) => {setState({...state,employmentType:ev.target.value})}} 
                value={state.employmentType} name="employmentType"
                error={errors.employmentType == ''? false: true} helperText={errors.employmentType}/>
              </Grid>
              <Grid item xs={4}>
                <Select options={employeeDesignation} label="Employee Designation*" 
                onChange={(ev) => {setState({...state,employeeDesignation:ev.target.value})}} 
                value={state.employeeDesignation} name="employeeDesignation"
                error={errors.employeeDesignation == ''? false: true} helperText={errors.employeeDesignation}/>
              </Grid>
              <Grid item xs={4}>
                <Select options={employeeDepartment} label="Employee Department*" 
                onChange={(ev) => {setState({...state,employeeDepartment:ev.target.value})}} 
                value={state.employeeDepartment} name="employeeDepartment"
                error={errors.employeeDepartment == ''? false: true} helperText={errors.employeeDepartment}/>
              </Grid>
              <Grid item xs={4}>
                <Select options={employeeStatus} label="Employee Status*" 
                onChange={(ev) => {setState({...state,employeeStatus:ev.target.value})}} 
                value={state.employeeStatus} name="employeeStatus"
                error={errors.employeeStatus == ''? false: true} helperText={errors.employeeStatus}/>
              </Grid>
              <Grid item xs={4}>
                <Select options={employeeConfirmation} label="Employee Confirmation*"
                 onChange={(ev) => {setState({...state,employeeConfirmation:ev.target.value})}} 
                value={state.employeeConfirmation} name="employeeConfirmation"
                error={errors.employeeConfirmation == ''? false: true} helperText={errors.employeeConfirmation}/>
              </Grid>
              <Grid item xs={4}>
                <Select options={employeeLocation} label="Employee Location*" 
                onChange={(ev) => {setState({...state,employeeLocation:ev.target.value})}} 
                value={state.employeeLocation} name="employeeLocation"
                error={errors.employeeLocation == ''? false: true} helperText={errors.employeeLocation}/>
              </Grid>
              <Grid item xs={4}>
                    <Input  placeholder="Gross Salary*" 
                    error={(errors.grossSalary == 0 || errors.grossSalary=='')? false: true} helperText={errors.grossSalary}
                    name="grossSalary" onChange={(ev) => {setState({...state,grossSalary:ev.target.value})}} 
                    value={state.grossSalary}/>
                </Grid>
              <Grid item xs={4}>
                   <DatePicker label="Set Date Of Employment *" name="employentDate" value={employmentDate}
                    error={errors.dateOfEmployment == ''? false: true} helperText={errors.dateOfEmployment} 
                   onChange={ date => setEmploymentDate(date)} />
                </Grid>
              <Grid item xs={4}>
                   <DatePicker label="Set Date Of Leaving *" name="leavingDate" value={leavingDate}
                    error={errors.dateOfLeaving == ''? false: true} helperText={errors.dateOfLeaving} 
                   onChange={date => setLeavingDate(date)} />
                </Grid>
                
            </Grid>
            <Grid item>
                <Typography>Referee Details</Typography>
                <Divider/>
            </Grid>
            <Grid item  container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Name 1*" 
                    error={errors.referreName1 == ''? false: true} helperText={errors.referreName1}
                    name="referreName1" onChange={(ev) => {setState({...state,referreName1:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Address 1*" 
                    error={errors.referreAddress1 == ''? false: true} helperText={errors.referreAddress1}
                    name="referreAddress1" onChange={(ev) => {setState({...state,referreAddress1:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Phone 1*" 
                    error={errors.referrePhone1 == ''? false: true} helperText={errors.referrePhone1}
                    name="referrePhone1" onChange={(ev) => {setState({...state,referrePhone1:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Name 2*" 
                    error={errors.referreName2 == ''? false: true} helperText={errors.referreName2}
                    name="referreName2" onChange={(ev) => {setState({...state,referreName2:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Address 2*" 
                    error={errors.referreAddress2 == ''? false: true} helperText={errors.referreAddress2}
                    name="referreAddress2" onChange={(ev) => {setState({...state,referreAddress2:ev.target.value})}} value={state.phoneNumber}/>
                </Grid>
                <Grid item xs={4}>
                    <Input  placeholder="Referre Phone 2*" 
                    error={errors.referrePhone2 == ''? false: true} helperText={errors.referrePhone2}
                    name="referrePhone2" onChange={(ev) => {setState({...state,referrePhone2:ev.target.value})}} value={state.phoneNumber}/>
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
