
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Home, Heart, Coins, Star } from 'lucide-react';
import MiniGameLaddoo from '@/components/games/MiniGameLaddoo';
import MiniGameChappal from '@/components/games/MiniGameChappal';
import MiniGameMosquito from '@/components/games/MiniGameMosquito';
import MiniGameChai from '@/components/games/MiniGameChai';
import MiniGameMoney from '@/components/games/MiniGameMoney';
import MiniGameWhatsApp from '@/components/games/MiniGameWhatsApp';
import MiniGameCracker from '@/components/games/MiniGameCracker';
import MiniGameTraffic from '@/components/games/MiniGameTraffic';
import MiniGameAunty from '@/components/games/MiniGameAunty';
import MiniGameMarriage from '@/components/games/MiniGameMarriage';

const GameScreen = ({ gameState, updateGameState, onGameOver, onHome }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameTimer, setGameTimer] = useState(100);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  const miniGames = [
    { component: MiniGameLaddoo, name: "Catch the Laddoo", emoji: "🍬" },
    { component: MiniGameChappal, name: "Match Chappal Color", emoji: "👡" },
    { component: MiniGameMosquito, name: "Slap the Mosquito", emoji: "🦟" },
    { component: MiniGameChai, name: "Balance the Chai", emoji: "☕" },
    { component: MiniGameMoney, name: "Find Real Money", emoji: "💸" },
    { component: MiniGameWhatsApp, name: "Avoid Fake WhatsApp", emoji: "📱" },
    { component: MiniGameCracker, name: "Burst the Cracker", emoji: "🎇" },
    { component: MiniGameTraffic, name: "Green Light Only", emoji: "🚦" },
    { component: MiniGameAunty, name: "Dodge Aunty's Stare", emoji: "👀" },
    { component: MiniGameMarriage, name: "Stop the Proposal", emoji: "💍" }
  ];

  const getRandomGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * miniGames.length);
    return miniGames[randomIndex];
  }, []);

  const startNewGame = useCallback(() => {
    const game = getRandomGame();
    setCurrentGame(game);
    setGameTimer(100);
    setIsGameActive(true);
    setShowSuccess(false);
    setShowFail(false);
  }, [getRandomGame]);

  useEffect(() => {
    if (gameState.lives > 0) {
      startNewGame();
    }
  }, [gameState.lives, startNewGame]);

  useEffect(() => {
    if (!isGameActive || gameTimer <= 0) return;

    const timer = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) {
          handleGameFail();
          return 0;
        }
        return prev - 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isGameActive, gameTimer]);

  const handleGameSuccess = () => {
    setIsGameActive(false);
    setShowSuccess(true);
    
    const pointsEarned = Math.floor(10 + (gameState.level * 2) + (gameTimer / 10));
    const coinsEarned = Math.floor(pointsEarned / 5);
    
    updateGameState({
      score: gameState.score + pointsEarned,
      coins: gameState.coins + coinsEarned,
      level: gameState.level + 1
    });

    toast({
      title: "🎉 Ayyo Super!",
      description: `+${pointsEarned} points, +${coinsEarned} coins!`,
      duration: 1500,
    });

    setTimeout(() => {
      startNewGame();
    }, 2000);
  };

  const handleGameFail = () => {
    setIsGameActive(false);
    setShowFail(true);
    setScreenShake(true);
    
    const newLives = gameState.lives - 1;
    updateGameState({ lives: newLives });

    toast({
      title: "💥 Ayyo! Failed!",
      description: "Try again! You can do it!",
      duration: 1500,
    });

    setTimeout(() => {
      setScreenShake(false);
      if (newLives <= 0) {
        onGameOver();
      } else {
        startNewGame();
      }
    }, 2000);
  };

  if (!currentGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold">Loading Game...</p>
        </div>
      </div>
    );
  }

  const GameComponent = currentGame.component;

  return (
    <div className={`min-h-screen relative overflow-hidden ${screenShake ? 'shake' : ''}`}>
      {/* Header UI */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <Button 
          onClick={onHome}
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
        >
          <Home className="w-5 h-5 text-gray-700" />
        </Button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-bold text-red-600">{gameState.lives}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-yellow-600">{gameState.score}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <Coins className="w-5 h-5 text-green-500" />
            <span className="font-bold text-green-600">{gameState.coins}</span>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="absolute top-20 left-4 right-4 z-20">
        <div className="bg-white/30 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-lg">
          <motion.div 
            className="timer-bar h-full"
            initial={{ width: "100%" }}
            animate={{ width: `${gameTimer}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Game Title */}
      <motion.div 
        className="absolute top-32 left-4 right-4 z-20 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
          {currentGame.emoji} {currentGame.name}
        </h2>
        <p className="text-white/80 font-semibold">Level {gameState.level}</p>
      </motion.div>

      {/* Game Area */}
      <div className="absolute inset-0 pt-48 pb-8 px-4">
        <div className="mini-game-container rounded-3xl h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isGameActive && (
              <motion.div
                key={currentGame.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GameComponent 
                  onSuccess={handleGameSuccess}
                  onFail={handleGameFail}
                  timeLeft={gameTimer}
                  level={gameState.level}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.div 
                    className="text-8xl mb-4 star-burst"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    ⭐
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                    Ayyo Super! 🎉
                  </h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fail Animation */}
          <AnimatePresence>
            {showFail && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm"
              >
                <div className="text-center relative">
                  <motion.div 
                    className="text-8xl mb-4 chappal-fly absolute -top-20 left-1/2 transform -translate-x-1/2"
                  >
                    🥿
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg mt-8">
                    Ayyo! Try Again! 😅
                  </h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
