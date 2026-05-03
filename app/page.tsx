import { LiveMeetings } from "@/components/live-meetings";
import {
  lunchAdjustment,
  profiles,
  teamOrderPreview,
  tomorrowBasket,
} from "@/lib/dummy-prototype";

export default function Home() {
  return (
    <div className="text-[var(--mp-ink)]">
      <header className="sticky top-0 z-50 border-b border-[var(--mp-border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mp-accent)] text-lg text-white shadow-lg shadow-[var(--mp-accent)]/25"
              aria-hidden
            >
              ◈
            </span>
            <span className="font-display text-lg tracking-tight">
              Meal Pilot
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--mp-muted)] sm:flex">
            <a href="#calendar" className="transition hover:text-[var(--mp-ink)]">
              Calendar
            </a>
            <a href="#profiles" className="transition hover:text-[var(--mp-ink)]">
              Profiles
            </a>
            <a href="#team" className="transition hover:text-[var(--mp-ink)]">
              Team orders
            </a>
          </nav>
          <a
            href="#calendar"
            className="rounded-full bg-[var(--mp-ink)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
          >
            View prototype
          </a>
        </div>
      </header>

      <section className="mp-grain relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[image:var(--mp-mesh)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--mp-border)] bg-[var(--mp-surface)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mp-muted)] shadow-sm backdrop-blur">
            Prototype · Automation agent for food
          </p>
          <h1 className="font-display mt-8 max-w-3xl text-4xl leading-[1.08] tracking-tight text-[var(--mp-ink)] sm:text-5xl lg:text-6xl">
            Food and groceries on autopilot—timed to your{" "}
            <span className="italic text-[var(--mp-accent)]">real day</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--mp-muted)] sm:text-xl">
            Lunch lands when you have a gap. Coffee hits at nine. The basket for
            tomorrow already has milk—and paneer, because you said so last night.
            Team orders pick a restaurant that matches everyone&apos;s arrival
            window.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#calendar"
              className="inline-flex items-center justify-center rounded-full bg-[var(--mp-accent)] px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-[var(--mp-accent)]/30 transition hover:brightness-105"
            >
              Explore the flow
            </a>
            <a
              href="#profiles"
              className="inline-flex items-center justify-center rounded-full border border-[var(--mp-border)] bg-[var(--mp-surface)] px-6 py-3 text-sm font-semibold text-[var(--mp-ink)] shadow-sm transition hover:bg-[var(--mp-card)]"
            >
              Multiple profiles
            </a>
          </div>
          <dl className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { k: "Slots", v: "Coffee 9:00 · Lunch 1–3 (flex)" },
              { k: "Groceries", v: "Daily staples + voice add-ons" },
              { k: "Team", v: "ETA matched to meetings" },
            ].map((row) => (
              <div
                key={row.k}
                className="rounded-2xl border border-[var(--mp-border)] bg-[var(--mp-surface)]/70 p-5 shadow-[var(--mp-shadow)] backdrop-blur"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mp-muted)]">
                  {row.k}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-[var(--mp-ink)]">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="flow"
        className="border-y border-[var(--mp-border)] bg-[var(--mp-surface)] py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Your rhythm, not a rigid alarm.
            </h2>
            <p className="mt-4 text-[var(--mp-muted)]">
              Some people want coffee every morning at 9:00. Lunch stays between
              1:00 and 3:00—unless the calendar says otherwise. We find the
              first honest gap and suggest an order time.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[var(--mp-border)] bg-[var(--mp-card)] p-8 shadow-[var(--mp-shadow)] backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--mp-muted)]">
                Daily anchors
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-lg">
                    ☕
                  </span>
                  <div>
                    <p className="font-medium">Coffee · ~9:00 AM</p>
                    <p className="mt-1 text-sm text-[var(--mp-muted)]">
                      Fires after your first light meeting block when you’re
                      marked “at desk.”
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--mp-accent)]/15 text-lg">
                    🍽️
                  </span>
                  <div>
                    <p className="font-medium">Lunch · {lunchAdjustment.window}</p>
                    <p className="mt-1 text-sm text-[var(--mp-muted)]">
                      Shifts earlier if {lunchAdjustment.conflict} appears in
                      the sync’d calendar.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-[var(--mp-accent)]/40 bg-gradient-to-br from-[var(--mp-accent)]/10 to-transparent p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--mp-muted)]">
                Smart adjustment
              </h3>
              <p className="mt-4 font-display text-2xl leading-snug text-[var(--mp-ink)]">
                {lunchAdjustment.suggestion}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full bg-[var(--mp-surface)] px-3 py-1 ring-1 ring-[var(--mp-border)]">
                  Conflict {lunchAdjustment.conflict}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-800 ring-1 ring-emerald-500/25 dark:text-emerald-200">
                  Slot preserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calendar" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Calendar-aware ordering
            </h2>
            <p className="mt-4 text-[var(--mp-muted)]">
              Meetings sync through Firebase (Firestore as your calendar
              source). When items move, suggested order times update—before you
              tap checkout.
            </p>
          </div>
          <div className="mt-10">
            <LiveMeetings />
          </div>
        </div>
      </section>

      <section
        id="basket"
        className="border-y border-[var(--mp-border)] bg-[var(--mp-surface)] py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Tomorrow&apos;s Instamart basket
              </h2>
              <p className="mt-4 text-[var(--mp-muted)]">
                Standing orders for milk and basics roll forward. Say “add paneer
                for tomorrow” and it merges into the same delivery—no duplicate
                carts.
              </p>
              <ul className="mt-8 space-y-3">
                {tomorrowBasket.map((row) => (
                  <li
                    key={row.item}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--mp-border)] bg-[var(--mp-card)] px-4 py-3"
                  >
                    <span className="font-medium">{row.item}</span>
                    <span className="text-sm text-[var(--mp-muted)]">{row.qty}</span>
                    <span className="max-w-[40%] text-right text-xs text-[var(--mp-muted)]">
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[var(--mp-border)] bg-[var(--background)] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--mp-muted)]">
                When something&apos;s out of stock
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--mp-muted)]">
                The agent checks availability on your usual SKU. If it&apos;s
                gone, it proposes the closest alternative with the same use case
                (e.g. brown eggs → white, same pack size) and holds it for your
                OK—or auto-applies if you trust the profile.
              </p>
              <div className="mt-6 rounded-2xl bg-amber-500/10 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-500/25 dark:text-amber-50">
                <strong className="font-semibold">Demo:</strong> Brown eggs
                unavailable → suggested white eggs (6 pack) · saved ₹12 vs
                last order.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="profiles" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Profiles & automations
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--mp-muted)]">
            One household, several routines. Toggle automations per profile—home,
            partner, or a whole team pod—with separate payment methods when you
            wire production.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {profiles.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-3xl border border-[var(--mp-border)] bg-[var(--mp-surface)] p-6 shadow-[var(--mp-shadow)] transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="text-3xl" aria-hidden>
                  {p.emoji}
                </span>
                <h3 className="mt-4 font-display text-xl">{p.name}</h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-[var(--mp-muted)]">
                  {p.automations.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--mp-accent)]"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full border border-[var(--mp-border)] py-2.5 text-sm font-medium text-[var(--mp-ink)] opacity-60"
                  disabled
                >
                  Configure (soon)
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team"
        className="bg-zinc-950 py-20 text-zinc-50 [color-scheme:dark]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl tracking-tight text-zinc-50 sm:text-4xl">
                Team lunch, one arrival window
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                Pick restaurants that can hit the group&apos;s ETA. We compare
                promised delivery times with the latest meeting end on the shared
                calendar so food doesn&apos;t sit cooling through a stand-up.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-zinc-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Group order preview
                  </p>
                  <p className="font-display mt-2 text-2xl text-zinc-50">
                    {teamOrderPreview.restaurant}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/25 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-emerald-400/40">
                  {teamOrderPreview.match}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-zinc-400">People</dt>
                  <dd className="mt-1 font-medium text-zinc-50">
                    {teamOrderPreview.people}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-400">Target arrival</dt>
                  <dd className="mt-1 font-medium text-zinc-50">
                    {teamOrderPreview.target}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-zinc-400">Restaurant ETA</dt>
                  <dd className="mt-1 font-mono text-lg text-amber-200/95">
                    {teamOrderPreview.eta}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--mp-border)] py-12 text-center">
        <p className="font-display text-lg text-[var(--mp-ink)]">Meal Pilot</p>
        <p className="mt-2 text-sm text-[var(--mp-muted)]">
          Prototype UI · Firebase meetings · dummy commerce data
        </p>
      </footer>
    </div>
  );
}
