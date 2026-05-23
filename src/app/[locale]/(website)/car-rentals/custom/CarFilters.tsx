'use client';
import CheckboxGroupField from '@/components/defaults/CheckboxGroupField';
import {
  ConstAirportPickupFilters,
  ConstCapacityFilters,
  ConstCarTypeFilters,
  ConstElectricCarsFilters,
  ConstPaymentOptionFilters,
  ConstPickupSaveTimeFilters,
  ConstRentalCarCompanyFilters,
  ConstSpecificationsFilters,
  ConstTotalPriceFilters,
  ConstTravellerRatingsFilters,
  ConstExclusiveOffersFilters as offers,
} from '@/lib/constants/website/carrentals/cars-sidemenu.constant';
import { useCarRentalForm } from '@/lib/hooks/website/carrentals.hook';
import { TCarRentalMenuFormSchema } from '@/lib/schemas/website/carrental.schema';
import React from 'react';

const CarFilters = () => {
  const { carRentalFormHook, onSubmit } = useCarRentalForm();
  const { control, handleSubmit } = carRentalFormHook;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-2 items-start'>
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='exclusive_offers'
          control={control}
          options={offers.map((obj) => obj.title)}
          label='Exclusive Offers'
          description={offers.map((obj) => obj.description)}
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='carType'
          control={control}
          options={ConstCarTypeFilters}
          label='Car type'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='capacity'
          control={control}
          options={ConstCapacityFilters}
          label='Capacity'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='electric_cars'
          control={control}
          options={ConstElectricCarsFilters}
          label='Electric cars'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='pickup_savetime'
          control={control}
          options={ConstPickupSaveTimeFilters}
          label='Save time during pick-up'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='traveller_rating'
          control={control}
          options={ConstTravellerRatingsFilters}
          label='Traveler ratings'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='payment_option'
          control={control}
          options={ConstPaymentOptionFilters}
          label='Payment Option'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='total_price'
          control={control}
          options={ConstTotalPriceFilters}
          label='Total price'
          showMoreStatus
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='rental_car_company'
          control={control}
          options={ConstRentalCarCompanyFilters}
          label='Rental car company'
          showMoreStatus
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='airport_pickup'
          control={control}
          options={ConstAirportPickupFilters}
          label='Airport pick-up'
        />
        <CheckboxGroupField<TCarRentalMenuFormSchema>
          name='specifications'
          control={control}
          options={ConstSpecificationsFilters}
          label='Specifications'
          showMoreStatus
        />
      </div>
    </form>
  );
};

export default CarFilters;
