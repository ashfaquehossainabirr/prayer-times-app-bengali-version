import React from 'react';

const NotificationButtonBN = () => {
  const enableNotifications = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        alert('নোটিফিকেশন চালু হয়েছে!');
      }
    });
  };

  return (
    <button
      onClick={enableNotifications}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-5"
      style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
    >
      🔔 নোটিফিকেশন চালু করুন
    </button>
  );
};

export default NotificationButtonBN;