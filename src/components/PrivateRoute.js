// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({children,user}) => {
    console.log('user',user)
    console.log('children',children)
    console.log('children[1]',children[1])
  return children[1] ? (
    children[0]
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;