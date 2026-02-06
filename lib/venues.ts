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
  bookings: Array<{
    id: string;
    singer: string;
    songs: number;
  }>;
}

export const venues: VenueSession[] = [
  {
    id: "hk1",
    name: " 牛池灣文娛中心",
    region: "九龍｜牛池灣",
    date: "2026-02-18",
    timeRange: "19:00 - 21:00",
    pricePerSong: 100,
    slots: [
      { id: "hk1-19:00", time: "19:00" },
      { id: "hk1-19:15", time: "19:15", performer: "Eason" },
      { id: "hk1-19:30", time: "19:30" },
      { id: "hk1-19:45", time: "19:45", performer: "阿Moon" },
    ],
    bookings: [
      { id: "b1", singer: "Eason", songs: 2 },
      { id: "b2", singer: "鍾生", songs: 1 },
    ],
  },
  {
    id: "hk2",
    name: "沙田大會堂",
    region: "新界｜沙田",
    date: "2026-02-19",
    timeRange: "20:00 - 21:00",
    pricePerSong: 150,
    slots: [
    ],
    bookings: [],
  },
  {
    id: "hk3",
    name: "大埔文娛中心",
    region: "新界｜大埔",
    date: "2026-02-20",
    timeRange: "14:30 - 16·:30",
    pricePerSong: 150,
    slots: [

    ],
    bookings: [],
  },
];
