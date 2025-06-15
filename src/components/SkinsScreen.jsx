
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Coins, Check, Lock } from 'lucide-react';

const SkinsScreen = ({ gameState, updateGameState, onBack }) => {
  const skins = [
    {
      id: 'default',
      name: 'Default Dude',
      emoji: '🤪',
      price: 0,
      description: 'The classic crazy guy'
    },
    {
      id: 'kurta',
      name: 'Kurta Guy',
      emoji: '🧔',
      price: 100,
      description: 'Traditional and stylish'
    },
    {
      id: 'samosa',
      name: 'Samosa Head',
      emoji: '🥟',
      price: 150,
      description: 'Crispy and delicious'
    },
    {
      id: 'saree',
      name: 'Saree Ghost',
      emoji: '👻',
      price: 200,
      description: 'Spooky but elegant'
    },
    {
      id: 'bollywood',
      name: 'Bollywood Star',
      emoji: '🕺',
      price: 250,
      description: 'Dance like nobody\'s watching'
    },
    {
      id: 'cricket',
      name: 'Cricket Hero',
      emoji: '🏏',
      price: 300,
      description: 'Hit it for a six!'
    },
    {
      id: 'chef',
      name: 'Desi Chef',
      emoji: '👨‍🍳',
      price: 350,
      description: 'Master of spices'
    },
    {
      id: 'royal',
      name: 'Maharaja',
      emoji: '👑',
      price: 500,
      description: 'Royal and majestic'
    }
  ];

  const handleSkinSelect = (skin) => {
    if (!gameState.unlockedSkins.includes(skin.id)) {
      if (gameState.coins < skin.price) {
        toast({
          title: "💰 Not Enough Coins!",
          description: `You need ${skin.price - gameState.coins} more coins!`,
          duration: 2000,
        });
        return;
      }

      // Purchase skin
      updateGameState({
        coins: gameState.coins - skin.price,
        unlockedSkins: [...gameState.unlockedSkins, skin.id],
        currentSkin: skin.id
      });

      toast({
        title: "🎉 Skin Unlocked!",
        description: `You unlocked ${skin.name}!`,
        duration: 2000,
      });
    } else {
      // Select skin
      updateGameState({ currentSkin: skin.id });
      toast({
        title: "✨ Skin Selected!",
        description: `Now playing as ${skin.name}!`,
        duration: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-16 left-8 w-20 h-20 bg-purple-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-12 w-16 h-16 bg-pink-400 rounded-full opacity-25"
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>

        <h1 className="game-title text-4xl font-bold">SKINS</h1>

        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-yellow-600">{gameState.coins}</span>
        </div>
      </motion.div>

      {/* Current Skin Display */}
      <motion.div 
        className="game-card rounded-3xl p-6 mb-6 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Currently Playing As:</h2>
        <motion.div 
          className="text-8xl mb-2"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {skins.find(skin => skin.id === gameState.currentSkin)?.emoji || '🤪'}
        </motion.div>
        <p className="text-lg font-semibold text-gray-700">
          {skins.find(skin => skin.id === gameState.currentSkin)?.name || 'Default Dude'}
        </p>
      </motion.div>

      {/* Skins Grid */}
      <div className="grid grid-cols-2 gap-4">
        {skins.map((skin, index) => {
          const isUnlocked = gameState.unlockedSkins.includes(skin.id);
          const isSelected = gameState.currentSkin === skin.id;
          const canAfford = gameState.coins >= skin.price;

          return (
            <motion.div
              key={skin.id}
              className={`game-card rounded-2xl p-4 relative ${
                isSelected ? 'ring-4 ring-orange-400' : ''
              }`}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              <div className="text-center">
                <div className="text-6xl mb-3 relative">
                  {isUnlocked ? skin.emoji : '🔒'}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-gray-500/50 rounded-lg flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-700" />
                    </div>
                  )}
                </div>
                
                <h3 className="font-bold text-gray-800 text-sm mb-1">{skin.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{skin.description}</p>
                
                {isUnlocked ? (
                  <Button 
                    onClick={() => handleSkinSelect(skin)}
                    className={`w-full h-8 text-xs ${
                      isSelected 
                        ? 'bg-orange-500 text-white' 
                        : 'desi-button bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={isSelected}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleSkinSelect(skin)}
                    disabled={!canAfford}
                    className={`w-full h-8 text-xs ${
                      canAfford 
                        ? 'desi-button bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      <span>{skin.price}</span>
                    </div>
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Tip */}
      <motion.div 
        className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-white/90 text-sm text-center font-medium">
          🎨 Collect coins by playing games to unlock more awesome skins!
        </p>
      </motion.div>
    </div>
  );
};

export default SkinsScreen;
