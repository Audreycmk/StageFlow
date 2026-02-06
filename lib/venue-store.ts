import type { VenueSession } from "@/lib/venues";
import { venues as defaultVenues } from "@/lib/venues";

const STORAGE_KEY = "stageflow:venues";

export function loadVenues(): VenueSession[] {
  if (typeof window === "undefined") return defaultVenues;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultVenues;
  try {
    const parsed = JSON.parse(raw) as VenueSession[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultVenues;
    return parsed.map((venue) => ({
      ...venue,
      pricePerSong: venue.pricePerSong ?? 150,
      bookings: venue.bookings ?? [],
    }));
  } catch {
    return defaultVenues;
  }
}

export function saveVenues(venues: VenueSession[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(venues));
}

export function resetVenues() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
