export function getMSSQLDate(): string {
  const date = new Date();
  const pad = (n: number): string => (n < 10 ? "0" + n : n.toString());

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function parseMSSQLDate(mssqlDate: string): Date {
  const [datePart, timePart] = mssqlDate.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Note: Months in JavaScript Date object are zero-indexed (0-11)
  return new Date(year, month - 1, day, hours, minutes, seconds);
}
export function formatDate(date: Date): string {
  return date
    .toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+)(.+?)(\d+)/, "$2$1, $3");
}
