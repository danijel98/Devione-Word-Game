import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    const user: any = localStorage.getItem("user");
    let userParse:any;

    if (!token) {
        return <Navigate to={{ pathname: '/login' }} />
    }

    if (user) {
         userParse = JSON.parse(user);
    }
  
    return  <Outlet/> ;
}
