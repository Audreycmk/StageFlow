'use client';

import { Venue } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface VenueCardProps {
  venue: Venue;
  index: number;
}

export default function VenueCard({ venue, index }: VenueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/venues/${venue.id}`}>
        <div className="glass-effect rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <div className="relative h-48 overflow-hidden">
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-1">{venue.name}</h3>
              <p className="text-sm text-gray-300">{venue.location}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">容量</p>
                <p className="text-white font-semibold">{venue.capacity} 人</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">每首歌曲</p>
                <p className="text-green-400 font-bold text-xl">${venue.pricePerSong}</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-blue-400 text-sm group-hover:underline">
                查看可用時段 →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
