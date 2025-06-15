
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameLaddoo = ({ onSuccess, onFail, timeLeft, level }) => {
  const [laddooPosition, setLaddooPosition] = useState({ x: 50, y: 20 });
  const [isClicked, setIsClicked] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(2);

  useEffect(() => {
    // Increase fall speed with level
    setFallSpeed(2 + level * 0.5);
  }, [level]);

  useEffect(() => {
    if (isClicked) return;

    const interval = setInterval(() => {
      setLaddooPosition(prev => {
        const newY = prev.y + fallSpeed;
        if (newY >= 85) {
          onFail();
          return prev;
        }
        return { ...prev, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [fallSpeed, isClicked, onFail]);

  const handleLaddooClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    onSuccess();
  };

  return (
    <div className="h-full relative bg-gradient-to-b from-blue-200 to-blue-400 rounded-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-20 right-16 w-6 h-6 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-32 left-20 w-4 h-4 bg-white rounded-full opacity-50"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          🍬 Tap the Laddoo before it falls!
        </p>
      </div>

      {/* Laddoo */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          left: `${laddooPosition.x}%`,
          top: `${laddooPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={handleLaddooClick}
        animate={{
          rotate: [0, 360],
          scale: isClicked ? [1, 1.5, 0] : [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: isClicked ? 0.5 : 1, repeat: isClicked ? 0 : Infinity }
        }}
      >
        <div className="text-6xl filter drop-shadow-lg">
          🍬
        </div>
      </motion.div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-400 rounded-b-3xl">
        <div className="absolute top-2 left-4 right-4 h-2 bg-green-700 rounded-full opacity-50"></div>
      </div>

      {/* Success Effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="text-8xl">✨</div>
        </motion.div>
      )}
    </div>
  );
};

export default MiniGameLaddoo;
