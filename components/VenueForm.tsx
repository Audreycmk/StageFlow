"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { VenueSession } from "@/lib/venues";

interface VenueFormProps {
  initialVenue?: VenueSession;
  submitLabel: string;
  onSubmit: (payload: Omit<VenueSession, "id">) => void;
}

interface VenueFormState {
  name: string;
  region: string;
  date: string;
  pricePerSong: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

const MINUTES = ["00", "15", "30", "45"];

function toMinutes(value: string) {
  const [h, m] = value.split(":").map((part) => Number(part));
  return h * 60 + m;
}

function toTime(value: number) {
  const hours = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function toHourMinute(time24: string) {
  const [hour, minute] = time24.split(":");
  return {
    hour: (hour ?? "00").padStart(2, "0"),
    minute: minute ?? "00",
  };
}

function composeTime(hour: string, minute: string) {
  return `${hour}:${minute}`;
}

function buildSlots(venueId: string, startTime: string, endTime: string) {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const slots: VenueSession["slots"] = [];
  for (let t = start; t < end; t += 4) {
    const time = toTime(t);
    slots.push({ id: `${venueId}-${time}`, time });
  }
  return slots;
}

export default function VenueForm({ initialVenue, submitLabel, onSubmit }: VenueFormProps) {
  const initialState = useMemo<VenueFormState>(() => {
    if (!initialVenue) {
      return {
        name: "",
        region: "香港｜",
        date: "",
        pricePerSong: "150",
        startHour: "19",
        startMinute: "00",
        endHour: "20",
        endMinute: "00",
      };
    }

    const [startTime, endTime] = initialVenue.timeRange.split(" - ");
    const startParsed = toHourMinute(startTime ?? "19:00");
    const endParsed = toHourMinute(endTime ?? "20:00");

    return {
      name: initialVenue.name,
      region: initialVenue.region,
      date: initialVenue.date,
      pricePerSong: String(initialVenue.pricePerSong ?? 150),
      startHour: startParsed.hour,
      startMinute: startParsed.minute,
      endHour: endParsed.hour,
      endMinute: endParsed.minute,
    };
  }, [initialVenue]);

  const [form, setForm] = useState<VenueFormState>(initialState);

  const startTime = composeTime(form.startHour, form.startMinute);
  const endTime = composeTime(form.endHour, form.endMinute);

  const canSubmit =
    form.name.trim().length > 0 &&
    form.region.trim().length > 0 &&
    form.date.trim().length > 0 &&
    Number(form.pricePerSong) > 0 &&
    toMinutes(startTime) < toMinutes(endTime);

  const handleSubmit = () => {
    if (!canSubmit) return;
    const venueId = initialVenue?.id ?? `hk-${Date.now()}`;
    const timeRange = `${startTime} - ${endTime}`;
    const slots = buildSlots(venueId, startTime, endTime);

    onSubmit({
      name: form.name.trim(),
      region: form.region.trim(),
      date: form.date,
      pricePerSong: Number(form.pricePerSong),
      timeRange,
      slots,
      bookings: initialVenue?.bookings ?? [],
    });
  };

  return (
    <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)]">
      <p className="mt-1 text-sm text-slate-500">請填寫場地資訊與演出時段。</p>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            場地名稱
          </label>
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            placeholder="例如：維港之聲 Livehouse"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            地區
          </label>
          <input
            value={form.region}
            onChange={(event) => setForm({ ...form, region: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            placeholder="例如：香港｜尖沙咀"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            日期
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            每首費用 (HK$)
          </label>
          <input
            type="number"
            min={1}
            step={10}
            value={form.pricePerSong}
            onChange={(event) => setForm({ ...form, pricePerSong: event.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            placeholder="150"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            開始時間
          </label>
          <div className="grid grid-cols-[1fr_0.9fr] gap-2">
            <select
              value={form.startHour}
              onChange={(event) => setForm({ ...form, startHour: event.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            >
              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              value={form.startMinute}
              onChange={(event) => setForm({ ...form, startMinute: event.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            >
              {MINUTES.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            結束時間
          </label>
          <div className="grid grid-cols-[1fr_0.9fr] gap-2">
            <select
              value={form.endHour}
              onChange={(event) => setForm({ ...form, endHour: event.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            >
              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              value={form.endMinute}
              onChange={(event) => setForm({ ...form, endMinute: event.target.value })}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            >
              {MINUTES.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition",
              canSubmit ? "bg-indigo-600 hover:bg-indigo-500" : "bg-slate-300"
            )}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
