
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameChai = ({ onSuccess, onFail, timeLeft, level }) => {
  const [balance, setBalance] = useState(0); // -100 to 100
  const [isBalancing, setIsBalancing] = useState(false);
  const [balanceTime, setBalanceTime] = useState(0);
  const [targetTime] = useState(5); // 5 seconds to balance

  useEffect(() => {
    if (!isBalancing) return;

    const interval = setInterval(() => {
      setBalanceTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= targetTime) {
          onSuccess();
          return newTime;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isBalancing, targetTime, onSuccess]);

  useEffect(() => {
    // Auto-tilt the chai glass randomly
    const interval = setInterval(() => {
      if (!isBalancing) return;
      
      const randomTilt = (Math.random() - 0.5) * 20;
      setBalance(prev => {
        const newBalance = prev + randomTilt;
        if (Math.abs(newBalance) > 50) {
          onFail();
          return newBalance;
        }
        return Math.max(-100, Math.min(100, newBalance));
      });
    }, 500 - level * 50);

    return () => clearInterval(interval);
  }, [isBalancing, level, onFail]);

  const handleTilt = (direction) => {
    if (!isBalancing) {
      setIsBalancing(true);
    }
    
    setBalance(prev => {
      const adjustment = direction === 'left' ? -15 : 15;
      const newBalance = prev + adjustment;
      
      if (Math.abs(newBalance) > 50) {
        onFail();
        return newBalance;
      }
      
      return Math.max(-100, Math.min(100, newBalance));
    });
  };

  const getChaiLevel = () => {
    const tilt = Math.abs(balance);
    return Math.max(20, 80 - tilt);
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-12 w-8 h-8 bg-yellow-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-16 w-6 h-6 bg-yellow-300 rounded-full opacity-40"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          ☕ Balance the chai glass for {targetTime} seconds!
        </p>
        <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div 
            className="h-full bg-green-500"
            style={{ width: `${(balanceTime / targetTime) * 100}%` }}
          />
        </div>
      </div>

      {/* Chai Glass */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: balance }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Glass */}
          <div className="w-24 h-32 bg-gradient-to-b from-transparent to-white/30 border-4 border-white rounded-b-3xl relative overflow-hidden">
            {/* Chai liquid */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-800 to-orange-600 rounded-b-3xl"
              style={{ height: `${getChaiLevel()}%` }}
              animate={{ 
                height: `${getChaiLevel()}%`,
                x: balance * 0.3
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            
            {/* Steam */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <motion.div 
                className="text-2xl"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                💨
              </motion.div>
            </div>
          </div>

          {/* Handle */}
          <div className="absolute right-0 top-8 w-6 h-12 border-4 border-white rounded-r-full"></div>
        </motion.div>
      </div>

      {/* Balance Indicator */}
      <div className="absolute bottom-20 left-4 right-4">
        <div className="bg-white/30 rounded-full h-4 relative">
          <motion.div 
            className={`absolute top-0 w-4 h-4 rounded-full ${
              Math.abs(balance) > 30 ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ left: `${((balance + 100) / 200) * 100}%` }}
            animate={{ x: -8 }}
          />
        </div>
        <div className="flex justify-between text-white/70 text-sm mt-1">
          <span>LEFT</span>
          <span>BALANCED</span>
          <span>RIGHT</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <motion.button
          className="w-20 h-16 bg-blue-500 rounded-2xl text-white font-bold shadow-lg"
          onClick={() => handleTilt('left')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← TILT
        </motion.button>
        
        <motion.button
          className="w-20 h-16 bg-blue-500 rounded-2xl text-white font-bold shadow-lg"
          onClick={() => handleTilt('right')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          TILT →
        </motion.button>
      </div>

      {/* Success indicator */}
      {balanceTime >= targetTime && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-green-500/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-8xl">🎉</div>
        </motion.div>
      )}
    </div>
  );
};

export default MiniGameChai;
