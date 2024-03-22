import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      return children;
    }else{
      return <Navigate to="/signin" />
    }
  }
  
export default PrivateRoute;

// import React from "react";
// import { Route, Redirect } from 'react-router-dom'

// // const PrivateRoute = (props) => {
// //     return <Route {...props} />
// // }

// // export default PrivateRoute;

// const PrivateRoute = ({component: Component, ...rest}) => {
//     return <Route {...rest} component={(props) => {
//         const token = window.localStorage.getItem('token');
//         if(token){
//             return <Component {...props} />
//         }else{
//             return <Redirect to={`/signin`} />
//         }
//     }}/>
// }

// export default PrivateRoute;



