"use client";

import { useEffect, useState } from "react";
import type { VenueSession } from "@/lib/venues";
import { loadVenues, saveVenues } from "@/lib/venue-store";

export function useVenueStore() {
  const [venues, setVenues] = useState<VenueSession[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setVenues(loadVenues());
    setIsReady(true);
  }, []);

  const updateVenues = (next: VenueSession[]) => {
    setVenues(next);
    saveVenues(next);
  };

  return { venues, updateVenues, isReady };
}
