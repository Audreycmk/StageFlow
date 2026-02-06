"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchFilter from "../components/SearchFilter";
import VenueSlotCard from "../components/VenueSlotCard";
import { useVenueStore } from "@/lib/useVenueStore";
import { getTotalSongsFromRange } from "@/lib/utils";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { venues, isReady } = useVenueStore();

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
  }, [searchQuery, selectedDate, venues]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">
              <Image src="/mic.png" alt="StageFlow" width={30} height={30} />
              <span className="text-lg">聲序 StageFlow</span>
            </div>
            <Link
              href="/venues"
              className="rounded-full border border-indigo-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 transition hover:border-indigo-300"
            >
              管理場地
            </Link>
          </div>
      
          {/* <h2 className="text-lg font-medium text-slate-700 md:text-xl">
            智能演唱預約體驗
          </h2> */}
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            探索可預約表演場地與時段，自由選擇想演唱的歌曲數量，一鍵預約專屬表演時段。
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
            {!isReady ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                載入中...
              </div>
            ) : filteredVenues.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                找不到符合條件的場次。
              </div>
            ) : (
              filteredVenues.map((venue) => {
                const totalSongs = getTotalSongsFromRange(venue.timeRange);
                const bookedSongs = venue.bookings.reduce(
                  (sum, booking) => sum + booking.songs,
                  0
                );
                const availableSlots = Math.max(0, totalSongs - bookedSongs);

                return (
                  <VenueSlotCard
                    key={venue.id}
                    name={venue.name}
                    region={venue.region}
                    date={venue.date}
                    timeRange={venue.timeRange}
                    availableSlots={availableSlots}
                    href={`/timetable/${venue.id}`}
                  />
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
