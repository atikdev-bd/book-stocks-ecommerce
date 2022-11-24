import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Loader from '../Pages/Shared/Loader/Loader';

const PrivetRoute = ({children}) => {
    const location = useLocation();
  const { user,loading} = useContext(AuthContext);
  if(loading){
    return <Loader></Loader>
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivetRoute;