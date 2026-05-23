'use client';
import React from 'react';
import { setAuthState } from '@/lib/state/authentication/authSlice';
//import { useAppDispatch } from '@/lib/hooks';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';

const AuthUpdater = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex space-x-2'>
      <Button variant={'destructive'} onClick={() => dispatch(setAuthState(true))}>
        Log In
      </Button>
      <Button onClick={() => dispatch(setAuthState(false))}>Log Out</Button>
    </div>
  );
};

export default AuthUpdater;
