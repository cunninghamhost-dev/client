'use client';
import TabPanelControl from '@/components/defaults/TabPanelControl';
import { ITabItem } from '@/types/default.type';
import React from 'react';
import MainAirportTabSection from './tabcontent/MainAirportTabSection';
//import AirportTabSection from '../../(Index)/custom/TabContent/AirportTabSection';

const AirportTab: ITabItem[] = [
  {
    value: 'airport_transfer',
    label: 'Airport Transfer',
    content: <MainAirportTabSection />,
  },
];

const AirportTransferTabMenu = () => {
  return <TabPanelControl tabs={AirportTab} />;
};

export default AirportTransferTabMenu;
