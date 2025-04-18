import React, { useEffect, useState } from 'react';

const prayerNamesBN = {
  Fajr: 'ফজর',
  Dhuhr: 'জোহর',
  Asr: 'আসর',
  Maghrib: 'মাগরিব',
  Isha: 'ইশা',
};

const CountdownBN = ({ nextPrayer, prayerTimes, onCountdownEnd }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [notified, setNotified] = useState(false);

  const toBengaliDigits = (numberString) => {
    const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return numberString.replace(/\d/g, d => bnNums[d]);
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const [hour, minute] = prayerTimes[nextPrayer].split(':').map(Number);
      const nextTime = new Date();
      nextTime.setHours(hour, minute, 0, 0);

      const diff = nextTime - now;

      if (diff <= 0) {
        if (!notified) {
          alert(`🕌 ${prayerNamesBN[nextPrayer]} নামাজের সময় হয়েছে!`);
          // You can also call sendPrayerNotification(currentPrayer);
          setNotified(true);
        }

        onCountdownEnd(nextPrayer);
        clearInterval(interval);
        return;
      }

      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

      setTimeLeft(toBengaliDigits(`${h} : ${m} : ${s}`));
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer, prayerTimes]);

  return (
    <div className="mt-4">
      <h3 className="text-lg text-center">পরবর্তী নামাজ: <strong>{prayerNamesBN[nextPrayer]}</strong></h3>

      <p style={{ margin: "10px auto", background: "#333", borderRadius: "8px", 
        padding: "5px 10px", color: "#fff", fontSize: "18px"}}>

        <span className='text-red-200 mr-[10px]'>সময় বাকি:</span>
        <span className="text-md text-white"> {timeLeft}</span>
      </p>
    </div>
  );
};

export default CountdownBN;