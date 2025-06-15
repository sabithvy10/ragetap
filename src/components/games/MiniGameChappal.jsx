
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameChappal = ({ onSuccess, onFail, timeLeft, level }) => {
  const [targetColor, setTargetColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [chappalColors] = useState(['red', 'blue', 'green', 'yellow', 'purple', 'orange']);
  const [selectedChappal, setSelectedChappal] = useState(null);

  useEffect(() => {
    // Set random target color and background
    const randomColor = chappalColors[Math.floor(Math.random() * chappalColors.length)];
    setTargetColor(randomColor);
    setBackgroundColor(randomColor);
  }, []);

  const handleChappalClick = (color) => {
    if (selectedChappal) return;
    
    setSelectedChappal(color);
    
    if (color === targetColor) {
      onSuccess();
    } else {
      onFail();
    }
  };

  const getColorClass = (color) => {
    const colorMap = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getBgColorClass = (color) => {
    const colorMap = {
      red: 'from-red-200 to-red-400',
      blue: 'from-blue-200 to-blue-400',
      green: 'from-green-200 to-green-400',
      yellow: 'from-yellow-200 to-yellow-400',
      purple: 'from-purple-200 to-purple-400',
      orange: 'from-orange-200 to-orange-400'
    };
    return colorMap[color] || 'from-gray-200 to-gray-400';
  };

  return (
    <div className={`h-full relative bg-gradient-to-br ${getBgColorClass(backgroundColor)} rounded-3xl overflow-hidden`}>
      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          👡 Match the chappal color with background!
        </p>
        <p className="text-white/80 font-semibold text-sm mt-1">
          Target: {targetColor.toUpperCase()}
        </p>
      </div>

      {/* Chappals Grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 p-8">
          {chappalColors.map((color, index) => (
            <motion.div
              key={color}
              className={`w-20 h-16 ${getColorClass(color)} rounded-2xl cursor-pointer shadow-lg relative overflow-hidden ${
                selectedChappal === color ? 'ring-4 ring-white' : ''
              }`}
              onClick={() => handleChappalClick(color)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: selectedChappal === color ? -10 : 0
              }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Chappal Design */}
              <div className="absolute inset-2 bg-white/20 rounded-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-8 bg-white/40 rounded-full"></div>
              </div>
              
              {/* Success/Fail indicator */}
              {selectedChappal === color && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-3xl">
                    {color === targetColor ? '✅' : '❌'}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-16 right-8 text-4xl"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        👡
      </motion.div>
    </div>
  );
};

export default MiniGameChappal;
