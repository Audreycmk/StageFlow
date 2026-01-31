'use client';

import { PerformanceSlot } from '@/lib/types';
import { motion } from 'framer-motion';

interface SlotCardProps {
  slot: PerformanceSlot;
  onSelect: (slot: PerformanceSlot) => void;
  selected?: boolean;
}

export default function SlotCard({ slot, onSelect, selected }: SlotCardProps) {
  const availablePercentage = ((slot.availableSlots - slot.bookedPerformers) / slot.availableSlots) * 100;
  const isAvailable = slot.bookedPerformers < slot.availableSlots;

  return (
    <motion.button
      whileHover={{ scale: isAvailable ? 1.02 : 1 }}
      whileTap={{ scale: isAvailable ? 0.98 : 1 }}
      onClick={() => isAvailable && onSelect(slot)}
      disabled={!isAvailable}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-500/20'
          : isAvailable
          ? 'border-gray-700 glass-effect hover:border-blue-400'
          : 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-white font-semibold text-lg">
            {slot.startTime} - {slot.endTime}
          </p>
          <p className="text-gray-400 text-sm">{slot.duration} 小時演出</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isAvailable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isAvailable ? '可預約' : '已滿'}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">已預約表演者</span>
          <span className="text-white">{slot.bookedPerformers} / {slot.availableSlots}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              availablePercentage > 50 ? 'bg-green-500' : availablePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${(slot.bookedPerformers / slot.availableSlots) * 100}%` }}
          />
        </div>
      </div>
    </motion.button>
  );
}
