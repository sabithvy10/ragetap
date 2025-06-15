
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameWhatsApp = ({ onSuccess, onFail, timeLeft, level }) => {
  const [notifications, setNotifications] = useState([]);
  const [clickedNotification, setClickedNotification] = useState(null);

  useEffect(() => {
    // Generate notifications - some real, some fake
    const notificationTypes = [
      { type: 'real', message: 'Mom: Beta, khana kha liya?', sender: 'Mom', time: '2:30 PM', isReal: true },
      { type: 'real', message: 'Rahul: Meeting at 5 PM', sender: 'Rahul', time: '1:45 PM', isReal: true },
      { type: 'fake', message: 'You won ₹50,000! Click here!', sender: 'WhatsApp', time: 'now', isReal: false },
      { type: 'fake', message: 'URGENT: Your account will be blocked', sender: 'WhatsApp Team', time: 'now', isReal: false },
      { type: 'real', message: 'Priya: Happy Birthday! 🎉', sender: 'Priya', time: '12:15 PM', isReal: true },
      { type: 'fake', message: 'Free iPhone! Limited offer!', sender: 'WhatsApp Official', time: 'now', isReal: false }
    ];

    // Randomly select 4 notifications
    const shuffled = notificationTypes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    setNotifications(selected);
  }, []);

  const handleNotificationClick = (notification) => {
    if (clickedNotification) return;
    
    setClickedNotification(notification);
    
    setTimeout(() => {
      if (notification.isReal) {
        onSuccess();
      } else {
        onFail();
      }
    }, 500);
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-green-100 to-green-300 rounded-3xl overflow-hidden">
      {/* Phone Frame */}
      <div className="absolute inset-4 bg-black rounded-3xl p-1">
        <div className="h-full bg-white rounded-3xl overflow-hidden relative">
          
          {/* Status Bar */}
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">W</span>
              </div>
              <span className="font-bold">WhatsApp</span>
            </div>
            <div className="text-sm">📶 🔋</div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-yellow-100 border-b">
            <p className="text-center text-sm font-semibold text-gray-800">
              📱 DON'T tap the FAKE WhatsApp notifications!
            </p>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                className={`p-4 border-b border-gray-200 cursor-pointer relative ${
                  clickedNotification === notification ? 'bg-gray-100' : 'hover:bg-gray-50'
                } ${
                  !notification.isReal ? 'bg-red-50 border-red-200' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    notification.isReal ? 'bg-blue-500' : 'bg-red-500'
                  }`}>
                    {notification.sender.charAt(0)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-800">{notification.sender}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className={`text-sm ${notification.isReal ? 'text-gray-600' : 'text-red-600 font-semibold'}`}>
                      {notification.message}
                    </p>
                    
                    {/* Fake notification warning signs */}
                    {!notification.isReal && (
                      <div className="mt-2 flex gap-1">
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">SUSPICIOUS</span>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">SPAM</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Click Effect */}
                {clickedNotification === notification && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-4xl">
                      {notification.isReal ? '✅' : '❌'}
                    </div>
                  </motion.div>
                )}

                {/* Fake notification glow */}
                {!notification.isReal && clickedNotification === null && (
                  <motion.div
                    className="absolute inset-0 border-2 border-red-400 rounded"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-2 left-4 right-4 text-center">
        <p className="text-white/90 text-xs font-medium drop-shadow">
          💡 Real messages are from contacts, fake ones promise money/prizes!
        </p>
      </div>
    </div>
  );
};

export default MiniGameWhatsApp;
