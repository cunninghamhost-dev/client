import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const ImportantInformation = () => {
  return (
    <Card>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[#191E3B]'>
          <div className='col-span-1'>
            <h2 className='text-lg md:text-xl lg:text-2xl leading-normal md:leading-7 lg:leading-8'>
              Important information
            </h2>
          </div>
          <div className='col-span-2 flex flex-col gap-4 items-start'>
            <div className='block space-y-2 w-full'>
              <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>Fees</h3>
              <span className='text-[0.9rem] leading-4'>
                You&apos;ll be asked to pay the following charges at the property. Fees may include applicable taxes:
              </span>
              <div className='my-4 px-4'>
                <ul className='list-disc text-[0.9rem] leading-5'>
                  <li>
                    A tax is imposed by the city: EUR 5.53 per person, per night. This tax does not apply to children
                    under 18 years of age.
                  </li>
                </ul>
              </div>
              <span className='text-[0.9rem] leading-4'>
                We have included all charges provided to us by the property.
              </span>
            </div>
            <div className='block space-y-2 w-full'>
              <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>Optional extras</h3>
              <div className='mt-2 mb-4 px-4'>
                <ul className='list-disc text-[0.9rem] leading-5'>
                  <li className='my-2'>
                    Fee for buffet breakfast: approximately EUR 11.90 to 13.70 for adults, and EUR 4.50 to 4.50 for
                    children
                  </li>
                  <li className='my-2'>Covered self parking fee: EUR 10 per night</li>
                  <li className='my-2'>Pet fee: EUR 6 per pet, per night</li>
                  <li className='my-2'>Service animals are exempt from fees</li>
                </ul>
              </div>
              <span className='text-[0.9rem] leading-4'>
                The above list may not be comprehensive. Fees and deposits may not include tax and are subject to
                change.
              </span>
            </div>
            <div className='block space-y-4 w-full'>
              <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>You need to know</h3>
              <div className='flex flex-col gap-4 text-[0.9rem] leading-4'>
                <span>Extra-person charges may apply and vary depending on property policy</span>
                <span>
                  Government-issued photo identification and a credit card, debit card, or cash deposit may be required
                  at check-in for incidental charges
                </span>
                <span>
                  Special requests are subject to availability upon check-in and may incur additional charges; special
                  requests cannot be guaranteed
                </span>
                <span>This property accepts credit cards; cash is not accepted</span>
              </div>
            </div>
            <div className='block space-y-4 w-full'>
              <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>We should mention</h3>
              <div className='flex flex-col gap-4 text-[0.9rem] leading-4'>
                <span>
                  Cash transactions at this property cannot exceed EUR 1000, due to national regulations; for further
                  details, please contact the property using information in the booking confirmation
                </span>
                <span>Parking height restrictions apply</span>
              </div>
            </div>
            <div className='block space-y-2 w-full'>
              <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>National rating</h3>
              <div className='flex flex-col gap-4 text-[0.9rem] leading-4'>
                <span>
                  This property has received its official star rating from the French Tourism Development Agency, ATOUT
                  France.
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantInformation;
