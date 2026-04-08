/** Display year from ISO `createdAt`, or empty if invalid. */
export function workProjectYear(iso: string): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return String(d.getFullYear());
}

export const workHeadingFont = { fontFamily: "Josefin Sans, sans-serif" } as const;
