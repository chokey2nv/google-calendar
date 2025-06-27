export function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day; // back to Sunday
  return new Date(date.setDate(diff));
}

export function formatHour(hour: number) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour > 12 ? hour - 12 : hour;
  return `${hour12} ${suffix}`;
}

export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}