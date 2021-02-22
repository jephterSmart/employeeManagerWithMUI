import React from 'react';
import {Redirect }from 'react-router-dom';


const Logout = props => {
    localStorage.removeItem('idToken') 
    localStorage.removeItem('userId') 
    localStorage.removeItem('refreshId') 
    localStorage.removeItem('expirationDate') 
    const logOut =  props.onLogOut
    React.useEffect(()=>{
        return () => {
           logOut(false);
        }
    },[])
return ( 
    <Redirect to='/login'/>
    );

}


export default Logout;