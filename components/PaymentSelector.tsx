'use client';

import { PaymentMethod } from '@/lib/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PaymentSelectorProps {
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

export default function PaymentSelector({ onPaymentMethodChange }: PaymentSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('payme');

  const paymentMethods = [
    { id: 'payme', name: 'PayMe', icon: '💳', description: '快速支付' },
    { id: 'fps', name: 'FPS 轉數快', icon: '⚡', description: '即時轉帳' },
    { id: 'bank-transfer', name: '銀行轉帳', icon: '🏦', description: '傳統轉帳' },
  ];

  const handleSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onPaymentMethodChange(method);
  };

  return (
    <div className="glass-effect p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">選擇付款方式</h3>
      
      <div className="grid gap-3">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(method.id as PaymentMethod)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-gray-700 glass-effect hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{method.icon}</span>
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">{method.name}</p>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm">
          💡 選擇線上付款方式可立即確認預約。選擇銀行轉帳需要1-2個工作天確認。
        </p>
      </div>
    </div>
  );
}
