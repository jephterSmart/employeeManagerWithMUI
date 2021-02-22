import React,{useState} from 'react';
import {Redirect,Link} from 'react-router-dom';
import {Paper, Typography,Grid,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Person,Lock,KeyboardTab} from'@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';

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
      disabled:{
          cursor:'not-allowed'
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
    const [userId,setUserId] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState({password:'',userId:''})
    let dashboard = null;
    if(redirect) dashboard = <Redirect to='/user'/>
    
    const validate = () => {
        const helperText = {};
        helperText.userId = (/.+@.+\..+/).test(userId) ? '' : "A valid Email is required";
        helperText.password = password.length  ? '' : "Please specify a password";
        setErrors({...helperText})
        return Object.values(helperText).every(el => el === '');
    }
    const loginHandler = () =>{

        if(validate()){
            setLoading(true)
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2ORyiA59gCUPczCTS1fUzhkWwnhO2HFk'
            axios.post(url,{email:userId,password:password,returnSecureToken:true})
            .then(response => {
                setLoading(false);
                localStorage.setItem('userId',response.data.localId);
                localStorage.setItem('idToken',response.data.idToken);
                localStorage.setItem('refreshId',response.data.refreshToken);
                localStorage.setItem('expirationDate',new Date(response.data.expiresIn*1000 + new Date().getMilliseconds()));
               
                setRedirect(true);
            })
            .catch(err => {
                setLoading(false)
                setMessage(err.response ? err.response.data.error.message: 'No Network');
            })
            
        }
    }
    const logIn =  props.onLogIn
    React.useEffect(()=>{
        return () => {
           logIn(true);
        }
    },[])
return ( 
    
        <Modal show= {true}  >
        <Paper className={classes.paper} elevation={5}>
      <div className={classes.space}/>
      <div className={classes.summary} >Login</div>
      <div className={classes.content}>
          {dashboard}
            <Grid container direction='column' spacing={5} justify='space-between' alignItems='center'>
                <Typography style={{marginTop:'20px', textTransform:'capitalize',color:'red'}}>{message}</Typography>
                <Grid container item direction='column' spacing={2}>
                <Input icon={Person} placeholder="Email " 
                error ={errors.userId === ''? false : true} helperText={errors.userId}
                value={userId} onChange={(ev) =>{setUserId(ev.target.value)}}/>
                <Input icon={Lock} type='password'value={password} 
                error ={errors.password === ''? false : true} helperText={errors.password}
                onChange={(ev) =>{setPassword(ev.target.value)}}
                placeholder='Password' />
                </Grid>
                <Grid item style={{ width:'100%'}}>
                    
                    <Button variant='contained' color='primary' fullWidth disabled={loading}
                    className={clsx(loading && classes.disabled)}
                    onClick={loginHandler}
                    style={{margin:'24px 0'}}>
                        Let&apos;s Go   <KeyboardTab/>
                    </Button>
                   <div>
                    <Typography style={{textAlign:'center'}}>Forget Your Password?</Typography>
                    <Typography style={{textAlign:'center'}}>Don't have an Account?
                     <Link to='/signUp' >Create</Link></Typography>
                    </div>
                </Grid>
            </Grid>
      </div>
      </Paper>
        </Modal>
    
    
    );

}


export default Login;