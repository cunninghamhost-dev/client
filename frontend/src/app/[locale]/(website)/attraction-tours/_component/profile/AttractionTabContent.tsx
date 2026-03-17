import AttractionTabPanel from '@/components/website/attraction-tours/AttractionTabPanel';
import { ITabItem } from '@/types/default.type';
import React from 'react';
import AttractionTopPicksContent from './AttractionTopPicksContent';

const AttractionTabContent = () => {
  const tabs: ITabItem[] = [
    {
      value: 'top_picks',
      label: 'Our top picks',
      content: <AttractionTopPicksContent />,
    },
    {
      value: 'lowest_price',
      label: 'Lowest price',
      content: <p>Lowest Price Section</p>,
    },
    {
      value: 'best_reviewed',
      label: 'Best reviewed',
      content: <p>Best Reviewed</p>,
    },
  ];
  return <AttractionTabPanel tabs={tabs} />;
};

export default AttractionTabContent;
