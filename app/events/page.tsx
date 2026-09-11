export default function Events() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Events</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Gatherings for connection and learning.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {["Online Support Circle","Grief Education Webinar","Community Gathering"].map((x,i) => (
          <article key={x} className="rounded-4xl border border-slate-200 p-7 shadow-soft">
            <p className="text-sm text-slate-500">Upcoming event</p>
            <h2 className="mt-3 text-xl font-semibold">{x}</h2>
            <p className="mt-3 text-slate-600">Registration, certificates and QR check-in will connect to the events module.</p>
            <button className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm text-white">View event</button>
          </article>
        ))}
      </div>
    </div>
  );
}
