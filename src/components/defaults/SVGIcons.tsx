import React from 'react';
import { TSVGIconProps } from '@/types/default.type';
import Image from 'next/image';

const SVGIcon: React.FC<TSVGIconProps> = ({ fileName, alt, className, width = 24, height = 24 }) => {
  const imageSrc = `/images/icons/${fileName}`;
  return <Image src={imageSrc} alt={alt} width={width} height={height} className={className} />;
};

export default SVGIcon;
