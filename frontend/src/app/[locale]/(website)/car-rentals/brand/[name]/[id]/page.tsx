import React from 'react';
import ProfileMenu from '../../component/ProfileMenu';
import CarTopMenu from '../../component/CarTopMenu';

interface ICarRentalBrandProps {
  params: Promise<{
    name: string;
    id: string;
  }>;
}

const CarRentalBrandPage = async ({ params }: ICarRentalBrandProps) => {
  const { name, id } = await params;

  return (
    <main className='min-h-screen w-full flex items-start justify-center'>
      <div className='relative max-w-[1400px] w-full py-0 flex flex-col gap-0 items-center justify-center'>
        <CarTopMenu />
        {/* <RevertProfile /> */}
        <ProfileMenu name={name} id={id} />
      </div>
    </main>
  );
};

export default CarRentalBrandPage;
