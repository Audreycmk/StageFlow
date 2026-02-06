"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  cn,
  formatTimeRange,
  formatZhDate,
  getTotalSongsFromRange,
  parseTimeToMinutes,
} from "@/lib/utils";
import { useVenueStore } from "@/lib/useVenueStore";

export default function TimetablePage() {
  const params = useParams();
  const venueId = typeof params.venueId === "string" ? params.venueId : "";

  const { venues, updateVenues, isReady } = useVenueStore();

  const venue = useMemo(
    () => venues.find((item) => item.id === venueId),
    [venueId, venues]
  );

  const [singerName, setSingerName] = useState("");
  const [songCount, setSongCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const unitPrice = venue?.pricePerSong ?? 150;
  const totalSongs = venue ? getTotalSongsFromRange(venue.timeRange) : 0;
  const bookedSongs = venue
    ? venue.bookings.reduce((sum, booking) => sum + booking.songs, 0)
    : 0;
  const remainingSongs = Math.max(0, totalSongs - bookedSongs);
  const totalSingers = venue ? venue.bookings.length : 0;

  const scheduleEntries = useMemo(() => {
    if (!venue) return [] as Array<{ singer: string; songNumber: number }>;
    const maxSongs = venue.bookings.reduce(
      (max, booking) => Math.max(max, booking.songs),
      0
    );
    const entries: Array<{ singer: string; songNumber: number }> = [];
    for (let songNumber = 1; songNumber <= maxSongs; songNumber += 1) {
      venue.bookings.forEach((booking) => {
        if (booking.songs >= songNumber) {
          entries.push({ singer: booking.singer, songNumber });
        }
      });
    }
    return entries;
  }, [venue]);

  const timetable = useMemo(() => {
    if (!venue)
      return [] as Array<{
        time: string;
        booked: boolean;
        singer?: string;
        songNumber?: number;
      }>;
    const [startTime] = venue.timeRange.split(" - ");
    const startMinutes = parseTimeToMinutes(startTime ?? "");
    if (startMinutes === null) return [];
    return Array.from({ length: totalSongs }).map((_, index) => {
      const slotStart = startMinutes + index * 4;
      const slotEnd = slotStart + 4;
      const formatMinutes = (value: number) => {
        const hour24 = Math.floor(value / 60);
        const minute = value % 60;
        const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
        return `${hour12}:${minute.toString().padStart(2, "0")}`;
      };
      const timeLabel = `${formatMinutes(slotStart)}-${formatMinutes(slotEnd)}`;
      const entry = scheduleEntries[index];
      if (!entry) {
        return { time: timeLabel, booked: false };
      }
      return {
        time: timeLabel,
        booked: true,
        singer: entry.singer,
        songNumber: entry.songNumber,
      };
    });
  }, [venue, totalSongs, scheduleEntries]);

  const colorClasses = [
    "border-violet-200 bg-violet-50/80 text-violet-700",
    "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    "border-yellow-200 bg-yellow-50/80 text-yellow-700",
    "border-pink-200 bg-pink-50/80 text-pink-700",
    "border-amber-200 bg-amber-50/80 text-amber-700",
    "border-lime-200 bg-lime-50/80 text-lime-700",
    "border-orange-200 bg-orange-50/80 text-orange-700",
    "border-teal-200 bg-teal-50/80 text-teal-700",
    "border-slate-200 bg-slate-50/80 text-slate-700",
    "border-cyan-200 bg-cyan-50/80 text-cyan-700",
    "border-rose-200 bg-rose-50/80 text-rose-700",
  ];

  const singerColorMap = useMemo(() => {
    if (!venue) return new Map<string, string>();
    const map = new Map<string, string>();
    venue.bookings.forEach((booking, index) => {
      if (!map.has(booking.singer)) {
        map.set(booking.singer, colorClasses[index % colorClasses.length]);
      }
    });
    return map;
  }, [venue]);

  const getSingerClass = (singer?: string) => {
    if (!singer) return "border-slate-200 bg-slate-50 text-slate-700";
    return singerColorMap.get(singer) ?? colorClasses[0];
  };

  const handlePurchase = () => {
    if (!venue) return;
    const trimmedName = singerName.trim();
    if (!trimmedName) {
      setErrorMessage("請輸入表演者名稱。");
      return;
    }
    if (songCount < 1 || songCount > remainingSongs) {
      setErrorMessage("購買數量超出可預約名額。");
      return;
    }
    const nextVenues = venues.map((item) => {
      if (item.id !== venue.id) return item;
      return {
        ...item,
        bookings: [
          ...item.bookings,
          { id: `bk-${Date.now()}`, singer: trimmedName, songs: songCount },
        ],
      };
    });
    updateVenues(nextVenues);
    setSingerName("");
    setSongCount(1);
    setErrorMessage("");
    setIsPaymentOpen(false);
  };

  const handleCancelSlot = (singer?: string) => {
    if (!venue || !singer) return;
    const confirmed = window.confirm("要取消這個時段嗎？");
    if (!confirmed) return;

    const nextVenues = venues.map((item) => {
      if (item.id !== venue.id) return item;
      const nextBookings = item.bookings
        .map((booking) =>
          booking.singer === singer
            ? { ...booking, songs: Math.max(booking.songs - 1, 0) }
            : booking
        )
        .filter((booking) => booking.songs > 0);
      return { ...item, bookings: nextBookings };
    });
    updateVenues(nextVenues);
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
          預約演唱
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          選擇購買歌曲數量，即可確認表演位置。
        </p>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-500">
                  Time Table
                </p>
                <div className="rounded-2xl bg-slate-50 px-4 py-2 text-xs text-slate-600">
                  已售 <span className="font-semibold">{bookedSongs}</span> / {totalSongs} 首
                </div>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                {venue ? venue.name : "找不到場次"}
              </h2>
              {venue ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:inline-flex">
                    {venue.region}
                  </span>
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {formatZhDate(venue.date)}
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    {formatTimeRange(venue.timeRange)}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6">
            {!isReady ? (
              <p className="text-sm text-slate-500">載入中...</p>
            ) : venue ? (
              <div className="grid max-h-[20rem] gap-3 overflow-y-auto pr-1 md:max-h-[26rem]">
                {timetable.map((slot, index) => (
                  <button
                    type="button"
                    key={`${slot.time}-${index}`}
                    onClick={() => slot.booked && handleCancelSlot(slot.singer)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border px-4 py-3 text-sm text-left",
                      slot.booked
                        ? "cursor-pointer transition hover:opacity-90"
                        : "cursor-default",
                      slot.booked
                        ? getSingerClass(slot.singer)
                        : "border-dashed border-slate-200 bg-white text-slate-400"
                    )}
                  >
                    <span className="font-medium text-slate-800">{slot.time}</span>
                    {slot.booked ? (
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {slot.singer}
                        </span>
                        <span className="text-xs text-slate-600">
                          歌曲{slot.songNumber}
                        </span>
                      </span>
                    ) : (
                      <span>可預約</span>
                    )}
                  </button>
                ))}
              </div>
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
              HK$ {songCount * unitPrice}
            </p>
            <p className="text-xs text-slate-500">每首 HK$ {unitPrice}</p>
            <p className="mt-2 text-xs text-slate-500">
              共 <span className="font-semibold text-slate-700">{totalSingers}</span> 位歌手參加
            </p>
            <p className="mt-2 text-xs text-slate-500">
              尚餘 <span className="font-semibold text-slate-700">{remainingSongs}</span> 首
            </p>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.4)]">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              購買歌曲數量
            </p>
            <div className="mt-4 grid gap-3">
              <input
                value={singerName}
                onChange={(event) => setSingerName(event.target.value)}
                placeholder="表演者名稱"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
              />
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span>購買數量</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSongCount((prev) => Math.max(1, prev - 1))}
                    disabled={songCount <= 1}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                      songCount <= 1
                        ? "cursor-not-allowed border-slate-200 text-slate-300"
                        : "border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                    )}
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">
                    {songCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSongCount((prev) => Math.min(remainingSongs || 1, prev + 1))
                    }
                    disabled={remainingSongs === 0 || songCount >= remainingSongs}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                      remainingSongs === 0 || songCount >= remainingSongs
                        ? "cursor-not-allowed border-slate-200 text-slate-300"
                        : "border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                    )}
                  >
                    +
                  </button>
                </div>
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-500">{errorMessage}</p>
              )}
              <button
                type="button"
                onClick={() => setIsPaymentOpen(true)}
                disabled={!venue || remainingSongs === 0}
                className={cn(
                  "rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition",
                  !venue || remainingSongs === 0
                    ? "cursor-not-allowed bg-slate-300"
                    : "bg-indigo-600 hover:bg-indigo-500"
                )}
              >
                付款預約
              </button>
            </div>
          </div>
        </aside>
      </main>

      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-[80vw] max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] sm:max-w-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                  💰 付款資料
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">付款方式</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                關閉
              </button>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">✅ 轉數快 (FPS) / PayMe</p>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    電話：9000 9999
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    戶口名稱：Tom Chan
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">✅ 銀行轉賬</p>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    銀行：恒生銀行
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    戶口：298-123456-001
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                    持有人：陳浩霖 / Tom Chan
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <p className="text-sm font-semibold">⚠️ 溫馨提示：</p>
                <p className="mt-2 text-xs leading-6">
                  入數後請影相/截圖發回，並註明訂單編號，方便對數。謝謝！
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsPaymentOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handlePurchase}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
              >
                已付款，確認預約
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
