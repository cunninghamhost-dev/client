import IconWrapper from '@/components/defaults/IconWrapper';
import { TDefaultData } from '@/types/default.type';
import React from 'react';

const AmenityContent = ({ label, icon, color }: TDefaultData) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3 w-full'>
      <IconWrapper icon={icon} className={`text-${color}`} />
      <h6 className='font-bold text-[9px] leading-[12px] text-center'>{label}</h6>
    </div>
  );
};

export default AmenityContent;
