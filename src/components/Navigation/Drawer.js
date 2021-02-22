import React ,{useState,useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Drawer as MUIDrawer, Grid, Accordion, Button,Typography,AccordionDetails,AccordionSummary} from '@material-ui/core';
import {Dashboard,PeopleAlt,CreditCard, ExpandMore,AccountCircle,Work, Person} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios'



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      paddingTop: theme.spacing(3)
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: '2px 0 8px rgba(50,50,50,0.6)'
    },
    btn:{
        margin: '12px 0',
        '& .MuiButton-label,':{
            textAlign:"left",
            textDecoration: 'none'
        },
        '&:hover, &:active': {
            backgroundColor: theme.palette.primary.main,
            color:"white",
            boxShadow:'2px 0 8px rgba(50,50,50,0.6)',
            borderRadius:`${theme.spacing(0.5)}px`
        },
        
    
    },
    active:{
            backgroundColor: `${theme.palette.primary.main} !important`,
            color:"#fff !important",
            boxShadow:'2px 0 8px rgba(50,50,50,0.6) !important',
            borderRadius:`${theme.spacing(0.5)}px !important`
    },
    
    root:{justifyContent:'start', 
    display: 'flex', 
    boxShadow:'none', 
    backgroundColor:"transparent"},
    Accordion: {
      boxShadow:"none",
      backgroundColor:'transparent',
      margin:'24px 0',
      
      
    },
    AccordionSummary:{

        
         borderLeft:`2px solid ${theme.palette.secondary.main}`,
         borderRadius:`${theme.spacing(0.5)}px`,
         backgroundColor:'transparent', 
         marginLeft: `${theme.spacing(1)}px`,
         minHeight: '0 !important',
         '&:hover, &:active':{
          backgroundColor: `${theme.palette.primary.main} !important`,
          color:"#fff !important",
          boxShadow:'2px 0 8px rgba(50,50,50,0.6) !important',
          borderRadius:`${theme.spacing(0.5)}px !important`
         },
      },
      hover:{
        '&:hover, &:active':{
          backgroundColor: `${theme.palette.primary.main} !important`,
          color:"#fff !important",
          boxShadow:'2px 0 8px rgba(50,50,50,0.6) !important',
          borderRadius:`${theme.spacing(0.5)}px !important`
         }
      },
    AccordionSummaryContent:{
     margin:'0 !important',
     
    }
     
    
  }));

const Drawer = props => {
    const [collapseFullName,setCollapseFullName] = useState(true); 
    const [collapseResources,setCollapseResources] =useState(true);
    const [collapseFinance,setCollapseFinance] =useState(true);
    const [dashboardClicked,setDashboardClicked] = useState(false);
    const [employeeClicked,setEmployeeClicked] = useState(false);
    const [userDetail,setUserDetail] = useState({});
    let {header} = {props}
    useEffect(() => {
      if(header ==='/user' || props.match.path ==='/user'){
        setDashboardClicked(true);
        setEmployeeClicked(false);
      }  
    },[props.match.path])
    useEffect(() => {
       let token = localStorage.getItem('idToken');
       let userId = localStorage.getItem('userId');
        axios.get('https://employee-manager-js-default-rtdb.firebaseio.com/userinfo.json?auth='+ token)
        .then(response => {
          let userInfo;
          for(let key in response.data){
            userInfo = response.data[key];
            if(userInfo.userId === userId){
              setUserDetail(userInfo);
            }
          }
          
        })
        .catch(err => {

        })
    },[]);
    const classes = useStyles();
    
    
return ( 
    
        <MUIDrawer 
        anchor="left" variant="persistent" open={props.open} 
        className={classes.drawer}
        classes={{paper: classes.drawerPaper}}
        elevation={20}>
           <Grid container > 
           <Grid item xs={1} style={{height:'30px'}}/>
            <Grid  spacing={3} container direction='column' >
                <Grid container direction='column' justify='space-between' alignItems='center'>
                  <Grid item>
                     <Typography component='span'><Work /> KINGSOOERP</Typography>
                  </Grid>
                   <Grid item style={{marginTop:8}}>
                     <Typography style={{fontWeight:'600',
                     textAlign:'center',
                     }}>{ userDetail.position}</Typography>
                     </Grid> 
                    
                </Grid>
                <Grid item>
            <Accordion classes={{root:classes.Accordion,}} square  
            onChange={(e,expanded) => {setCollapseFullName(!expanded)}}>
            <AccordionSummary 
            classes={{content:classes.AccordionSummaryContent}}
          expandIcon={<ExpandMore />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={clsx({[classes.AccordionSummary]:!collapseFullName,[classes.hover]:collapseFullName})}
        >
          <Person style={{backgroundColor:"#e4827d", color:"white",width: 30,
                     height: 30, transform:'translateZ(4)',
                     borderRadius: '50%',boxShadow:"1px 2px 5px rgba(80,80,80,0.45)"}} /> <Typography component='span' style={{textAlign:"center",
          display:'inline-block',width:'70%',fontWeight:600}}>{userDetail.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Button variant="contained" classes={{root:classes.root}} className={classes.btn}>
                <span>EM</span><span style={{fontSize: '12px',textTransform: 'none'}}>Empoyees Management</span>
            </Button>
        </AccordionDetails>
      </Accordion>
                </Grid>
                <Grid item >
                 <Link
                  to='/user'
                  style={{textDecoration:'none'}}> 
                <Button onClick={() => {setDashboardClicked(true); setEmployeeClicked(false)}}
                variant="contained" classes={{root:classes.root
                }}
                 fullWidth className={clsx(classes.btn,dashboardClicked && classes.active)}
                 >
                    
                    <Dashboard /> <span>DashBoard</span>
                    
                </Button>
                </Link>
            
      <Accordion classes={{root:classes.Accordion}}square  
      onChange={(e,expanded) => {setCollapseResources(!expanded)}}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{content:classes.AccordionSummaryContent}}
          className={clsx({[classes.AccordionSummary]:!collapseResources,[classes.hover]:collapseResources})}
        >
          <PeopleAlt /> <Typography component='span'>Human Resources</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Link
               to='/employeeManager'
               style={{textDecoration:'none '}}> 
            <Button variant="contained"
            onClick={() => {setEmployeeClicked(true);setDashboardClicked(false)}}
             classes={{root:classes.root}} className={clsx(classes.btn,employeeClicked && classes.active)}>
            <Work />   <span style={{fontSize: '12px',textTransform: 'none',
            }}>Empoyees Management</span>
                </Button>
              </Link>
        </AccordionDetails>
      </Accordion>
      <Accordion square classes={{root:classes.Accordion}}
      onChange={(e,expanded) => {setCollapseFinance(!expanded)}}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1b-header"
          classes={{content:classes.AccordionSummaryContent}}
          className={clsx({[classes.AccordionSummary]:!collapseFinance,[classes.hover]:collapseFinance})}
        >
          <CreditCard /> <Typography component='span'>Finance</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Button variant="contained" classes={{root:classes.root}} className={classes.btn}>
            <span>EM</span><span style={{fontSize: '12px',textTransform: 'none'}}>Empoyees Management</span>
            </Button>
        </AccordionDetails>
      </Accordion>
      
               </Grid>
            </Grid>
            <Grid xs={1} item/>
            </Grid>
        
        </MUIDrawer>
    
    );

}


export default withRouter(Drawer);
