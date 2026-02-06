export interface SlotItem {
  id: string;
  time: string;
  performer?: string;
}

export interface VenueSession {
  id: string;
  name: string;
  region: string;
  date: string;
  timeRange: string;
  pricePerSong: number;
  slots: SlotItem[];
}

export const venues: VenueSession[] = [
  {
    id: "hk1",
    name: "維港之聲 Livehouse",
    region: "香港｜尖沙咀",
    date: "2026-02-18",
    timeRange: "19:00 - 20:00",
    pricePerSong: 150,
    slots: [
      { id: "hk1-19:00", time: "19:00" },
      { id: "hk1-19:15", time: "19:15", performer: "Eason" },
      { id: "hk1-19:30", time: "19:30" },
      { id: "hk1-19:45", time: "19:45", performer: "阿Moon" },
    ],
  },
  {
    id: "hk2",
    name: "灣仔音樂碼頭",
    region: "香港｜灣仔",
    date: "2026-02-19",
    timeRange: "20:00 - 21:00",
    pricePerSong: 150,
    slots: [
      { id: "hk2-20:00", time: "20:00", performer: "Nina" },
      { id: "hk2-20:15", time: "20:15" },
      { id: "hk2-20:30", time: "20:30", performer: "Marco" },
      { id: "hk2-20:45", time: "20:45", performer: "雲仔" },
    ],
  },
  {
    id: "hk3",
    name: "中環星際舞台",
    region: "香港｜中環",
    date: "2026-02-20",
    timeRange: "18:30 - 19:30",
    pricePerSong: 150,
    slots: [
      { id: "hk3-18:30", time: "18:30" },
      { id: "hk3-18:45", time: "18:45", performer: "Luna" },
      { id: "hk3-19:00", time: "19:00" },
      { id: "hk3-19:15", time: "19:15", performer: "文森" },
    ],
  },
];
