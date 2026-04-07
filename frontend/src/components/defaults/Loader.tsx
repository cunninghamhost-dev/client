import React from 'react';

export default function Loader() {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-white bg-opacity-60 z-50 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 border-solid'></div>
    </div>
  );
}
