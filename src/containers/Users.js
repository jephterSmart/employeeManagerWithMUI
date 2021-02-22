import React, {useState}from 'react';
import {CssBaseline} from '@material-ui/core'
import{makeStyles,useTheme} from '@material-ui/core/styles'


import MainHead from '../components/Navigation/MainHeader';
import Drawer from '../components/Navigation/Drawer';
import Content from '../components/Content/content';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center'
    }
  }));

const Users = props => { 
    const classes = useStyles();
    const {match} = props;
    const [open, setOpen] = useState(true);
    
return ( 
    <div className={classes.root}>
      <CssBaseline />
      <MainHead open={open} setOpen={setOpen} header= {match.path}/>
    <Drawer open={open} header = {match.path}/>
      <Content open={open} element= {props.children}/>
          
    </div>);

}


export default Users;