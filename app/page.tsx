"use client";

import { useMemo, useState } from "react";
import BookingModal from "../components/BookingModal";
import SearchFilter from "../components/SearchFilter";
import TimeSlotList, { SlotItem } from "../components/TimeSlotList";
import VenueSlotCard from "../components/VenueSlotCard";
import { cn } from "../lib/utils";

interface VenueSession {
  id: string;
  name: string;
  region: string;
  date: string;
  timeRange: string;
  slots: SlotItem[];
}

const pricePerSlot = 120;

const venues: VenueSession[] = [
  {
    id: "v1",
    name: "光影劇場 Live Hall",
    region: "台北｜信義",
    date: "2026-02-18",
    timeRange: "19:00 - 20:00",
    slots: [
      { id: "v1-19:00", time: "19:00" },
      { id: "v1-19:04", time: "19:04", performer: "沐晨" },
      { id: "v1-19:08", time: "19:08" },
      { id: "v1-19:12", time: "19:12", performer: "允希" },
      { id: "v1-19:16", time: "19:16" },
      { id: "v1-19:20", time: "19:20" },
      { id: "v1-19:24", time: "19:24", performer: "CJ" },
      { id: "v1-19:28", time: "19:28" },
      { id: "v1-19:32", time: "19:32" },
      { id: "v1-19:36", time: "19:36", performer: "小魚" },
      { id: "v1-19:40", time: "19:40" },
      { id: "v1-19:44", time: "19:44" },
      { id: "v1-19:48", time: "19:48", performer: "Tina" },
      { id: "v1-19:52", time: "19:52" },
      { id: "v1-19:56", time: "19:56" },
    ],
  },
  {
    id: "v2",
    name: "海潮音樂吧",
    region: "台中｜西區",
    date: "2026-02-18",
    timeRange: "20:00 - 21:00",
    slots: [
      { id: "v2-20:00", time: "20:00", performer: "阿啟" },
      { id: "v2-20:04", time: "20:04" },
      { id: "v2-20:08", time: "20:08" },
      { id: "v2-20:12", time: "20:12" },
      { id: "v2-20:16", time: "20:16", performer: "Jade" },
      { id: "v2-20:20", time: "20:20" },
      { id: "v2-20:24", time: "20:24" },
      { id: "v2-20:28", time: "20:28", performer: "Ian" },
      { id: "v2-20:32", time: "20:32" },
      { id: "v2-20:36", time: "20:36" },
      { id: "v2-20:40", time: "20:40", performer: "舒涵" },
      { id: "v2-20:44", time: "20:44" },
      { id: "v2-20:48", time: "20:48" },
      { id: "v2-20:52", time: "20:52", performer: "麻糬" },
      { id: "v2-20:56", time: "20:56" },
    ],
  },
  {
    id: "v3",
    name: "星河舞台",
    region: "高雄｜苓雅",
    date: "2026-02-20",
    timeRange: "18:30 - 19:30",
    slots: [
      { id: "v3-18:30", time: "18:30" },
      { id: "v3-18:34", time: "18:34", performer: "Mu" },
      { id: "v3-18:38", time: "18:38" },
      { id: "v3-18:42", time: "18:42" },
      { id: "v3-18:46", time: "18:46" },
      { id: "v3-18:50", time: "18:50", performer: "方糖" },
      { id: "v3-18:54", time: "18:54" },
      { id: "v3-18:58", time: "18:58" },
      { id: "v3-19:02", time: "19:02" },
      { id: "v3-19:06", time: "19:06", performer: "Riley" },
      { id: "v3-19:10", time: "19:10" },
      { id: "v3-19:14", time: "19:14" },
      { id: "v3-19:18", time: "19:18" },
      { id: "v3-19:22", time: "19:22", performer: "安安" },
      { id: "v3-19:26", time: "19:26" },
    ],
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id ?? "");
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const selectedVenue = filteredVenues.find((venue) => venue.id === selectedVenueId) ??
    filteredVenues[0];

  const selectedSlots = selectedVenue
    ? selectedVenue.slots.filter((slot) => selectedSlotIds.includes(slot.id))
    : [];

  const totalAmount = selectedSlots.length * pricePerSlot;

  const handleVenueClick = (venueId: string) => {
    setSelectedVenueId(venueId);
    setSelectedSlotIds([]);
  };

  const handleToggleSlot = (slot: SlotItem) => {
    setSelectedSlotIds((prev) =>
      prev.includes(slot.id) ? prev.filter((id) => id !== slot.id) : [...prev, slot.id]
    );
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(false);
    setSelectedSlotIds([]);
  };

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

      <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 lg:grid-cols-[1.05fr_1.2fr]">
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
                  isSelected={venue.id === selectedVenue?.id}
                  onClick={() => handleVenueClick(venue.id)}
                />
              ))
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-500">
                  Time Table
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  {selectedVenue ? selectedVenue.name : "請選擇場次"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedVenue
                    ? `${selectedVenue.region} · ${selectedVenue.date} · ${selectedVenue.timeRange}`
                    : ""}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                已選 <span className="font-semibold">{selectedSlots.length}</span> 段
              </div>
            </div>

            <div className="mt-6">
              {selectedVenue ? (
                <TimeSlotList
                  slots={selectedVenue.slots}
                  selectedSlotIds={selectedSlotIds}
                  onToggle={handleToggleSlot}
                />
              ) : (
                <p className="text-sm text-slate-500">請先從左側選擇場次。</p>
              )}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/85 p-6",
              "shadow-[0_28px_70px_-45px_rgba(15,23,42,0.4)]"
            )}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Booking Summary
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                NT$ {totalAmount}
              </p>
              <p className="text-xs text-slate-500">每段 {pricePerSlot} 元</p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={selectedSlots.length === 0}
              className={cn(
                "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition",
                selectedSlots.length === 0
                  ? "cursor-not-allowed bg-slate-300"
                  : "bg-indigo-600 hover:bg-indigo-500"
              )}
            >
              付款預約
            </button>
          </div>
        </section>
      </main>

      <BookingModal
        open={isModalOpen}
        slots={selectedSlots.map((slot) => ({
          time: slot.time,
          label: `${selectedVenue?.name ?? ""} · ${selectedVenue?.date ?? ""}`,
        }))}
        totalAmount={totalAmount}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
