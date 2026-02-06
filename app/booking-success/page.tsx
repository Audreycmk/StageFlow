'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import React from 'react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const venue = searchParams.get('venue');
  const songs = searchParams.get('songs');
  const cost = searchParams.get('cost');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="glass-effect p-8 sm:p-12 rounded-2xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
          >
            <span className="text-5xl">✓</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            預約成功！
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-8"
          >
            你的表演時段已確認
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-8"
          >
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">表演場地</span>
                <span className="text-white font-semibold">{venue || '未指定'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">演唱曲數</span>
                <span className="text-white font-semibold">{songs || 0} 首</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">表演時長</span>
                <span className="text-white font-semibold">{(Number(songs) || 0) * 4} 分鐘</span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-300">總費用</span>
                <span className="text-green-400 font-bold text-2xl">HK$ {cost || 0}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                🤖 系統正在智能安排所有表演者的出場順序，我們會通過短訊通知你確實的表演時間。
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-300 text-sm">
                📱 請留意你的手機短訊，我們會在表演日前一天發送提醒。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 space-y-3"
          >
            <Link href="/" className="block">
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all">
                返回首頁
              </button>
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full py-4 glass-effect text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              列印確認單
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-gray-500 text-sm"
          >
            預約編號: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="text-white">載入中...</div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
