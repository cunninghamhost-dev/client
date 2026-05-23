import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ILinkerProps } from '@/types/default.type';
import Link from 'next/link';

interface IBreadcrumbProps {
  linker: ILinkerProps[];
}
const BreadcrumbField = ({ linker }: IBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {linker.length > 0 &&
          linker.map((item, _index) => (
            <BreadcrumbItem key={item.data}>
              <BreadcrumbSeparator />
              {_index !== linker.length - 1 ? (
                <BreadcrumbLink className='text-[#006CE4] text-xs leading-6' asChild>
                  <Link href={item.href}>{item.data}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink className='text-[#1A1A1A] text-xs leading-6'>
                  <Link href={item.href}>{item.data}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbField;
