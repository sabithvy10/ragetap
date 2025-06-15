
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameMarriage = ({ onSuccess, onFail, timeLeft, level }) => {
  const [countdown, setCountdown] = useState(10);
  const [proposalStopped, setProposalStopped] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (proposalStopped || buttonPressed) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          onFail();
          return 0;
        }
        return newCount;
      });
    }, 1000 - level * 50);

    return () => clearInterval(timer);
  }, [proposalStopped, buttonPressed, level, onFail]);

  const handleStopProposal = () => {
    if (buttonPressed) return;
    
    setButtonPressed(true);
    setProposalStopped(true);
    onSuccess();
  };

  const getUrgencyColor = () => {
    if (countdown > 7) return 'from-green-400 to-green-600';
    if (countdown > 4) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getUrgencyMessage = () => {
    if (countdown > 7) return "Take your time...";
    if (countdown > 4) return "Getting serious now...";
    return "URGENT! STOP IT NOW!";
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-rose-200 to-rose-400 rounded-3xl overflow-hidden">
      {/* Background - Wedding Scene */}
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-12 h-12 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute top-16 right-12 w-8 h-8 bg-pink-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-16 w-10 h-10 bg-red-300 rounded-full opacity-30"></div>
        
        {/* Decorative hearts */}
        <motion.div 
          className="absolute top-12 left-1/2 transform -translate-x-1/2 text-2xl"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💕
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          💍 Stop the marriage proposal before countdown ends!
        </p>
      </div>

      {/* Main Scene */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        {/* Countdown Display */}
        <motion.div 
          className={`mb-8 text-center bg-gradient-to-r ${getUrgencyColor()} rounded-3xl p-6 shadow-lg`}
          animate={{ 
            scale: countdown <= 3 ? [1, 1.1, 1] : 1,
            rotate: countdown <= 3 ? [0, 2, -2, 0] : 0
          }}
          transition={{ 
            duration: 0.3,
            repeat: countdown <= 3 ? Infinity : 0
          }}
        >
          <div className="text-6xl font-bold text-white mb-2">
            {countdown}
          </div>
          <p className="text-white font-semibold">
            {getUrgencyMessage()}
          </p>
        </motion.div>

        {/* Marriage Scene */}
        <div className="text-center mb-8">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-4"
            animate={{
              scale: proposalStopped ? [1, 0.8, 1] : [1, 1.05, 1]
            }}
            transition={{
              duration: proposalStopped ? 0.5 : 1,
              repeat: proposalStopped ? 0 : Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-5xl">🤵</div>
            <motion.div 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💍
            </motion.div>
            <div className="text-5xl">👰</div>
          </motion.div>
          
          <motion.p 
            className="text-white font-bold text-lg drop-shadow-lg"
            animate={{ opacity: proposalStopped ? 0.5 : [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: proposalStopped ? 0 : Infinity }}
          >
            {proposalStopped ? "Proposal Stopped!" : "\"Will you marry me?\""}
          </motion.p>
        </div>

        {/* Stop Button */}
        {!proposalStopped && (
          <motion.button
            className={`w-48 h-20 bg-gradient-to-r ${
              countdown <= 3 ? 'from-red-500 to-red-700' : 'from-purple-500 to-purple-700'
            } text-white font-bold text-xl rounded-3xl shadow-lg`}
            onClick={handleStopProposal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: countdown <= 3 
                ? [
                    "0 0 20px rgba(239, 68, 68, 0.5)",
                    "0 0 40px rgba(239, 68, 68, 0.8)",
                    "0 0 20px rgba(239, 68, 68, 0.5)"
                  ]
                : "0 8px 25px rgba(0,0,0,0.3)"
            }}
            transition={{
              boxShadow: { duration: 0.5, repeat: Infinity }
            }}
          >
            🛑 STOP PROPOSAL!
          </motion.button>
        )}

        {/* Success Effect */}
        {proposalStopped && (
          <motion.div
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">✅</div>
            <p className="text-white font-bold text-xl drop-shadow-lg">
              Crisis Averted! 😅
            </p>
          </motion.div>
        )}
      </div>

      {/* Panic Mode Effect */}
      {countdown <= 3 && !proposalStopped && (
        <motion.div
          className="absolute inset-0 bg-red-500/20 pointer-events-none"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 60 + 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {['💐', '🎊', '💒', '🎉', '💕', '👑'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MiniGameMarriage;
