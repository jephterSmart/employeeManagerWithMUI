import React from 'react';

import {makeStyles,useTheme} from '@material-ui/core/styles';

import clsx from 'clsx';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      
}));

const Content = props => { 
    const classes = useStyles();
   
    const {open} = props;
return ( 
    <main
    className={clsx(classes.content, {
      [classes.contentShift]: open,
    })}
  >
    <div className={classes.drawerHeader} />
    <props.element />
    
    
  </main>);

}


export default Content;