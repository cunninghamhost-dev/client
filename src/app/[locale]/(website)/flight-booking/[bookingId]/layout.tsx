import React from 'react';
import BookingStepper from '../_components/BookingStepper';
import 'react-vertical-timeline-component/style.min.css';
import 'react-phone-number-input/style.css';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function FlightBookingLayout({ children }: ILayoutProps) {
  return (
    <main className=' box-border'>
      <div className='flight-wrapper'>
        <section className='wrapper-content relative pt-7 pb-30'>
          <div className='container flex flex-wrap md:flex-nowrap'>
            <BookingStepper />
          </div>
        </section>
      </div>
      <section className='min-h-screen relative z-10 -mt-40 pt-3.75 pb-15'>
        <div className='container'>{children}</div>
      </section>
    </main>
  );
}
