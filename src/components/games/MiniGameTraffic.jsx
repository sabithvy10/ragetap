
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameTraffic = ({ onSuccess, onFail, timeLeft, level }) => {
  const [lights, setLights] = useState([]);
  const [clickedLights, setClickedLights] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Generate traffic lights
    const newLights = Array.from({ length: 6 }, (_, index) => ({
      id: index,
      color: Math.random() > 0.5 ? 'green' : Math.random() > 0.5 ? 'red' : 'yellow',
      position: {
        x: (index % 3) * 30 + 20,
        y: Math.floor(index / 3) * 40 + 25
      }
    }));
    
    setLights(newLights);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    // Check if all green lights are clicked
    const greenLights = lights.filter(light => light.color === 'green');
    const clickedGreenLights = clickedLights.filter(id => {
      const light = lights.find(l => l.id === id);
      return light && light.color === 'green';
    });

    if (greenLights.length > 0 && clickedGreenLights.length === greenLights.length) {
      // Check if any non-green lights were clicked
      const hasWrongClick = clickedLights.some(id => {
        const light = lights.find(l => l.id === id);
        return light && light.color !== 'green';
      });

      if (hasWrongClick) {
        onFail();
      } else {
        onSuccess();
      }
    }
  }, [clickedLights, lights, gameStarted, onSuccess, onFail]);

  const handleLightClick = (lightId) => {
    if (clickedLights.includes(lightId)) return;
    
    const light = lights.find(l => l.id === lightId);
    setClickedLights(prev => [...prev, lightId]);
    
    // If clicked a non-green light, fail immediately
    if (light.color !== 'green'){
      setTimeout(() => onFail(), 300);
    }
  };

  const getLightColor = (color) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getLightGlow = (color) => {
    switch (color) {
      case 'green': return 'shadow-green-400';
      case 'red': return 'shadow-red-400';
      case 'yellow': return 'shadow-yellow-400';
      default: return 'shadow-gray-400';
    }
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl overflow-hidden">
      {/* Background - Road */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-700">
          {/* Road markings */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white opacity-60"></div>
          <div className="absolute top-1/2 left-0 right-0 flex justify-around">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-8 h-1 bg-yellow-300"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          🚦 Tap ONLY the GREEN traffic lights!
        </p>
        <p className="text-white/80 font-semibold text-sm">
          Avoid red and yellow lights
        </p>
      </div>

      {/* Traffic Lights */}
      <div className="absolute inset-0 pt-16 pb-24">
        {lights.map((light, index) => (
          <motion.div
            key={light.id}
            className="absolute cursor-pointer"
            style={{
              left: `${light.position.x}%`,
              top: `${light.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleLightClick(light.id)}
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Traffic Light Pole */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-16 bg-gray-600 rounded-full mb-2"></div>
              
              {/* Traffic Light Box */}
              <div className="bg-gray-800 rounded-lg p-2 shadow-lg">
                <div className="space-y-1">
                  {/* Red Light */}
                  <div className={`w-8 h-8 rounded-full ${
                    light.color === 'red' ? 'bg-red-500 shadow-lg shadow-red-400' : 'bg-gray-600'
                  }`}></div>
                  
                  {/* Yellow Light */}
                  <div className={`w-8 h-8 rounded-full ${
                    light.color === 'yellow' ? 'bg-yellow-500 shadow-lg shadow-yellow-400' : 'bg-gray-600'
                  }`}></div>
                  
                  {/* Green Light */}
                  <div className={`w-8 h-8 rounded-full ${
                    light.color === 'green' ? 'bg-green-500 shadow-lg shadow-green-400' : 'bg-gray-600'
                  }`}></div>
                </div>
              </div>
            </div>

            {/* Click Effect */}
            {clickedLights.includes(light.id) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <div className="text-4xl">
                  {light.color === 'green' ? '✅' : '❌'}
                </div>
              </motion.div>
            )}

            {/* Glow effect for green lights */}
            {light.color === 'green' && !clickedLights.includes(light.id) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(34, 197, 94, 0.5)",
                    "0 0 30px rgba(34, 197, 94, 0.8)",
                    "0 0 10px rgba(34, 197, 94, 0.5)"
                  ]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-white/20 rounded-full p-2">
          <div className="flex justify-center gap-2">
            {lights.filter(l => l.color === 'green').map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  clickedLights.filter(id => {
                    const light = lights.find(l => l.id === id);
                    return light && light.color === 'green';
                  }).length > index ? 'bg-green-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGameTraffic;
