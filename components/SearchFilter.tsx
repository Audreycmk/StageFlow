"use client";

import { Calendar, Search } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  selectedDate: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function SearchFilter({
  searchQuery,
  selectedDate,
  onSearchChange,
  onDateChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜尋場地或地區"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm">
        <Calendar className="h-4 w-4 text-slate-400" />
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
