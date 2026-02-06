"use client";

import { cn } from "@/lib/utils";
import type { SlotItem } from "@/lib/venues";

export type { SlotItem };

interface TimeSlotListProps {
  slots: SlotItem[];
  selectedSlotIds: string[];
  onToggle: (slot: SlotItem) => void;
}

export default function TimeSlotList({
  slots,
  selectedSlotIds,
  onToggle,
}: TimeSlotListProps) {
  return (
    <div className="grid gap-3">
      {slots.map((slot) => {
        const isBooked = Boolean(slot.performer);
        const isSelected = selectedSlotIds.includes(slot.id);
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => !isBooked && onToggle(slot)}
            className={cn(
              "flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition",
              isBooked
                ? "cursor-not-allowed border-slate-200 bg-slate-100/80 text-slate-500"
                : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm",
              isSelected && "border-indigo-500 bg-indigo-50/70"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-800">
                {slot.time}
              </span>
              <span className="text-xs text-slate-500">
                {isBooked ? slot.performer : "可預約"}
              </span>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                isBooked
                  ? "bg-slate-200 text-slate-600"
                  : isSelected
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-50 text-indigo-600"
              )}
            >
              {isBooked ? "已預約" : isSelected ? "已選" : "空檔"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
