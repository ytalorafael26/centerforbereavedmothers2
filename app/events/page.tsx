"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Events() {
    const [events, setEvents] = useState<any[]>([]);
    useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (!error) {
      setEvents(data ?? []);
    }
  }
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Events</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Gatherings for connection and learning.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
       {events.map((event) => (
          <article key={event.id} className="rounded-4xl border border-slate-200 p-7 shadow-soft">
           <p className="text-sm text-slate-500">
  {new Date(event.event_date).toLocaleString()}
</p>
            <h2 className="mt-3 text-xl font-semibold">{event.title}</h2>
         <p className="mt-3 text-slate-600">
  {event.description}
</p>
           <a
  href={event.registration_url || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm text-white"
>
  View event
</a>
          </article>
        ))}
      </div>
    </div>
  );
}
