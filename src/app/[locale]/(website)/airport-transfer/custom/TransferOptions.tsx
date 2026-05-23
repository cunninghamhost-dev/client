import Image from 'next/image';
import React from 'react';

interface TransferOption {
  id: string;
  title: string;
  provider: string;
  travelTime: string;
  passengers: number;
  luggage: number;
  duration: string;
  cancellation: string;
  rating: number;
  reviewCount: number;
  ratingLabel: string;
  price: string;
  imageUrl: string; // Placeholder for image URLs
}

const mockOptions: TransferOption[] = [
  {
    id: '1',
    title: 'Coach Transfer - Heathrow Airport - Victoria Coach Station (LHR)',
    provider: 'National Express',
    travelTime: 'from 15m to 1h 30m',
    passengers: 0, // Not specified, using 0 as default
    luggage: 0, // Not specified
    duration: '1h 15m',
    cancellation: 'Free cancellation until Aug 21',
    rating: 6.2,
    reviewCount: 34,
    ratingLabel: '',
    price: '$29',
    imageUrl: '/path/to/bus-image.jpg', // Replace with actual image path or URL
  },
  {
    id: '2',
    title: 'Private Standard Car - Meet & Greet',
    provider: 'Taxi 2 Airport',
    travelTime: '',
    passengers: 3,
    luggage: 2,
    duration: '45m',
    cancellation: 'Free cancellation until Aug 21',
    rating: 4.6,
    reviewCount: 15,
    ratingLabel: '',
    price: '$104',
    imageUrl: '/path/to/car-image.jpg',
  },
  {
    id: '3',
    title: 'Heathrow Express - Airport to Paddington Train Station',
    provider: 'Heathrow Express',
    travelTime: '',
    passengers: 0,
    luggage: 0,
    duration: '15m',
    cancellation: 'Free cancellation until Aug 21',
    rating: 7.8,
    reviewCount: 214,
    ratingLabel: 'Good',
    price: '$68',
    imageUrl: '/path/to/train-image.jpg',
  },
  {
    id: '4',
    title: 'Private Standard Car',
    provider: 'Talixo Services',
    travelTime: '',
    passengers: 3,
    luggage: 3,
    duration: '51m',
    cancellation: 'Free cancellation until Aug 22',
    rating: 8.0,
    reviewCount: 933,
    ratingLabel: 'Very Good',
    price: '$104',
    imageUrl: '/path/to/car-image-2.jpg',
  },
  {
    id: '5',
    title: 'Private Standard Car - Meet & Greet',
    provider: 'Taxi 2 Airport',
    travelTime: '',
    passengers: 3,
    luggage: 2,
    duration: '45m',
    cancellation: 'Free cancellation until Aug 21',
    rating: 4.6,
    reviewCount: 15,
    ratingLabel: '',
    price: '$104',
    imageUrl: '/path/to/car-image-3.jpg',
  },
];

const TransferOptions: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto p-4 bg-gray-100'>
      {/* Header with Results and Sort */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>23 Results: Total includes taxes and fees</h2>
        <select className='border rounded-md p-2'>
          <option>Sort by</option>
          <option>Price: Low to high</option>
        </select>
      </div>

      <div className='flex gap-4'>
        {/* Filters Sidebar */}
        <aside className='w-1/4 bg-white p-4 rounded-md shadow'>
          <h3 className='font-semibold mb-2'>Filter by</h3>
          <ul className='space-y-2'>
            <li>
              <input type='checkbox' id='recommendations' />
              <label htmlFor='recommendations' className='ml-2'>
                Recommendations
              </label>
            </li>
            <li>
              <input type='checkbox' id='free-cancellation' />
              <label htmlFor='free-cancellation' className='ml-2'>
                Free cancellation
              </label>
            </li>
            <li>
              <input type='checkbox' id='deals' />
              <label htmlFor='deals' className='ml-2'>
                Deals
              </label>
            </li>
            <li className='font-semibold mt-4'>Transportation type</li>
            <li>
              <input type='checkbox' id='private-transfer' checked />
              <label htmlFor='private-transfer' className='ml-2'>
                Private transfer
              </label>
            </li>
            <li>
              <input type='checkbox' id='shared-transfer' checked />
              <label htmlFor='shared-transfer' className='ml-2'>
                Shared transfer
              </label>
            </li>
            <li>
              <input type='checkbox' id='mass-transportation' checked />
              <label htmlFor='mass-transportation' className='ml-2'>
                Mass transportation
              </label>
            </li>
          </ul>
        </aside>

        {/* Main Content - Options List */}
        <main className='w-3/4 space-y-4'>
          {mockOptions.map((option) => (
            <div key={option.id} className='bg-white p-4 rounded-md shadow flex items-center gap-4'>
              <Image src={option.imageUrl} alt={option.title} className='w-32 h-20 object-cover rounded' />
              <div className='flex-grow'>
                <h3 className='font-semibold'>{option.title}</h3>
                <p className='text-sm text-gray-600'>{option.provider}</p>
                {option.travelTime && <p className='text-sm text-gray-600'>Travel time {option.travelTime}</p>}
                <div className='flex items-center gap-4 mt-2 text-sm'>
                  {option.passengers > 0 && <span>🧑 {option.passengers}</span>}
                  {option.luggage > 0 && <span>🛅 {option.luggage}</span>}
                  <span>⏱ {option.duration}</span>
                </div>
                <p className='text-sm text-green-600 mt-1'>{option.cancellation}</p>
              </div>
              <div className='text-right'>
                <div className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mb-1'>
                  {option.rating} {option.ratingLabel} {option.reviewCount} reviews
                </div>
                <p className='font-bold'>{option.price}</p>
                <p className='text-sm text-gray-600'>One-way</p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default TransferOptions;
