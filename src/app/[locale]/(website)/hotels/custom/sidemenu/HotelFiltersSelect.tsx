import React from 'react';
import { useHotelForm } from '@/lib/hooks/website/hotel.hook';
import {
  PopularConstantFilters as popularSites,
  StayOptionConstant as stayOptions,
  Neighbourhood,
  PaymentTypeConstant as payments,
  PropertyOptionsConstant as properties,
  PropertyTypeConstant as propertyTypes,
  PropertyBrandConstant as brands,
  GuestRatingConstant as guestRating,
  AmenitiesConstant as amenities,
} from '@/lib/constants/website/hotels/side-menu.constant';
import CheckboxGroupField from '@/components/defaults/CheckboxGroupField';
import PriceRangeField from '@/components/defaults/PriceRangeField';
import RadioGroupField from '@/components/defaults/RadioGroupField';
import { IControlItem } from '@/types/default.type';
import HotelRatingControl from '@/components/website/hotels/HotelRatingControl';
import ToggleGroupField from '@/components/defaults/ToggleGroupField';
import ToggleGroup2Field from '@/components/defaults/ToggleGroup2Field';
import { HotelMenuFormSchema } from '@/lib/schemas/website/hotel-page.schema';

const StarRatingList: IControlItem[] = Array.from({ length: 5 }, (_, i) => ({
  value: i,
  name: `Rating-${i}`,
  component: <HotelRatingControl value={i + 1} />,
}));

const HotelFiltersSelect = () => {
  const { hotelFormHook, onSubmit } = useHotelForm();
  const { control, handleSubmit } = hotelFormHook;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-4 items-start'>
        <div className='flex flex-col gap-1 items-start w-full'>
          <CheckboxGroupField<HotelMenuFormSchema>
            name={'popularFilters'}
            label='Popular filters'
            control={control}
            options={popularSites}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-[90%] mb-4'>
          <PriceRangeField<HotelMenuFormSchema>
            name={'totalPriceFilters'}
            label='Total Price'
            control={control}
            min={0}
            max={100000}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <RadioGroupField<HotelMenuFormSchema>
            name='stayOptionFilters'
            label='Stay Options'
            control={control}
            options={stayOptions}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <RadioGroupField<HotelMenuFormSchema>
            name='neigbourhoodFilters'
            label='Neighbourhood'
            control={control}
            options={Neighbourhood}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <CheckboxGroupField<HotelMenuFormSchema>
            name='paymentTypeFilters'
            label='Payment type'
            control={control}
            options={payments}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <CheckboxGroupField<HotelMenuFormSchema>
            name='propertyOptionsFilters'
            label='Property cancellation options'
            control={control}
            options={properties}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <CheckboxGroupField<HotelMenuFormSchema>
            name='propertyTypeFilters'
            label='Property type'
            control={control}
            options={propertyTypes}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <CheckboxGroupField<HotelMenuFormSchema>
            name='propertyBrandFilters'
            label='Property brand'
            control={control}
            options={brands}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <ToggleGroupField<HotelMenuFormSchema>
            name='starRatingFilters'
            label='Star Rating'
            control={control}
            components={StarRatingList}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <RadioGroupField<HotelMenuFormSchema>
            name='guestRatingFilters'
            label='Guest rating'
            control={control}
            options={guestRating}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <ToggleGroup2Field<HotelMenuFormSchema>
            name='amenitiesFilters'
            label='Property brand'
            control={control}
            options={amenities}
          />
        </div>
      </div>
    </form>
  );
};

export default HotelFiltersSelect;
