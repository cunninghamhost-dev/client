import React from 'react';
import ImmigrationHeroSection from './_components/main/ImmigrationHeroSection';
import ImmigrationServices from './_components/ImmigrationServices';
import ImmigrationProcessSection from './_components/ImmigrationProcessSection';
import WhyChooseUs from '../visa-assistance/_component/WhyChooseUsSection';

export default function ImmigrationPage() {
  return (
    <main className=' flex p-0 max-w-full transition min-h-screen'>
      <div className=' relative flex-[1_1_auto] max-w-full'>
        <ImmigrationHeroSection />
        <ImmigrationServices />
        <ImmigrationProcessSection />
        <WhyChooseUs />
      </div>
    </main>
  );
}
