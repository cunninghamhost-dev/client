'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ConstVisaProcesses as processes } from '@/lib/constants/website/visa-assistance/visa.constant';
import { IVisaProcessProps } from '@/types/website/visa-assistance.type';
// import { ConstVisaProcesses } from "@/data/visaProcesses";
// import { IVisaProcessProps } from "@/types/visa";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const VisaProcessSection = () => {
  const [activeTab, setActiveTab] = React.useState(processes[0].value);
  const tabsListRef = React.useRef<HTMLDivElement>(null);

  // Function to scroll the TabsList to a specific tab
  const scrollToTab = React.useCallback((tabValue: string) => {
    if (tabsListRef.current) {
      const currentIndex = processes.findIndex((process) => process.value === tabValue);
      if (currentIndex === -1) return;

      // Get the width of a single tab trigger
      const firstTabTrigger = tabsListRef.current.querySelector('[role="tab"]');
      const itemWidth = firstTabTrigger ? firstTabTrigger.clientWidth : tabsListRef.current.clientWidth / 3; // Fallback to 1/3 of container width

      // Calculate the scroll position to bring the active tab to the first visible slot
      const newScrollLeft = currentIndex * itemWidth;

      tabsListRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  }, []);

  // Handle clicking the next chevron button
  const handleNextTab = () => {
    const currentIndex = processes.findIndex((process) => process.value === activeTab);
    const nextIndex = (currentIndex + 1) % processes.length;
    setActiveTab(processes[nextIndex].value);
    // The useEffect below will handle scrolling to the new activeTab
  };

  // Handle clicking the previous chevron button
  const handlePreviousTab = () => {
    const currentIndex = processes.findIndex((process) => process.value === activeTab);
    const previousIndex = (currentIndex - 1 + processes.length) % processes.length;
    setActiveTab(processes[previousIndex].value);
    // The useEffect below will handle scrolling to the new activeTab
  };

  // Effect to scroll to the active tab whenever it changes
  React.useEffect(() => {
    scrollToTab(activeTab);
  }, [activeTab, scrollToTab]);

  return (
    <section className='w-full max-w-5xl mx-auto overflow-hidden py-8 md:py-12'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-[155%] font-bold'>How it works</h2>
          <p className='text-[#666666] mt-2 max-w-xl md:max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-[150%]'>
            Learn more about the process of each kind of Visa we can help you apply for
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <div className='flex items-center justify-center relative border-b border-gray-300'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handlePreviousTab}
              className='inline-flex rounded-full h-10 w-10 bg-white hover:bg-orange-600 text-gray-700 hover:text-gray-50 shadow-md cursor-pointer'
            >
              <ChevronLeft className='h-6 w-6' />
            </Button>
            <TabsList
              ref={tabsListRef}
              className='flex flex-nowrap justify-start h-auto bg-transparent p-0 overflow-x-hidden scrollbar-hide w-full max-w-[620px] mx-auto'
            >
              {processes.map((process: IVisaProcessProps) => (
                <TabsTrigger
                  key={process.value}
                  value={process.value}
                  className='relative px-6 py-3 text-lg font-medium text-gray-700 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent'
                >
                  {process.type}
                  {activeTab === process.value && (
                    <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-red-600'></span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleNextTab}
              className='inline-flex rounded-full h-10 w-10 bg-white hover:bg-orange-600 text-gray-700 hover:text-gray-50 shadow-md cursor-pointer'
            >
              <ChevronRight className='h-6 w-6' />
            </Button>
          </div>

          {processes.map((process: IVisaProcessProps) => (
            <TabsContent key={process.value} value={process.value}>
              <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                {/* Left Side: Steps */}
                <div className='space-y-8 px-12'>
                  {process.steps.map((step) => (
                    <div key={step.id} className='flex items-start space-x-4'>
                      <div className='flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#E6F5F9] text-xl md:text-2xl lg:text-3xl'>
                        {step.id}
                      </div>
                      <div className='space-y-0'>
                        <h3 className='text-lg font-bold'>{step.title}</h3>
                        <p className='text-sm text-[#666666]'>{step.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className='pt-4 px-4'>
                    <Button className='bg-[#E63A24] hover:bg-orange-700 rounded-[8px] py-3 px-5 font-semibold cursor-pointer'>
                      Learn More
                    </Button>
                  </div>
                </div>
                {/* Right Side: Image */}
                <div className='hidden md:block'>
                  <Image
                    src={process.image}
                    alt={process.type}
                    width={441}
                    height={562}
                    className='rounded-lg object-cover w-full h-full max-h-[562px]'
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default VisaProcessSection;

// 'use client';

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { ConstVisaProcesses as processes } from '@/lib/constants/website/visa-assistance/visa.constant';
// import { IVisaProcessProps } from '@/types/website/visa-assistance.type';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const VisaProcessSection = () => {
//   const [activeTab, setActiveTab] = useState(processes[0].value);
//   const tabsListRef = useRef<HTMLDivElement>(null);

//   const scrollToTab = useCallback((tabValue: string) => {
//     if (tabsListRef.current) {
//       const currentIndex = processes.findIndex((process) => process.value === tabValue);
//       if (currentIndex === -1) return;

//       // Get the width of a single tab trigger
//       const firstTabTrigger = tabsListRef.current.querySelector('[role="tab"]');
//       const itemWidth = firstTabTrigger ? firstTabTrigger.clientWidth : tabsListRef.current.clientWidth / 3; // Fallback to 1/3 of container width

//       // Calculate the scroll position to bring the active tab to the first visible slot
//       const newScrollLeft = currentIndex * itemWidth;

//       tabsListRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth',
//       });
//     }
//   }, []);

//   // Handle clicking the next chevron button
//   const handleNextTab = () => {
//     const currentIndex = processes.findIndex((process) => process.value === activeTab);
//     const nextIndex = (currentIndex + 1) % processes.length;
//     setActiveTab(processes[nextIndex].value);
//   };

//   // Handle clicking the previous chevron button
//   const handlePreviousTab = () => {
//     const currentIndex = processes.findIndex((process) => process.value === activeTab);
//     const previousIndex = (currentIndex - 1 + processes.length) % processes.length;
//     setActiveTab(processes[previousIndex].value);
//   };

//   // Effect to scroll to the active tab whenever it changes
//   useEffect(() => {
//     scrollToTab(activeTab);
//   }, [activeTab, scrollToTab]);

//   return (
//     <section className='w-full max-w-5xl mx-auto overflow-hidden py-8 md:py-12'>
//       <div className='container mx-auto px-4'>
//         <div className='text-center mb-12'>
//           <h2 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-[155%] font-bold'>How it works</h2>
//           <p className='text-[#666666] mt-2 max-w-xl md:max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-[150%]'>
//             Learn more about the process of each kind of Visa we can help you apply for
//           </p>
//         </div>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
//           <div className='flex items-center justify-center relative border-b border-gray-300'>
//             <TabsList
//               ref={tabsListRef}
//               className='flex flex-wrap justify-center h-auto bg-transparent p-0 overflow-x-hidden scrollbar-hide w-full max-w-3xl mx-auto'
//             >
//               {processes.map((process: IVisaProcessProps) => (
//                 <TabsTrigger
//                   key={process.value}
//                   value={process.value}
//                   className='relative px-6 py-3 text-lg font-medium text-gray-700 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent'
//                 >
//                   {process.type}
//                   {activeTab === process.value && (
//                     <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-red-600'></span>
//                   )}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             <Button
//               variant='ghost'
//               size='icon'
//               onClick={handlePreviousTab}
//               className='inline-flex rounded-full h-10 w-10 bg-white hover:bg-orange-600 text-gray-700 hover:text-gray-300 shadow-md cursor-pointer'
//             >
//               <ChevronLeft className='h-6 w-6' />
//             </Button>
//             <Button
//               variant='ghost'
//               size='icon'
//               onClick={handleNextTab}
//               className='inline-flex rounded-full h-10 w-10 bg-white hover:bg-orange-600 text-gray-700 hover:text-gray-300 shadow-md cursor-pointer'
//             >
//               <ChevronRight className='h-6 w-6' />
//             </Button>
//           </div>
//           {processes.map((process: IVisaProcessProps) => (
//             <TabsContent key={process.value} value={process.value}>
//               <div className='grid md:grid-cols-2 gap-12 items-center'>
//                 {/* Left side: Steps */}
//                 <div className='space-y-8'>
//                   {process.steps.map((step) => (
//                     <div key={step.id} className='flex items-start space-x-4'>
//                       <div className='flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl'>
//                         {step.id}
//                       </div>
//                       <div>
//                         <h3 className='text-xl font-semibold mb-1'>{step.title}</h3>
//                         <p className='text-gray-600'>{step.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <Button className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-semibold mt-6'>
//                     Learn More
//                   </Button>
//                 </div>
//                 {/* Right side: Image */}
//                 <div className='flex justify-center'>
//                   <img
//                     src={process.image}
//                     alt={process.type}
//                     className='rounded-lg shadow-lg max-w-full h-auto object-cover'
//                   />
//                 </div>
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </section>
//   );
// };

// export default VisaProcessSection;
