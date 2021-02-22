import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Paper, Typography,Grid,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Person,Lock,KeyboardTab} from'@material-ui/icons';
import axios from 'axios';


import Modal from '../../components/UI/Modal/Modal'
import Input from '../../components/UI/Forms/Input';


const useStyles = makeStyles(theme =>({
    summary:{
        width: '90%',
        margin: 'auto',
        position: "absolute",
        backgroundColor:"#42949d",
        color: '#FFF',
        top: '-20px',
        left: '2.5%',
        borderRadius: '4px',
        padding: theme.spacing(1),
        boxShadow:"1px 2px 5px rgba(80,80,80,0.2)",
        textAlign:'center',
      },
      space:{
          height: '30px',
      },
      paper:{
          position:"relative"
      },
      content: {
          width: '80%',
          margin:'auto'
      }


}));
const Login = props => { 
    const classes = useStyles();
    const [password,setPassword] = useState('');
    const [position,setPosition] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [userId,setUserId] = useState('');
    const [name,setName] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState({password:'',userId:'',confirmPassword:'',name:'',position:''});
    let dashboard = null;
    if(redirect) dashboard = <Redirect to='/login'/>
    const validate = () => {
        const helperText = {};
        helperText.userId = (/.+@.+\..+/).test(userId) ? '' : "A valid Email is required";
        helperText.password = password.length > 6  ? '' : "Please specify a password that is more than 6 characters";
        helperText.confirmPassword = confirmPassword === password  ? '' : "Password Do not match";
        helperText.name = name.length ? '' : "Your name is required";
        helperText.position = position.length ? '' : "Your Position is required";
        setErrors({...helperText})
        return Object.values(helperText).every(el => el === '');
    }
    const signupHandler = () =>{
        if(validate()){
            setLoading(true)
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2ORyiA59gCUPczCTS1fUzhkWwnhO2HFk'
            axios.post(url,{email:userId,password:password,returnSecureToken:true})
            .then(response => {
              return axios.post('https://employee-manager-js-default-rtdb.firebaseio.com/userinfo.json',
              {name: name,position:position,userId:response.data.localId}) 
            })
            .then(data => {
                setLoading(false);
                
                setRedirect(true);
            })
            .catch(err => {
                setLoading(false)
                setMessage(err.response ? err.response.data.error.message: 'No Network');
            })
            
        }
    }
    
return ( 
    
        <Modal show= {true}  >
        <Paper className={classes.paper} elevation={5}>
      <div className={classes.space}/>
      <div className={classes.summary} >Create Account</div>
      <div className={classes.content}>
          {dashboard}
            <Grid container direction='column' spacing={5} justify='space-between' alignItems='center'>
                <Typography style={{marginTop:'20px', textTransform:'capitalize',color:'red'}}>{message}</Typography>
                <Grid container item direction='column' spacing={2}>
                <Grid container direction='row' spacing={1} justify='space-between'>
                    <Grid item xs={6}>
                    <Input icon={Person} placeholder="Your Name*" 
                    error ={errors.name === ''? false : true} helperText={errors.name}
                    value={name} onChange={(ev) =>{setName(ev.target.value)}}/>
                    </Grid>
                    <Grid item xs={6}>
                    <Input icon={Person} placeholder="Your Position*" 
                    error ={errors.position === ''? false : true} helperText={errors.position}
                    value={position} onChange={(ev) =>{setPosition(ev.target.value)}}/>
                    </Grid>
                </Grid>
                <Input icon={Person} placeholder="Email " 
                error ={errors.userId === ''? false : true} helperText={errors.userId}
                value={userId} onChange={(ev) =>{setUserId(ev.target.value)}}/>
                
                <Input icon={Lock} type='password'value={password} 
                error ={errors.password === ''? false : true} helperText={errors.password}
                onChange={(ev) =>{setPassword(ev.target.value)}}
                placeholder='Password' />
                <Input icon={Lock} type='password'value={confirmPassword} 
                error ={errors.confirmPassword === ''? false : true} helperText={errors.confirmPassword}
                onChange={(ev) =>{setConfirmPassword(ev.target.value)}}
                placeholder='Confirm Password' />
                </Grid>
                <Grid item style={{ width:'100%'}}>
                    
                    <Button variant='contained' color='primary' fullWidth disabled={loading}
                    onClick={signupHandler}
                    style={{margin:'24px 0'}}>
                        Sign Up   <KeyboardTab/>
                    </Button>
                   
                    
                </Grid>
            </Grid>
      </div>
      </Paper>
        </Modal>
    
    
    );

}


export default Login;