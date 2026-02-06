"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import VenueForm from "@/components/VenueForm";
import type { VenueSession } from "@/lib/venues";
import { useVenueStore } from "@/lib/useVenueStore";

export default function EditVenuePage() {
  const router = useRouter();
  const params = useParams();
  const venueId = typeof params.venueId === "string" ? params.venueId : "";
  const { venues, updateVenues, isReady } = useVenueStore();

  const venue = useMemo(
    () => venues.find((item) => item.id === venueId),
    [venues, venueId]
  );

  const handleUpdate = (payload: Omit<VenueSession, "id">) => {
    const next = venues.map((item) =>
      item.id === venueId ? { ...item, ...payload } : item
    );
    updateVenues(next);
    router.push("/venues");
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-4xl px-6 pb-6 pt-10">
        <Link
          href="/venues"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500"
        >
          返回場地管理
        </Link>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
          編輯場地
        </h1>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20">
        {!isReady ? (
          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
            載入中...
          </div>
        ) : venue ? (
          <VenueForm
            initialVenue={venue}
            submitLabel="更新場地"
            onSubmit={handleUpdate}
          />
        ) : (
          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
            找不到場地，請返回列表重新選擇。
          </div>
        )}
      </main>
    </div>
  );
}
