export type Meeting = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

function atToday(h: number, m: number): Date {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function getDemoMeetingsForToday(): Meeting[] {
  return [
    {
      id: "demo-1",
      title: "Stand-up",
      start: atToday(9, 30),
      end: atToday(9, 45),
    },
    {
      id: "demo-2",
      title: "Design review",
      start: atToday(14, 0),
      end: atToday(14, 30),
    },
    {
      id: "demo-3",
      title: "1:1 with lead",
      start: atToday(16, 15),
      end: atToday(16, 45),
    },
  ];
}

export function formatTimeRange(start: Date, end: Date): string {
  const fmt = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}
