
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameCracker = ({ onSuccess, onFail, timeLeft, level }) => {
  const [crackerLit, setCrackerLit] = useState(false);
  const [fuseLength, setFuseLength] = useState(100);
  const [exploded, setExploded] = useState(false);
  const [crackerPosition] = useState({
    x: Math.random() * 60 + 20,
    y: Math.random() * 40 + 30
  });

  useEffect(() => {
    // Auto-light the cracker after a short delay
    const lightTimer = setTimeout(() => {
      setCrackerLit(true);
    }, 1000);

    return () => clearTimeout(lightTimer);
  }, []);

  useEffect(() => {
    if (!crackerLit || exploded) return;

    // Burn the fuse
    const fuseTimer = setInterval(() => {
      setFuseLength(prev => {
        const newLength = prev - (2 + level * 0.5);
        if (newLength <= 0) {
          setExploded(true);
          onFail();
          return 0;
        }
        return newLength;
      });
    }, 100);

    return () => clearInterval(fuseTimer);
  }, [crackerLit, exploded, level, onFail]);

  const handleCrackerClick = () => {
    if (exploded || !crackerLit) return;
    
    setExploded(true);
    onSuccess();
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-purple-200 to-purple-400 rounded-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-12 left-8 w-8 h-8 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-16 right-12 w-12 h-12 bg-yellow-300 rounded-full opacity-30"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-white rounded-full opacity-50"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          🎇 Tap to burst the cracker before it explodes!
        </p>
        <div className="mt-2 bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
            style={{ width: `${fuseLength}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Cracker */}
      {!exploded && (
        <motion.div
          className="absolute cursor-pointer"
          style={{
            left: `${crackerPosition.x}%`,
            top: `${crackerPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={handleCrackerClick}
          animate={{
            scale: crackerLit ? [1, 1.1, 1] : 1,
            rotate: crackerLit ? [0, 2, -2, 0] : 0
          }}
          transition={{
            duration: 0.5,
            repeat: crackerLit ? Infinity : 0,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Cracker Body */}
          <div className="relative">
            <div className="w-16 h-20 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-lg">
              {/* Decorative patterns */}
              <div className="absolute inset-2 border-2 border-yellow-300 rounded"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 font-bold text-xs">
                DIWALI
              </div>
            </div>
            
            {/* Fuse */}
            {crackerLit && (
              <motion.div 
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                }}
              >
                <div className="w-1 bg-orange-600 rounded-full" style={{ height: `${fuseLength * 0.3}px` }}></div>
                <motion.div 
                  className="w-3 h-3 bg-orange-400 rounded-full -mt-1 ml-0.5"
                  animate={{
                    boxShadow: [
                      "0 0 5px #ff6b35",
                      "0 0 20px #ff6b35",
                      "0 0 5px #ff6b35"
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Explosion Effect */}
      {exploded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.8 }}
            >
              💥
            </motion.div>
            <motion.div
              className="text-6xl"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                repeat: 3
              }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Sparks Animation */}
      {crackerLit && !exploded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${crackerPosition.x + (Math.random() - 0.5) * 20}%`,
                top: `${crackerPosition.y + (Math.random() - 0.5) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [(Math.random() - 0.5) * 40],
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}

      {/* Warning Message */}
      {crackerLit && fuseLength < 30 && !exploded && (
        <motion.div
          className="absolute bottom-8 left-4 right-4 text-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <p className="text-red-600 font-bold text-xl drop-shadow-lg bg-white/80 rounded-full py-2">
            ⚠️ HURRY! TAP NOW! ⚠️
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MiniGameCracker;
