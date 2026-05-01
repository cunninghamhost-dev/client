// src/lib/constants/website/visa-assistance/visa.constant

import { IContextType, ISelectOption } from '@/types/default.type';
import { IVisaProcessProps } from '@/types/website/visa-assistance.type';

export const ConstVisaTypes: string[] = ['Student Visa', 'Business Visa', 'Tourist Visa'];
export const ConstImmigrationTypes: ISelectOption[] = [
  { label: 'Work Permit', value: 'work_permit' },
  { label: 'Citizenship', value: 'citizenship' },
  { label: 'Resident Permit', value: 'resident_permit' },
];

export const ConstVisaService: IContextType[] = [
  {
    id: 1,
    title: 'Work Visa',
    description: 'Temporarily entry permit for travel, study, work or business.',
  },
  {
    id: 2,
    title: 'Student Visa ',
    description: 'Advertise, showcase and  manage your properties.',
  },
  {
    id: 3,
    title: 'Business Visa',
    description: 'Permanent relocation, residency or citizenship.',
  },
];

export const ConstImmigrationService: IContextType[] = [
  {
    id: 1,
    title: 'Work Permit',
    description: 'Top Training and expertise resolution.',
  },
  {
    id: 2,
    title: 'Citizenship',
    description: 'Top Training and expertise resolution.',
  },
  {
    id: 3,
    title: 'Resident Permit',
    description: 'Top Training and expertise resolution.',
  },
];

export const ConstVisaProcesses: IVisaProcessProps[] = [
  {
    type: 'Student Visa',
    value: 'student-visa',
    image: '/images/main/visa_process/img_student_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select your study country and review student visa requirements.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm your eligibility (admission letter, funds, documents).',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Get matched with a student visa expert to guide your application.',
      },
    ],
  },
  {
    type: 'Work Permit',
    value: 'work-permit',
    image: '/images/main/visa_process/img_workpermit_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select the country where you want to work.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm your travel purpose and eligibility.',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Apply with the help of our partner experts for a smooth trip.',
      },
    ],
  },
  {
    type: 'Tourist Visa',
    value: 'tourist-visa',
    image: '/images/main/visa_process/img_tourist_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select your travel country and view tourist visa rules.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm your travel purpose and eligibility.',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Apply with the help of our partner experts for a smooth trip.',
      },
    ],
  },
  {
    type: 'Business Visa',
    value: 'business-visa',
    image: '/images/main/visa_process/img_business_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Pick the country where you plan to attend meetings or events.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Check eligibility (invitation letter, funds, documents).',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Get support from a visa expert to handle your business visa.',
      },
    ],
  },
  {
    type: 'Permanent Visa',
    value: 'permanent-visa',
    image: '/images/main/visa_process/img_permanent_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Pick the country where you want to settle permanently.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Check eligibility (residency history, valid visa, documents).',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Work with our PR consultants to begin your permanent residency process.',
      },
    ],
  },
  {
    type: 'Citizenship',
    value: 'citizenship',
    image: '/images/main/visa_process/img_citizenship_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select the country where you want to apply for citizenship.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm if you already hold permanent residency and meet requirements.',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Get step-by-step guidance from a citizenship consultant.',
      },
    ],
  },
];

export const ConstImmigrationProcesses: IVisaProcessProps[] = [
  {
    type: 'Work Permit',
    value: 'work-permit',
    image: '/images/main/visa_process/img_workpermit_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select the country where you want to work.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm your travel purpose and eligibility.',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Apply with the help of our partner experts for a smooth trip.',
      },
    ],
  },
  {
    type: 'Resident Permit',
    value: 'resident-permit',
    image: '/images/main/visa_process/img_permanent_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Pick the country where you want to settle permanently.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Check eligibility (residency history, valid visa, documents).',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Work with our PR consultants to begin your permanent residency process.',
      },
    ],
  },
  {
    type: 'Citizenship',
    value: 'citizenship',
    image: '/images/main/visa_process/img_citizenship_visa.png',
    steps: [
      {
        id: '01',
        title: 'Choose Your Destination',
        description: 'Select the country where you want to apply for citizenship.',
      },
      {
        id: '02',
        title: 'Answer a Few Questions',
        description: 'Confirm if you already hold permanent residency and meet requirements.',
      },
      {
        id: '03',
        title: 'Connect & Apply',
        description: 'Get step-by-step guidance from a citizenship consultant.',
      },
    ],
  },
];
