"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { VenueSession } from "@/lib/venues";
import { useVenueStore } from "@/lib/useVenueStore";

export default function VenueCrudPage() {
  const { venues, updateVenues, isReady } = useVenueStore();

  const handleDelete = (venueId: string) => {
    const next = venues.filter((venue) => venue.id !== venueId);
    updateVenues(next);
  };

  const summary = useMemo(() => {
    const total = venues.length;
    const upcoming = venues.filter((venue) => venue.date >= new Date().toISOString().slice(0, 10))
      .length;
    return { total, upcoming };
  }, [venues]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-6xl px-6 pb-6 pt-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500"
        >
         ←返回
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            場地管理
          </h1>
          <Link
            href="/venues/new"
            className="rounded-full border border-indigo-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 transition hover:border-indigo-300"
          >
            新增場地
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          檢視、編輯與刪除場地。時間表會依照場次時間自動生成 15 分鐘區間。
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">總場次</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.total}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">未來場次</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.upcoming}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {!isReady ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                載入中...
              </div>
            ) : venues.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
                尚未建立場地，請在右側新增。
              </div>
            ) : (
              venues.map((venue) => (
                <div
                  key={venue.id}
                  className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                        {venue.region}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {venue.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {venue.date} · {venue.timeRange}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/venues/${venue.id}/edit`}
                        className="rounded-full border border-indigo-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 transition hover:border-indigo-300"
                      >
                        編輯
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(venue.id)}
                        className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 transition hover:border-rose-300"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
