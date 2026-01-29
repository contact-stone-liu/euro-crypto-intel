export function nowUtc(): Date {
  return new Date(new Date().toISOString());
}

export function hoursBetweenUtc(a: Date, b: Date): number {
  const ms = Math.abs(a.getTime() - b.getTime());
  return ms / 1000 / 60 / 60;
}

export function toGdeltDateTime(dt: Date): string {
  // GDELT 需要 YYYYMMDDHHMMSS（UTC）
  const iso = dt.toISOString(); // 2026-01-13T...
  const s = iso.replace(/[-:]/g, "").replace("T", "").slice(0, 14);
  return s + "00";
}

export function isoUtc(dt: Date): string {
  return dt.toISOString();
}
