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
  const [error, setError] = useState<string | null>(null);

  const configured = useMemo(() => isFirebaseConfigured(), []);

  useEffect(() => {
    if (!configured) {
      setMeetings(getDemoMeetingsForToday());
      setSource("demo");
      setStatus(
        "Demo data · add Firebase env vars to load real meetings from Firestore."
      );
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
              ? "Live from Firestore · collection `meetings`"
              : "No documents in `meetings` · showing demo times for today."
          );
          setError(null);
        },
        (err) => {
          setError(err.message);
          setMeetings(getDemoMeetingsForToday());
          setSource("demo");
          setStatus("Could not read Firestore · showing demo data.");
        }
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Firebase init failed");
      setMeetings(getDemoMeetingsForToday());
      setSource("demo");
      setStatus("Firebase unavailable · demo data.");
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
          {source === "firestore" ? "Live" : "Prototype"}
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

      <div className="mt-5 space-y-2 border-t border-[var(--mp-border)] pt-4 text-sm text-[var(--mp-muted)]">
        {status && <p>{status}</p>}
        {error && (
          <p className="text-red-600 dark:text-red-400" role="status">
            {error}
          </p>
        )}
        <p className="text-xs leading-relaxed opacity-90">
          Firestore docs: <code className="rounded bg-black/[0.04] px-1 py-0.5 dark:bg-white/[0.08]">title</code>,{" "}
          <code className="rounded bg-black/[0.04] px-1 py-0.5 dark:bg-white/[0.08]">start</code>,{" "}
          <code className="rounded bg-black/[0.04] px-1 py-0.5 dark:bg-white/[0.08]">end</code> (timestamps).
        </p>
      </div>
    </div>
  );
}
