"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface VenueSlotCardProps {
  name: string;
  region: string;
  date: string;
  timeRange: string;
  availableSlots: number;
  isSelected?: boolean;
  href?: string;
  onClick?: () => void;
}

export default function VenueSlotCard({
  name,
  region,
  date,
  timeRange,
  availableSlots,
  isSelected,
  href,
  onClick,
}: VenueSlotCardProps) {
  const cardClassName = cn(
    "group flex w-full flex-col gap-3 rounded-2xl border px-5 py-4 text-left transition",
    "bg-white/90 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] hover:-translate-y-0.5",
    isSelected ? "border-indigo-500/70 ring-2 ring-indigo-200" : "border-white/70"
  );

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-500">
            {region}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {availableSlots} 空檔
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">{date}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{timeRange}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cardClassName}>
      {content}
    </button>
  );
}
