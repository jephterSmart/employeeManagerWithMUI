import React from 'react';

import {Route,withRouter, Redirect, Switch} from 'react-router-dom';

import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SignUp from './Auth/SignUp';
import AddEmployee from  './AddEmployee';
import Users from './Users';
import EmployeeManager from '../components/Content/employeeManager'
import DashboardView from '../components/Content/Dashboard'


const App = props => { 
   const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    
    let routes = (
        <>
          <Switch>
          <Route path= '/login' exact render = {(props) => <Login {...props}onLogIn={setIsAuthenticated}/>}/>
          <Route path= '/signUp' component = {SignUp}/>
           <Redirect to='/login' />
          </Switch>
          
        </>
    )
   
   
    
    if(isAuthenticated || localStorage.getItem('idToken') != null){
      routes=(
        <>
          <Switch>
         <Route path='/logout' render={(props) =><Logout {...props} onLogOut={setIsAuthenticated}/>} />
        
          <Route path = '/user' render={(props) => (<Users {...props}>{DashboardView}</Users>)} />
          <Route path= '/addEmployee'  render={(props) => (<Users {...props}>{AddEmployee}</Users>)}/>
          <Route path= '/employeeManager'  render={(props) => (<Users {...props}>{EmployeeManager}</Users>)}/>
          

           <Redirect to='/user' />
     
          </Switch>
          
        </>
      )
    }
return ( 
    <div>
    {routes}
    </div>
    );

}


export default App