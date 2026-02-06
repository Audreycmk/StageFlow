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
