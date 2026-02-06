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
  slots: SlotItem[];
}

export const pricePerSlot = 120;

export const venues: VenueSession[] = [
  {
    id: "hk1",
    name: "維港之聲 Livehouse",
    region: "香港｜尖沙咀",
    date: "2026-02-18",
    timeRange: "19:00 - 20:00",
    slots: [
      { id: "hk1-19:00", time: "19:00" },
      { id: "hk1-19:04", time: "19:04", performer: "Eason" },
      { id: "hk1-19:08", time: "19:08" },
      { id: "hk1-19:12", time: "19:12", performer: "阿Moon" },
      { id: "hk1-19:16", time: "19:16" },
      { id: "hk1-19:20", time: "19:20" },
      { id: "hk1-19:24", time: "19:24", performer: "Jade" },
      { id: "hk1-19:28", time: "19:28" },
      { id: "hk1-19:32", time: "19:32" },
      { id: "hk1-19:36", time: "19:36", performer: "Kay" },
      { id: "hk1-19:40", time: "19:40" },
      { id: "hk1-19:44", time: "19:44" },
      { id: "hk1-19:48", time: "19:48", performer: "Sandy" },
      { id: "hk1-19:52", time: "19:52" },
      { id: "hk1-19:56", time: "19:56" },
    ],
  },
  {
    id: "hk2",
    name: "灣仔音樂碼頭",
    region: "香港｜灣仔",
    date: "2026-02-19",
    timeRange: "20:00 - 21:00",
    slots: [
      { id: "hk2-20:00", time: "20:00", performer: "Nina" },
      { id: "hk2-20:04", time: "20:04" },
      { id: "hk2-20:08", time: "20:08" },
      { id: "hk2-20:12", time: "20:12" },
      { id: "hk2-20:16", time: "20:16", performer: "Marco" },
      { id: "hk2-20:20", time: "20:20" },
      { id: "hk2-20:24", time: "20:24" },
      { id: "hk2-20:28", time: "20:28", performer: "雲仔" },
      { id: "hk2-20:32", time: "20:32" },
      { id: "hk2-20:36", time: "20:36" },
      { id: "hk2-20:40", time: "20:40", performer: "思喬" },
      { id: "hk2-20:44", time: "20:44" },
      { id: "hk2-20:48", time: "20:48" },
      { id: "hk2-20:52", time: "20:52", performer: "Perry" },
      { id: "hk2-20:56", time: "20:56" },
    ],
  },
  {
    id: "hk3",
    name: "中環星際舞台",
    region: "香港｜中環",
    date: "2026-02-20",
    timeRange: "18:30 - 19:30",
    slots: [
      { id: "hk3-18:30", time: "18:30" },
      { id: "hk3-18:34", time: "18:34", performer: "Luna" },
      { id: "hk3-18:38", time: "18:38" },
      { id: "hk3-18:42", time: "18:42" },
      { id: "hk3-18:46", time: "18:46" },
      { id: "hk3-18:50", time: "18:50", performer: "文森" },
      { id: "hk3-18:54", time: "18:54" },
      { id: "hk3-18:58", time: "18:58" },
      { id: "hk3-19:02", time: "19:02" },
      { id: "hk3-19:06", time: "19:06", performer: "Riley" },
      { id: "hk3-19:10", time: "19:10" },
      { id: "hk3-19:14", time: "19:14" },
      { id: "hk3-19:18", time: "19:18" },
      { id: "hk3-19:22", time: "19:22", performer: "阿童" },
      { id: "hk3-19:26", time: "19:26" },
    ],
  },
];
