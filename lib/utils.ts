export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

export function formatZhDate(dateInput: string) {
  const date = new Date(`${dateInput}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateInput;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const weekday = WEEKDAYS[date.getDay()] ?? "";
  return `${day}/${month} ${weekday}`.trim();
}

function to12Hour(time: string) {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  if (Number.isNaN(hour)) return time;
  const period = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}${minute === "00" ? "" : ":" + minute}${period}`;
}

export function formatTimeRange(timeRange: string) {
  const [start, end] = timeRange.split(" - ");
  if (!start || !end) return timeRange;
  return `${to12Hour(start)} - ${to12Hour(end)}`;
}

export function parseTimeToMinutes(time: string) {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return hour * 60 + minute;
}

export function getTotalSongsFromRange(timeRange: string) {
  const [start, end] = timeRange.split(" - ");
  if (!start || !end) return 0;
  const startMin = parseTimeToMinutes(start);
  const endMin = parseTimeToMinutes(end);
  if (startMin === null || endMin === null) return 0;
  return Math.max(0, Math.floor((endMin - startMin) / 4));
}

export function formatSlotRange(startMinutes: number) {
  const endMinutes = startMinutes + 4;
  const startHour = Math.floor(startMinutes / 60)
    .toString()
    .padStart(2, "0");
  const startMinute = (startMinutes % 60).toString().padStart(2, "0");
  const endHour = Math.floor(endMinutes / 60)
    .toString()
    .padStart(2, "0");
  const endMinute = (endMinutes % 60).toString().padStart(2, "0");
  return `${to12Hour(`${startHour}:${startMinute}`)} - ${to12Hour(`${endHour}:${endMinute}`)}`;
}
