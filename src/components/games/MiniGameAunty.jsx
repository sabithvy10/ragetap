
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameAunty = ({ onSuccess, onFail, timeLeft, level }) => {
  const [auntyPosition, setAuntyPosition] = useState({ x: 50, y: 40 });
  const [playerPosition, setPlayerPosition] = useState(50);
  const [isStaring, setIsStaring] = useState(false);
  const [survivalTime, setSurvivalTime] = useState(0);
  const [targetTime] = useState(5); // 5 seconds to survive

  useEffect(() => {
    // Aunty looks around randomly
    const lookInterval = setInterval(() => {
      const newX = Math.random() * 80 + 10;
      const newY = Math.random() * 40 + 30;
      setAuntyPosition({ x: newX, y: newY });
      
      // Check if aunty is staring at player
      const distance = Math.abs(newX - playerPosition);
      setIsStaring(distance < 20);
      
      if (distance < 20) {
        setTimeout(() => onFail(), 500);
      }
    }, 1000 - level * 100);

    return () => clearInterval(lookInterval);
  }, [playerPosition, level, onFail]);

  useEffect(() => {
    if (isStaring) return;

    const timer = setInterval(() => {
      setSurvivalTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= targetTime) {
          onSuccess();
          return newTime;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isStaring, targetTime, onSuccess]);

  const handleMove = (direction) => {
    setPlayerPosition(prev => {
      const newPos = direction === 'left' ? prev - 15 : prev + 15;
      return Math.max(10, Math.min(90, newPos));
    });
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-pink-200 to-pink-400 rounded-3xl overflow-hidden">
      {/* Background - House */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-green-400"></div>
        <div className="absolute top-16 left-8 w-16 h-20 bg-yellow-300 rounded-lg opacity-60"></div>
        <div className="absolute top-20 right-12 w-12 h-16 bg-blue-300 rounded-lg opacity-50"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          👀 Dodge aunty's stare for {targetTime} seconds!
        </p>
        <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div 
            className="h-full bg-green-500"
            style={{ width: `${(survivalTime / targetTime) * 100}%` }}
          />
        </div>
      </div>

      {/* Aunty */}
      <motion.div
        className="absolute"
        style={{
          left: `${auntyPosition.x}%`,
          top: `${auntyPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isStaring ? [1, 1.2, 1] : 1,
          rotate: isStaring ? [0, 5, -5, 0] : 0
        }}
        transition={{
          duration: 0.3,
          repeat: isStaring ? Infinity : 0
        }}
      >
        <div className="text-6xl filter drop-shadow-lg">
          {isStaring ? '😠' : '👵'}
        </div>
        
        {/* Stare Effect */}
        {isStaring && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
          >
            <div className="text-2xl">👁️</div>
          </motion.div>
        )}
      </motion.div>

      {/* Player */}
      <motion.div
        className="absolute bottom-16"
        style={{
          left: `${playerPosition}%`,
          transform: 'translateX(-50%)'
        }}
        animate={{
          y: isStaring ? [0, -5, 0] : 0,
          scale: isStaring ? [1, 0.9, 1] : 1
        }}
        transition={{
          duration: 0.2,
          repeat: isStaring ? Infinity : 0
        }}
      >
        <div className="text-5xl filter drop-shadow-lg">
          {isStaring ? '😰' : '🚶‍♂️'}
        </div>
      </motion.div>

      {/* Stare Warning */}
      {isStaring && (
        <motion.div
          className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <div className="text-center">
            <div className="text-6xl mb-2">⚠️</div>
            <p className="text-white font-bold text-xl drop-shadow-lg">
              AUNTY IS STARING!
            </p>
          </div>
        </motion.div>
      )}

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <motion.button
          className="w-20 h-16 bg-blue-500 rounded-2xl text-white font-bold shadow-lg"
          onClick={() => handleMove('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← LEFT
        </motion.button>
        
        <motion.button
          className="w-20 h-16 bg-blue-500 rounded-2xl text-white font-bold shadow-lg"
          onClick={() => handleMove('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          RIGHT →
        </motion.button>
      </div>

      {/* Aunty's Vision Cone */}
      {isStaring && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${auntyPosition.x}%`,
            top: `${auntyPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-red-400/30"
            style={{
              transform: `rotate(${playerPosition > auntyPosition.x ? '45deg' : '-45deg'})`
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MiniGameAunty;
