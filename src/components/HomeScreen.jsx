
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Shirt, ShoppingCart, Trophy, Heart, Coins, Settings, Volume2 } from 'lucide-react';

const HomeScreen = ({ gameState, onPlay, onSkins, onShop, onLeaderboard }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 right-16 w-16 h-16 bg-pink-500 rounded-full opacity-40"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 bg-green-400 rounded-full opacity-25"
          animate={{ 
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header Stats */}
      <motion.div 
        className="absolute top-4 left-4 right-4 flex justify-between items-center z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <Heart className="w-5 h-5 text-red-500" />
          <span className="font-bold text-red-600">{gameState.lives}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-yellow-600">{gameState.coins}</span>
        </div>
      </motion.div>

      {/* Settings Icons */}
      <motion.div 
        className="absolute top-4 right-4 flex gap-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
        >
          <Volume2 className="w-5 h-5 text-gray-700" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
        >
          <Settings className="w-5 h-5 text-gray-700" />
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8 max-w-md w-full">
        {/* Game Title */}
        <motion.div 
          className="text-center"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
        >
          <h1 className="game-title text-5xl md:text-6xl font-bold mb-2">
            RAGE TAP
          </h1>
          <motion.p 
            className="text-2xl font-bold text-white drop-shadow-lg"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Desi Challenge 🔥
          </motion.p>
        </motion.div>

        {/* Character Animation */}
        <motion.div 
          className="relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-6xl shadow-2xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🤪
          </motion.div>
          <motion.div 
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⭐
          </motion.div>
        </motion.div>

        {/* High Score Display */}
        {gameState.highScore > 0 && (
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-center text-gray-700 font-semibold">
              🏆 Best Score: <span className="text-orange-600 font-bold">{gameState.highScore}</span>
            </p>
          </motion.div>
        )}

        {/* Main Menu Buttons */}
        <motion.div 
          className="w-full space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onPlay}
            className="w-full h-16 text-xl font-bold desi-button text-white rounded-2xl pulse-glow"
          >
            <Play className="w-6 h-6 mr-3" />
            PLAY NOW!
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={onSkins}
              variant="outline" 
              className="h-14 desi-button bg-purple-500 text-white border-white hover:bg-purple-600"
            >
              <Shirt className="w-5 h-5 mr-2" />
              Skins
            </Button>
            <Button 
              onClick={onShop}
              variant="outline" 
              className="h-14 desi-button bg-green-500 text-white border-white hover:bg-green-600"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop
            </Button>
          </div>

          <Button 
            onClick={onLeaderboard}
            variant="outline" 
            className="w-full h-14 desi-button bg-blue-500 text-white border-white hover:bg-blue-600"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>
        </motion.div>

        {/* Fun Tagline */}
        <motion.p 
          className="text-center text-white/80 text-sm font-medium max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          "Ayyo! Get ready for the most frustratingly fun desi games ever! 🤣"
        </motion.p>
      </div>
    </div>
  );
};

export default HomeScreen;
