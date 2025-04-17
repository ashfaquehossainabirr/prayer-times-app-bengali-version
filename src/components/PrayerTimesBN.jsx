import React from 'react';

const prayerNamesBN = {
  Fajr: 'ফজর',
  Dhuhr: 'জোহর',
  Asr: 'আসর',
  Maghrib: 'মাগরিব',
  Isha: 'এশা',
};

const PrayerTimesBN = ({ prayerTimes, currentPrayer }) => {
    // const convertTo12Hour = (time24) => {
    //     const [hour, minute] = time24.split(':').map(Number);
    //     const ampm = hour >= 12 ? 'PM' : 'AM';
    //     const hour12 = hour % 12 || 12;
    //     return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    // };

    const toBengaliDigits = (numberString) => {
        const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
        return numberString.replace(/\d/g, d => bnNums[d]);
    };
      
    const convertTo12HourBN = (time24) => {
        const [hourStr, minuteStr] = time24.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        const formattedTime = `${hour12}:${minute.toString().padStart(2, '0')}`;
        return `${toBengaliDigits(formattedTime)} ${ampm}`;
    };
      

    return (
        <div className="bg-white rounded p-4 shadow-md">

            <h2 className="text-xl font-bold text-green-600 mb-3 text-center">
                🕌 নামাজের সময়সূচি
            </h2>

            {Object.entries(prayerTimes).map(([key, value]) => (
                <div
                key={key}
                className={`flex justify-between py-1 px-2 rounded ${
                    key === currentPrayer ? 'bg-green-100 font-bold text-green-800' : ''
                }`}
                >
                <span>{prayerNamesBN[key]}</span>
                <span>{convertTo12HourBN(value)}</span>
                </div>
            ))}
        </div>
    );
};

export default PrayerTimesBN;