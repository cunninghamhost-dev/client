import React from 'react';
//import './auth-style.css';
import WelcomeContent from './WelcomeSection';
import { ITabItem } from '@/types/default.type';
import AuthenticationForm from './AuthenticationForm';
import LoginForm from './custom/LoginForm';
import RegistrationForm from './custom/RegistrationForm';

const Authentication = () => {
  const authTabs: ITabItem[] = [
    {
      value: 'login',
      label: 'Login',
      content: <LoginForm />,
    },
    {
      value: 'signup',
      label: 'Signup',
      content: <RegistrationForm />,
    },
  ];
  return (
    <div className='auth-wrapper'>
      <div className='auth-content'>
        <AuthenticationForm tabs={authTabs} />
      </div>
      <div className='hidden md:block bg-[#F5F5F5] text-black w-full mx-auto p-12'>
        <WelcomeContent />
      </div>
    </div>
  );
};

export default Authentication;
