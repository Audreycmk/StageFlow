'use client';

import { venues, generatePerformanceSlots, calculateCost } from '@/lib/data';
import { PerformanceSlot, PaymentMethod } from '@/lib/types';
import SlotCard from '@/components/SlotCard';
import SongSelector from '@/components/SongSelector';
import PaymentSelector from '@/components/PaymentSelector';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [venueId, setVenueId] = useState<string>('');
  const [venue, setVenue] = useState<typeof venues[0] | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<PerformanceSlot | null>(null);
  const [numberOfSongs, setNumberOfSongs] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payme');
  const [performerName, setPerformerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Handle async params
  useEffect(() => {
    params.then(p => {
      setVenueId(p.id);
      setVenue(venues.find(v => v.id === p.id));
    });
  }, [params]);

  const slots = useMemo(() => {
    if (!venueId) return [];
    return generatePerformanceSlots().filter(slot => slot.venueId === venueId);
  }, [venueId]);

  // Group slots by date
  const slotsByDate = useMemo(() => {
    const grouped = new Map<string, PerformanceSlot[]>();
    slots.forEach(slot => {
      const dateStr = slot.date.toLocaleDateString('zh-HK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
      if (!grouped.has(dateStr)) {
        grouped.set(dateStr, []);
      }
      grouped.get(dateStr)!.push(slot);
    });
    return grouped;
  }, [slots]);

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">找不到場地</h1>
          <Link href="/" className="text-blue-400 hover:underline">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const totalCost = calculateCost(numberOfSongs, venue.pricePerSong);

  const handleSlotSelect = (slot: PerformanceSlot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleBooking = () => {
    if (!selectedSlot || !performerName || !phoneNumber) {
      alert('請填寫所有必填資料');
      return;
    }

    const booking = {
      venueId: venue.id,
      slotId: selectedSlot.id,
      performerName,
      phoneNumber,
      email,
      numberOfSongs,
      totalCost,
      paymentMethod,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };

    // Store booking in localStorage for demo
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      ...booking,
      id: `booking-${Date.now()}`,
      bookingDate: new Date().toISOString(),
      paymentStatus: 'pending',
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Navigate to confirmation page
    router.push(`/booking-success?venue=${venue.name}&songs=${numberOfSongs}&cost=${totalCost}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-400 hover:underline flex items-center gap-2">
            <span>←</span> 返回場地列表
          </Link>
        </div>
      </div>

      {/* Venue Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 sm:h-96 overflow-hidden"
      >
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{venue.name}</h1>
              <p className="text-xl text-gray-300">{venue.location}</p>
              <div className="flex gap-4 mt-4">
                <span className="glass-effect px-4 py-2 rounded-full text-sm">
                  容量: {venue.capacity} 人
                </span>
                <span className="glass-effect px-4 py-2 rounded-full text-sm">
                  ${venue.pricePerSong} / 首歌
                </span>
                <span className="glass-effect px-4 py-2 rounded-full text-sm">
                  {venue.songDuration} 分鐘 / 首
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Time Slots */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">選擇表演時段</h2>
              
              <div className="space-y-8">
                {Array.from(slotsByDate.entries()).slice(0, 7).map(([date, dateSlots]) => (
                  <div key={date}>
                    <h3 className="text-lg font-semibold text-white mb-4">{date}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {dateSlots.map(slot => (
                        <SlotCard
                          key={slot.id}
                          slot={slot}
                          onSelect={handleSlotSelect}
                          selected={selectedSlot?.id === slot.id}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="sticky top-4 space-y-6"
            >
              <SongSelector
                onSongsChange={setNumberOfSongs}
                pricePerSong={venue.pricePerSong}
              />

              {showBookingForm && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-effect p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4">表演者資料</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          姓名 *
                        </label>
                        <input
                          type="text"
                          value={performerName}
                          onChange={(e) => setPerformerName(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="請輸入你的姓名"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          電話號碼 *
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="請輸入電話號碼"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          電郵 (選填)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <PaymentSelector onPaymentMethodChange={setPaymentMethod} />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={!performerName || !phoneNumber}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    確認預約 - ${totalCost}
                  </motion.button>
                </motion.div>
              )}

              {!showBookingForm && (
                <div className="glass-effect p-6 rounded-xl text-center">
                  <p className="text-gray-400">
                    請先選擇一個時段開始預約
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
