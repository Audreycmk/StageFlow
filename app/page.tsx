"use client";

import { useMemo, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import VenueSlotCard from "../components/VenueSlotCard";
import { venues } from "@/lib/venues";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const filteredVenues = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return venues.filter((venue) => {
      const matchesQuery =
        query.length === 0 ||
        venue.name.toLowerCase().includes(query) ||
        venue.region.toLowerCase().includes(query);
      const matchesDate = selectedDate.length === 0 || venue.date === selectedDate;
      return matchesQuery && matchesDate;
    });
  }, [searchQuery, selectedDate]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">
            StageFlow Booking
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            乾淨、優雅的現場演唱預約體驗
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            主頁顯示場次列表，可搜尋場地與地區並按日期篩選。點擊場次後查看 4
            分鐘一段的時間表，空缺時段可多選後付款預約。
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="flex flex-col gap-6">
          <SearchFilter
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            onSearchChange={setSearchQuery}
            onDateChange={setSelectedDate}
          />

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">場次列表</h2>
            <span className="text-xs text-slate-500">
              共 {filteredVenues.length} 場
            </span>
          </div>

          <div className="grid gap-4">
            {filteredVenues.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                找不到符合條件的場次。
              </div>
            ) : (
              filteredVenues.map((venue) => (
                <VenueSlotCard
                  key={venue.id}
                  name={venue.name}
                  region={venue.region}
                  date={venue.date}
                  timeRange={venue.timeRange}
                  availableSlots={venue.slots.filter((slot) => !slot.performer).length}
                  href={`/timetable/${venue.id}`}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
