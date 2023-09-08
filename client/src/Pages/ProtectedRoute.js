import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

function ProtectedRoute({component:Component, ...rest}) {
    const {loggedIn}=useAuth();
  return (
    <Route {...rest} render={(props)=>{
        if(loggedIn){
            return <Component {...props} />;
        }
        return <Redirect to={{pathname: "/signin"}} />
    }}/>
  )
}

export default ProtectedRoute