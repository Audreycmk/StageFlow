"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import VenueForm from "@/components/VenueForm";
import type { VenueSession } from "@/lib/venues";
import { useVenueStore } from "@/lib/useVenueStore";

export default function NewVenuePage() {
  const router = useRouter();
  const { venues, updateVenues } = useVenueStore();

  const handleCreate = (payload: Omit<VenueSession, "id">) => {
    const newVenue: VenueSession = {
      id: `hk-${Date.now()}`,
      ...payload,
    };
    updateVenues([newVenue, ...venues]);
    router.push("/venues");
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-4xl px-6 pb-6 pt-10">
        <Link
          href="/venues"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500"
        >
          ←返回
        </Link>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
          新增場地
        </h1>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <VenueForm submitLabel="建立場地" onSubmit={handleCreate} />
      </main>
    </div>
  );
}
