import React, { Suspense } from 'react';
import PasscodeForm from './PasscodeForm';

export default function PasscodeVerificationPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center min-h-screen'>Loading...</div>}>
      <PasscodeForm />
    </Suspense>
  );
}
