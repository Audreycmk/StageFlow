'use client';

import { venues } from '@/lib/data';
import VenueCard from '@/components/VenueCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
              聲序 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">StageFlow</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4">
              你的智能表演預約夥伴
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              探索身邊的表演場地，自由選擇演唱曲目，系統智能排序，讓你輕鬆登台展現魅力
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="glass-effect px-6 py-3 rounded-full">
                <span className="text-blue-400 font-semibold">✅</span> 即時場地探索
              </div>
              <div className="glass-effect px-6 py-3 rounded-full">
                <span className="text-green-400 font-semibold">✅</span> 自訂演出曲目
              </div>
              <div className="glass-effect px-6 py-3 rounded-full">
                <span className="text-purple-400 font-semibold">✅</span> 智能排序系統
              </div>
              <div className="glass-effect px-6 py-3 rounded-full">
                <span className="text-pink-400 font-semibold">✅</span> 快速確認預約
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Venues Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">探索表演場地</h2>
          <p className="text-gray-400 text-lg">
            瀏覽你附近的可預約表演場地，選擇最適合你的舞台
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {venues.map((venue, index) => (
            <VenueCard key={venue.id} venue={venue} index={index} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">為什麼選擇 StageFlow？</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-xl"
            >
              <div className="text-5xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-white mb-3">靈活選擇</h3>
              <p className="text-gray-400">
                自由選擇演唱曲目數量，每首歌4分鐘，每首$200，讓你完全掌控表演時長和預算。
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-xl"
            >
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">智能排序</h3>
              <p className="text-gray-400">
                系統自動公平安排所有表演者的出場次序，確保每個人都有展現的機會。
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-xl"
            >
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-white mb-3">多元付款</h3>
              <p className="text-gray-400">
                支援 PayMe、FPS 轉數快和銀行轉帳，讓你用最方便的方式完成付款。
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p className="text-2xl font-bold text-white mb-2">StageFlow 聲序</p>
            <p>© 2026 StageFlow. All rights reserved.</p>
            <p className="mt-2">讓每個人都能輕鬆登台，展現自我</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
