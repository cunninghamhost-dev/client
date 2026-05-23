import React from 'react';
import VAHeroSection from './_component/main/VAHeroSection';
import VisaServices from './_component/VisaServices';
import VisaProcessSection from './_component/VisaProcessSection';
import WhyChooseUs from './_component/WhyChooseUsSection';

const VisaAssistancePage = () => {
  return (
    <main className=' flex p-0 max-w-full transition min-h-screen'>
      <div className=' relative flex-[1_1_auto] max-w-full'>
        <VAHeroSection />
        <VisaServices />
        <VisaProcessSection />
        <WhyChooseUs />
      </div>
    </main>
  );
};

export default VisaAssistancePage;
