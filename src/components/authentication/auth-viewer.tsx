import React from 'react';
//import { useSelector } from 'react-redux';
//import { useAppSelector } from '@/lib/hooks';

const AuthViewer = () => {
  const authState = true;
  return <div>You are now {authState ? 'Logged In' : 'Logged Out'}</div>;
};

export default AuthViewer;
