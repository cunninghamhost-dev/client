import React, { useState } from 'react';
import './hero-search.css';
import { SearchParams, HeroSearchProps } from './types';

const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>('');
  const [checkin, setCheckin] = useState<string>('');
  const [checkout, setCheckout] = useState<string>('');
  const [guests] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params: SearchParams = {
      location,
      checkin,
      checkout,
      guests,
    };

    onSearch(params);
  };

  return (
    <section className='hero-search'>
      <div className='overlay' />
      <div className='container'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            className='input location-input'
            type='text'
            placeholder='Where are you going?'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            className='input date-input'
            type='date'
            placeholder='Check‑in'
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            required
          />
          <input
            className='input date-input'
            type='date'
            placeholder='Check‑out'
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            required
          />
          {/* <select className='input guests-select' value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select> */}
          <button className='btn search-btn' type='submit'>
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSearch;
