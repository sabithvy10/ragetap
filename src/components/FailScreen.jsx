
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Home, Tv, Heart, Star } from 'lucide-react';

const FailScreen = ({ gameState, onPlayAgain, onHome, onWatchAd }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-red-400 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-20 h-20 bg-orange-400 rounded-full opacity-25"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        {/* Fail Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="relative">
            <motion.div 
              className="text-8xl mb-4"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              😵
            </motion.div>
            <motion.div 
              className="absolute -top-4 -right-4 text-4xl chappal-fly"
              initial={{ x: -100, rotate: 0 }}
              animate={{ x: 100, rotate: 360 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              🥿
            </motion.div>
          </div>
        </motion.div>

        {/* Game Over Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="game-title text-5xl font-bold mb-4">
            GAME OVER!
          </h1>
          <p className="text-2xl font-bold text-white drop-shadow-lg">
            Ayyo! Better luck next time! 😅
          </p>
        </motion.div>

        {/* Score Display */}
        <motion.div 
          className="game-card rounded-3xl p-6 space-y-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Final Score:</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-orange-600">{gameState.score}</span>
            </div>
          </div>
          
          {gameState.score === gameState.highScore && gameState.score > 0 && (
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-3"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(255, 193, 7, 0.5)",
                  "0 0 40px rgba(255, 193, 7, 0.8)",
                  "0 0 20px rgba(255, 193, 7, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <p className="font-bold text-center">🎉 NEW HIGH SCORE! 🎉</p>
            </motion.div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Best Score:</span>
            <span className="text-xl font-bold text-purple-600">{gameState.highScore}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Level Reached:</span>
            <span className="text-xl font-bold text-blue-600">{gameState.level}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button 
            onClick={onPlayAgain}
            className="w-full h-16 text-xl font-bold desi-button text-white rounded-2xl pulse-glow"
          >
            <Play className="w-6 h-6 mr-3" />
            PLAY AGAIN!
          </Button>

          <Button 
            onClick={onWatchAd}
            variant="outline" 
            className="w-full h-14 desi-button bg-green-500 text-white border-white hover:bg-green-600"
          >
            <Tv className="w-5 h-5 mr-2" />
            Watch Ad to Continue
          </Button>

          <Button 
            onClick={onHome}
            variant="outline" 
            className="w-full h-14 desi-button bg-blue-500 text-white border-white hover:bg-blue-600"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <p className="text-white/90 font-medium text-sm">
            "Don't worry! Even the best players fail sometimes. 
            Practice makes perfect! 💪"
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FailScreen;
