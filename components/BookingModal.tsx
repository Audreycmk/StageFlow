"use client";

import { X } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  slots: { time: string; label: string }[];
  totalAmount: number;
  currencyLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BookingModal({
  open,
  slots,
  totalAmount,
  currencyLabel = "HK$",
  onClose,
  onConfirm,
}: BookingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
              Booking
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              確認預約與付款
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-indigo-200 hover:text-indigo-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {slots.map((slot) => (
            <div key={slot.time} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{slot.label}</span>
              <span className="font-medium text-slate-800">{slot.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-slate-500">總金額</span>
          <span className="text-lg font-semibold text-slate-900">
            {currencyLabel} {totalAmount}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
          >
            付款並預約
          </button>
        </div>
      </div>
    </div>
  );
}
