// Modules & Components
import React, { useEffect, useState } from 'react';
import PrayerTimesBN from './components/PrayerTimesBN';
import CountdownBN from './components/CountdownBN';
import NotificationButtonBN from './components/NotificationButtonBN';
import BengaliClock from './components/BengaliClock';

// CSS Source
import './App.css';
import './clock.css'

const prayerNamesBN = {
  Fajr: 'ফজর',
  Dhuhr: 'জোহর',
  Asr: 'আসর',
  Maghrib: 'মাগরিব',
  Isha: 'এশা',
};

const App = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null); 

  // useEffect(() => {
  //   fetch('/prayerData.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPrayerTimes(data);
  //       updatePrayerStates(data);
  //     });
  // }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
  
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2`
      );
      const data = await response.json();
      const timings = data.data.timings;
  
      // Filter only the 5 main prayers
      const filtered = {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      };
  
      setPrayerTimes(filtered);
      updatePrayerStates(filtered);
    };
  
    fetchPrayerTimes();
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrayerStates(prayerTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const updatePrayerStates = (timings) => {
    const now = new Date();
    const keys = Object.keys(timings);
    let current = null;
    let next = null;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const [h, m] = timings[key].split(':');
      const time = new Date();
      time.setHours(h, m, 0, 0);

      if (now >= time) {
        current = key;
        next = keys[i + 1] || null;
      }
    }

    if (!next) {
      // শেষ নামাজ হয়ে গেছে (ইশা), পরদিন ফজরের জন্য
      const tomorrow = keys[0];
      setNextPrayer(tomorrow);
    } else {
      setNextPrayer(next);
    }

    setCurrentPrayer(current);
  };

  const handleCountdownEnd = () => {
    if (Notification.permission === 'granted') {
      new Notification(`🕌 ${prayerNamesBN[currentPrayer]} নামাজ`, {
        body: `এখন ${prayerNamesBN[currentPrayer]} নামাজের সময়।`,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded shadow">
      <BengaliClock />
      <PrayerTimesBN prayerTimes={prayerTimes} currentPrayer={currentPrayer} />
      {nextPrayer && (
        <CountdownBN
          nextPrayer={nextPrayer}
          prayerTimes={prayerTimes}
          onCountdownEnd={handleCountdownEnd}
        />
      )}
      <NotificationButtonBN />
    </div>
  );
};

export default App;