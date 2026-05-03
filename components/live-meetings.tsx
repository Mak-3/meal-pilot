"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import {
  formatTimeRange,
  getDemoMeetingsForToday,
  type Meeting,
} from "@/lib/meetings-data";
import { getFirestoreDb, isFirebaseConfigured } from "@/lib/firebase-client";

function firestoreToMeeting(
  id: string,
  data: Record<string, unknown>
): Meeting | null {
  const title = typeof data.title === "string" ? data.title : "Meeting";
  const start = data.start as Timestamp | undefined;
  const end = data.end as Timestamp | undefined;
  if (!start?.toDate || !end?.toDate) return null;
  return {
    id,
    title,
    start: start.toDate(),
    end: end.toDate(),
  };
}

export function LiveMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(() =>
    getDemoMeetingsForToday()
  );
  const [source, setSource] = useState<"firestore" | "demo">("demo");
  const [status, setStatus] = useState<string | null>(null);

  const configured = useMemo(() => isFirebaseConfigured(), []);

  useEffect(() => {
    if (!configured) {
      setMeetings(getDemoMeetingsForToday());
      setSource("demo");
      setStatus("Example schedule for today.");
      return;
    }

    let unsub: (() => void) | undefined;
    try {
      const db = getFirestoreDb();
      const q = query(
        collection(db, "meetings"),
        orderBy("start", "asc"),
        limit(24)
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const next: Meeting[] = [];
          snap.forEach((doc) => {
            const m = firestoreToMeeting(doc.id, doc.data());
            if (m) next.push(m);
          });
          setMeetings(next.length ? next : getDemoMeetingsForToday());
          setSource(next.length ? "firestore" : "demo");
          setStatus(
            next.length
              ? "Updates when your calendar changes."
              : "Nothing on the calendar yet—here’s a sample day."
          );
        },
        () => {
          setMeetings(getDemoMeetingsForToday());
          setSource("demo");
          setStatus(
            "Couldn’t refresh right now. Showing an example schedule."
          );
        }
      );
    } catch {
      setMeetings(getDemoMeetingsForToday());
      setSource("demo");
      setStatus("Couldn’t refresh right now. Showing an example schedule.");
    }
    return () => unsub?.();
  }, [configured]);

  return (
    <div className="rounded-2xl border border-[var(--mp-border)] bg-[var(--mp-surface)] p-6 shadow-[var(--mp-shadow)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mp-muted)]">
            Today&apos;s meetings
          </p>
          <h3 className="font-display mt-1 text-xl font-medium tracking-tight text-[var(--mp-ink)]">
            Pulled from your calendar sync
          </h3>
        </div>
        <span
          className={
            source === "firestore"
              ? "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-500/25 dark:text-emerald-200"
              : "rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-500/30 dark:text-amber-100"
          }
        >
          {source === "firestore" ? "Synced" : "Example"}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {meetings.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between gap-4 rounded-xl bg-[var(--mp-card)] px-4 py-3 ring-1 ring-black/[0.04] dark:ring-white/[0.06]"
          >
            <span className="font-medium text-[var(--mp-ink)]">{m.title}</span>
            <time className="shrink-0 text-sm tabular-nums text-[var(--mp-muted)]">
              {formatTimeRange(m.start, m.end)}
            </time>
          </li>
        ))}
      </ul>

      {status && (
        <div className="mt-5 border-t border-[var(--mp-border)] pt-4 text-sm text-[var(--mp-muted)]">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
