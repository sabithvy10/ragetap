
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { 
  Play, 
  Shirt, 
  ShoppingCart, 
  Trophy, 
  Heart, 
  Coins, 
  Star,
  Home,
  Volume2,
  Settings,
  Gift
} from 'lucide-react';
import HomeScreen from '@/components/HomeScreen';
import GameScreen from '@/components/GameScreen';
import FailScreen from '@/components/FailScreen';
import ShopScreen from '@/components/ShopScreen';
import SkinsScreen from '@/components/SkinsScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameState, setGameState] = useState({
    lives: 3,
    score: 0,
    coins: 100,
    level: 1,
    highScore: 0,
    unlockedSkins: ['default'],
    currentSkin: 'default',
    boosters: {
      extraLife: 0,
      autoWin: 0
    },
    razorpayKeyId: 'YOUR_RAZORPAY_KEY_ID' // Placeholder
  });

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('rageTapGameState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setGameState(prev => ({ ...prev, ...parsed, razorpayKeyId: prev.razorpayKeyId }));
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('rageTapGameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      lives: 3,
      score: 0,
      level: 1
    }));
  };

  const handleGameOver = () => {
    if (gameState.score > gameState.highScore) {
      updateGameState({ highScore: gameState.score });
      toast({
        title: "🎉 New High Score!",
        description: `Amazing! You scored ${gameState.score} points!`,
        duration: 3000,
      });
    }
    setCurrentScreen('fail');
  };

  const handleWatchAd = () => {
    toast({
      title: "📺 Ad Watched!",
      description: "You earned 25 coins and 1 extra life!",
      duration: 2000,
    });
    updateGameState({ 
      coins: gameState.coins + 25,
      lives: Math.min(gameState.lives + 1, 5)
    });
  };

  const handleContinueWithAd = () => {
    toast({
      title: "📺 Continue with Ad!",
      description: "You can keep playing!",
      duration: 2000,
    });
    updateGameState({ lives: 1 });
    setCurrentScreen('game');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            gameState={gameState}
            onPlay={() => setCurrentScreen('game')}
            onSkins={() => setCurrentScreen('skins')}
            onShop={() => setCurrentScreen('shop')}
            onLeaderboard={() => setCurrentScreen('leaderboard')}
          />
        );
      case 'game':
        return (
          <GameScreen 
            gameState={gameState}
            updateGameState={updateGameState}
            onGameOver={handleGameOver}
            onHome={() => setCurrentScreen('home')}
          />
        );
      case 'fail':
        return (
          <FailScreen 
            gameState={gameState}
            onPlayAgain={() => {
              resetGame();
              setCurrentScreen('game');
            }}
            onHome={() => setCurrentScreen('home')}
            onWatchAd={handleContinueWithAd}
          />
        );
      case 'shop':
        return (
          <ShopScreen 
            gameState={gameState}
            updateGameState={updateGameState}
            onBack={() => setCurrentScreen('home')}
            onWatchAd={handleWatchAd}
          />
        );
      case 'skins':
        return (
          <SkinsScreen 
            gameState={gameState}
            updateGameState={updateGameState}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardScreen 
            gameState={gameState}
            onBack={() => setCurrentScreen('home')}
          />
        );
      default:
        return <HomeScreen gameState={gameState} onPlay={() => setCurrentScreen('game')} />;
    }
  };

  return (
    <div className="min-h-screen game-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;
