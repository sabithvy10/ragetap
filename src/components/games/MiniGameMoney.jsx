
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MiniGameMoney = ({ onSuccess, onFail, timeLeft, level }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Generate notes - one real, others fake
    const realNoteIndex = Math.floor(Math.random() * 6);
    const newNotes = Array.from({ length: 6 }, (_, index) => ({
      id: index,
      isReal: index === realNoteIndex,
      value: 500,
      color: index === realNoteIndex ? 'from-purple-400 to-purple-600' : 'from-gray-400 to-gray-600',
      pattern: index === realNoteIndex ? '✓' : '✗'
    }));
    
    setNotes(newNotes);
  }, []);

  const handleNoteClick = (note) => {
    if (selectedNote) return;
    
    setSelectedNote(note.id);
    
    setTimeout(() => {
      if (note.isReal) {
        onSuccess();
      } else {
        onFail();
      }
    }, 500);
  };

  return (
    <div className="h-full relative bg-gradient-to-br from-green-200 to-green-400 rounded-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-12 left-12 w-8 h-8 bg-yellow-300 rounded-full opacity-50"></div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          💸 Find the REAL ₹500 note!
        </p>
        <p className="text-white/80 font-semibold text-sm">
          Look for the correct security features
        </p>
      </div>

      {/* Money Notes Grid */}
      <div className="absolute inset-0 pt-20 pb-8 px-4">
        <div className="grid grid-cols-3 gap-3 h-full">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              className={`bg-gradient-to-br ${note.color} rounded-xl cursor-pointer shadow-lg relative overflow-hidden border-2 ${
                selectedNote === note.id ? 'border-yellow-400 ring-4 ring-yellow-400/50' : 'border-white/30'
              }`}
              onClick={() => handleNoteClick(note)}
              initial={{ scale: 0, rotate: Math.random() * 20 - 10 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: selectedNote === note.id ? -5 : 0
              }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Note Design */}
              <div className="p-2 h-full flex flex-col justify-between">
                {/* Top Section */}
                <div className="text-center">
                  <div className="text-xs font-bold text-white/90">RESERVE BANK</div>
                  <div className="text-lg font-bold text-white">₹500</div>
                </div>
                
                {/* Middle Section - Security Feature */}
                <div className="text-center">
                  <div className={`text-2xl ${note.isReal ? 'text-yellow-300' : 'text-red-300'}`}>
                    {note.isReal ? '🔒' : '❌'}
                  </div>
                  <div className="text-xs text-white/70">
                    {note.isReal ? 'SECURE' : 'FAKE'}
                  </div>
                </div>
                
                {/* Bottom Section */}
                <div className="text-center">
                  <div className="text-xs font-bold text-white/90">INDIA</div>
                  <div className="text-xs text-white/70">
                    {note.isReal ? 'AUTHENTIC' : 'COUNTERFEIT'}
                  </div>
                </div>
              </div>

              {/* Selection Effect */}
              {selectedNote === note.id && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-4xl">
                    {note.isReal ? '✅' : '❌'}
                  </div>
                </motion.div>
              )}

              {/* Shimmer effect for real note */}
              {note.isReal && selectedNote === null && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-white/80 text-xs font-medium">
          💡 Real notes have security features like watermarks and special patterns
        </p>
      </div>
    </div>
  );
};

export default MiniGameMoney;
