'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SongSelectorProps {
  onSongsChange: (songs: number) => void;
  pricePerSong: number;
}

export default function SongSelector({ onSongsChange, pricePerSong }: SongSelectorProps) {
  const [numberOfSongs, setNumberOfSongs] = useState(1);

  const handleChange = (value: number) => {
    const songs = Math.max(1, Math.min(15, value));
    setNumberOfSongs(songs);
    onSongsChange(songs);
  };

  const totalCost = numberOfSongs * pricePerSong;
  const totalDuration = numberOfSongs * 4;

  return (
    <div className="glass-effect p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">選擇演唱曲目數量</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => handleChange(numberOfSongs - 1)}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/10 transition-colors flex items-center justify-center text-2xl font-bold"
          disabled={numberOfSongs <= 1}
        >
          -
        </button>
        
        <div className="flex-1 text-center">
          <motion.div
            key={numberOfSongs}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-white"
          >
            {numberOfSongs}
          </motion.div>
          <p className="text-gray-400 mt-2">首歌曲</p>
        </div>
        
        <button
          onClick={() => handleChange(numberOfSongs + 1)}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/10 transition-colors flex items-center justify-center text-2xl font-bold"
          disabled={numberOfSongs >= 15}
        >
          +
        </button>
      </div>

      <input
        type="range"
        min="1"
        max="15"
        value={numberOfSongs}
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />

      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-gray-300">
          <span>表演時長</span>
          <span className="text-white font-semibold">{totalDuration} 分鐘</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>單曲價格</span>
          <span className="text-white font-semibold">${pricePerSong}</span>
        </div>
        <div className="h-px bg-gray-700" />
        <div className="flex justify-between text-lg">
          <span className="text-gray-300">總費用</span>
          <motion.span
            key={totalCost}
            initial={{ scale: 1.2, color: '#60a5fa' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="font-bold text-2xl"
          >
            ${totalCost}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
