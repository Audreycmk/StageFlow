"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import BookingModal from "@/components/BookingModal";
import TimeSlotList from "@/components/TimeSlotList";
import { cn } from "@/lib/utils";
import { useVenueStore } from "@/lib/useVenueStore";

export default function TimetablePage() {
  const params = useParams();
  const venueId = typeof params.venueId === "string" ? params.venueId : "";

  const { venues } = useVenueStore();

  const venue = useMemo(
    () => venues.find((item) => item.id === venueId),
    [venueId, venues]
  );

  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedSlots = venue
    ? venue.slots.filter((slot) => selectedSlotIds.includes(slot.id))
    : [];

  const unitPrice = venue?.pricePerSong ?? 150;
  const totalAmount = selectedSlots.length * unitPrice;

  const handleToggleSlot = (slot: { id: string }) => {
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
      <header className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500"
        >
          ←返回
        </Link>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
          15 分鐘一段的演唱時間表
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          選擇空檔時段後完成付款，即可確認表演位置。
        </p>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-500">
                Time Table
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                {venue ? venue.name : "找不到場次"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {venue ? `${venue.region} · ${venue.date} · ${venue.timeRange}` : ""}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              已選 <span className="font-semibold">{selectedSlots.length}</span> 段
            </div>
          </div>

          <div className="mt-6">
            {venue ? (
              <TimeSlotList
                slots={venue.slots}
                selectedSlotIds={selectedSlotIds}
                onToggle={handleToggleSlot}
              />
            ) : (
              <p className="text-sm text-slate-500">請返回首頁重新選擇場次。</p>
            )}
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.4)]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Booking Summary
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              HK$ {totalAmount}
            </p>
            <p className="text-xs text-slate-500">每首 HK$ {unitPrice}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={selectedSlots.length === 0}
            className={cn(
              "rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition",
              selectedSlots.length === 0
                ? "cursor-not-allowed bg-slate-300"
                : "bg-indigo-600 hover:bg-indigo-500"
            )}
          >
            付款預約
          </button>
        </aside>
      </main>

      <BookingModal
        open={isModalOpen}
        slots={selectedSlots.map((slot) => ({
          time: slot.time,
          label: `${venue?.name ?? ""} · ${venue?.date ?? ""}`,
        }))}
        totalAmount={totalAmount}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        currencyLabel="HK$"
      />
    </div>
  );
}
