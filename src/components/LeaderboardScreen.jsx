
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Medal, Crown } from 'lucide-react';

const LeaderboardScreen = ({ gameState, onBack }) => {
  // Mock leaderboard data - in real app this would come from Firebase
  const leaderboardData = [
    { rank: 1, name: "Rajesh Kumar", score: 2450, avatar: "🧔" },
    { rank: 2, name: "Priya Sharma", score: 2380, avatar: "👩" },
    { rank: 3, name: "Amit Singh", score: 2290, avatar: "🕺" },
    { rank: 4, name: "Sneha Patel", score: 2150, avatar: "👻" },
    { rank: 5, name: "Vikram Rao", score: 2050, avatar: "🥟" },
    { rank: 6, name: "Anita Gupta", score: 1980, avatar: "👨‍🍳" },
    { rank: 7, name: "Rohit Mehta", score: 1890, avatar: "🏏" },
    { rank: 8, name: "Kavya Reddy", score: 1820, avatar: "👑" },
    { rank: 9, name: "Suresh Jain", score: 1750, avatar: "🤪" },
    { rank: 10, name: "Deepika Shah", score: 1680, avatar: "👩" }
  ];

  // Add current player to leaderboard if they have a score
  const currentPlayerEntry = {
    rank: 0,
    name: "You",
    score: gameState.highScore,
    avatar: "🤪",
    isCurrentPlayer: true
  };

  // Find where current player would rank
  let playerRank = leaderboardData.findIndex(entry => gameState.highScore > entry.score) + 1;
  if (playerRank === 0) playerRank = leaderboardData.length + 1;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-orange-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3: return "bg-gradient-to-r from-orange-400 to-orange-600";
      default: return "bg-white";
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-12 w-20 h-20 bg-purple-400 rounded-full opacity-25"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            duration: 4,
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

        <h1 className="game-title text-4xl font-bold">LEADERBOARD</h1>

        <div className="w-10"></div> {/* Spacer */}
      </motion.div>

      {/* Current Player Stats */}
      {gameState.highScore > 0 && (
        <motion.div 
          className="game-card rounded-3xl p-6 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Best Performance</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="text-4xl">🤪</div>
              <div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-orange-600">{gameState.highScore}</span>
                </div>
                <p className="text-gray-600">Rank #{playerRank}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top 3 Podium */}
      <motion.div 
        className="mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-lg">
          🏆 Top Champions 🏆
        </h2>
        
        <div className="flex justify-center items-end gap-4">
          {/* 2nd Place */}
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="game-card rounded-2xl p-4 bg-gradient-to-r from-gray-300 to-gray-500 text-white">
              <div className="text-3xl mb-2">{leaderboardData[1]?.avatar}</div>
              <div className="text-xs font-bold">{leaderboardData[1]?.name}</div>
              <div className="text-sm font-bold">{leaderboardData[1]?.score}</div>
            </div>
            <div className="bg-gray-400 h-16 w-full mt-2 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold">2nd</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="game-card rounded-2xl p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white relative">
              <motion.div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2"
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
                👑
              </motion.div>
              <div className="text-4xl mb-2 mt-2">{leaderboardData[0]?.avatar}</div>
              <div className="text-sm font-bold">{leaderboardData[0]?.name}</div>
              <div className="text-lg font-bold">{leaderboardData[0]?.score}</div>
            </div>
            <div className="bg-yellow-500 h-20 w-full mt-2 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">1st</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="game-card rounded-2xl p-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white">
              <div className="text-3xl mb-2">{leaderboardData[2]?.avatar}</div>
              <div className="text-xs font-bold">{leaderboardData[2]?.name}</div>
              <div className="text-sm font-bold">{leaderboardData[2]?.score}</div>
            </div>
            <div className="bg-orange-500 h-12 w-full mt-2 rounded-t-lg flex items-center justify-center">
              <span className="text-white font-bold">3rd</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div 
        className="space-y-3"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Complete Rankings
        </h3>
        
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.rank}
            className={`${getRankBg(entry.rank)} rounded-2xl p-4 shadow-lg`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.05 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="text-2xl">{entry.avatar}</div>
                <div>
                  <h4 className={`font-bold ${entry.rank <= 3 ? 'text-white' : 'text-gray-800'}`}>
                    {entry.name}
                  </h4>
                  <p className={`text-sm ${entry.rank <= 3 ? 'text-white/80' : 'text-gray-600'}`}>
                    Rank #{entry.rank}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Star className={`w-5 h-5 ${entry.rank <= 3 ? 'text-white' : 'text-yellow-500'}`} />
                  <span className={`text-xl font-bold ${entry.rank <= 3 ? 'text-white' : 'text-gray-800'}`}>
                    {entry.score}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Message */}
      <motion.div 
        className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-white/90 text-sm text-center font-medium">
          🎯 Keep playing to climb the leaderboard and become the ultimate Rage Tap champion!
        </p>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;
