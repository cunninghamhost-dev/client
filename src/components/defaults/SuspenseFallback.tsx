import React from 'react';

const SuspenseFallback = ({ title }: { title: string }) => {
  return (
    <div className='p-4 bg-blue-50 rounded-lg animate-pulse'>
      <h2 className='text-xl font-bold text-gray-600'>{`Loading ${title}...`}</h2>
      <div className='h-4 bg-gray-300 rounded w-3/4 mt-2'></div>
      <div className='h-4 bg-gray-300 rounded w-1/2 mt-2'></div>
      <div className='h-4 bg-gray-300 rounded w-2/3 mt-2'></div>
    </div>
  );
};

export default SuspenseFallback;
