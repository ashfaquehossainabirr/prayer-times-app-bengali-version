// components/BengaliClock.js

import React, { useEffect, useState } from 'react';

const toBengaliDigits = (numberString) => {
  const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return numberString.replace(/\d/g, d => bnNums[d]);
};

const convertTo12HourBN = (date) => {
  let hour = date.getHours();
  const minute = date.getMinutes();
  const hour12 = hour % 12 || 12;

  let period = '';
  if (hour < 6) period = 'ভোর';
  else if (hour < 12) period = 'সকাল';
  else if (hour < 16) period = 'দুপুর';
  else if (hour < 18) period = 'বিকাল';
  else if (hour < 20) period = 'সন্ধ্যা';
  else period = 'রাত';

  const timeString = `${hour12}:${minute.toString().padStart(2, '0')}`;
  return `${period} ${toBengaliDigits(timeString)}`;
};

const BengaliClock = () => {
  const [currentTime, setCurrentTime] = useState(convertTo12HourBN(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(convertTo12HourBN(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bangla-clock' 
    style={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
      🕒 এখন সময়: {currentTime}
    </div>
  );
};

export default BengaliClock;