
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameMosquito = ({ onSuccess, onFail, timeLeft, level }) => {
  const [mosquitoPosition, setMosquitoPosition] = useState({ x: 50, y: 50 });
  const [isSwatted, setIsSwatted] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    if (isSwatted) return;

    // Move mosquito randomly
    const interval = setInterval(() => {
      setMosquitoPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20
      });
    }, 1000 - level * 50); // Faster movement with higher level

    return () => clearInterval(interval);
  }, [level, isSwatted]);

  const handleSwipe = (direction) => {
    if (isSwatted) return;
    
    setSwipeDirection(direction);
    
    // Check if mosquito is on the left side for left swipe
    if (direction === 'left' && mosquitoPosition.x < 50) {
      setIsSwatted(true);
      onSuccess();
    } else if (direction === 'left' && mosquitoPosition.x >= 50) {
      onFail();
    }
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-green-200 to-green-400 rounded-3xl overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-16 right-12 w-12 h-12 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-white rounded-full opacity-50"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          🦟 Swipe LEFT to slap the mosquito!
        </p>
        <p className="text-white/80 font-semibold text-sm">
          (Only when it's on the LEFT side)
        </p>
      </div>

      {/* Mosquito */}
      {!isSwatted && (
        <motion.div
          className="absolute cursor-pointer"
          style={{
            left: `${mosquitoPosition.x}%`,
            top: `${mosquitoPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            x: [0, 5, -5, 0],
            y: [0, -3, 3, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-4xl filter drop-shadow-lg">
            🦟
          </div>
        </motion.div>
      )}

      {/* Swipe Buttons */}
      <div className="absolute bottom-8 left-4 right-4 flex justify-center gap-8">
        <motion.button
          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
          onClick={() => handleSwipe('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: mosquitoPosition.x < 50 
              ? ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 20px rgba(239, 68, 68, 0)"]
              : "0 4px 20px rgba(0,0,0,0.3)"
          }}
          transition={{
            boxShadow: { duration: 1, repeat: Infinity }
          }}
        >
          👋 LEFT
        </motion.button>
      </div>

      {/* Success Effect */}
      {isSwatted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-8xl mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5 }}
            >
              💥
            </motion.div>
            <p className="text-white font-bold text-2xl drop-shadow-lg">
              SLAPPED! 🎉
            </p>
          </div>
        </motion.div>
      )}

      {/* Visual indicator for mosquito position */}
      <div className="absolute top-1/2 left-1/2 w-1 h-full bg-white/30 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-16 left-4 text-white/70 font-semibold text-sm">LEFT</div>
      <div className="absolute top-16 right-4 text-white/70 font-semibold text-sm">RIGHT</div>
    </div>
  );
};

export default MiniGameMosquito;
