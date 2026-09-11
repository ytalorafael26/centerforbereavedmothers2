import { MapPin, Search, Users, Video } from "lucide-react";

export default function Support() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Find Support</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Support that meets you where you are.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Search groups, professionals, events and partner organizations. This first release provides the discovery interface; live listings will connect to Supabase.</p>
      <div className="mt-10 rounded-4xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
          <label className="sr-only" htmlFor="support-search">Search</label>
          <input id="support-search" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-lavender" placeholder="Search support, groups, professionals..." />
          <select className="rounded-2xl border border-slate-200 px-4 py-3"><option>Any location</option><option>Online</option></select>
          <select className="rounded-2xl border border-slate-200 px-4 py-3"><option>Any language</option><option>English</option><option>Português</option><option>Español</option></select>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white"><Search className="h-4 w-4" /> Search</button>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          [Users,"Support Groups","Online and in-person communities, with moderator approval."],
          [Video,"Professionals","Verified professionals and educational specialists."],
          [MapPin,"Local Resources","Regional chapters, events and partner organizations."]
        ].map(([Icon,title,text]) => {
          const I = Icon as typeof Users;
          return <div key={title as string} className="rounded-4xl border border-slate-200 p-7 shadow-soft"><I /><h2 className="mt-5 text-xl font-semibold">{title as string}</h2><p className="mt-3 leading-7 text-slate-600">{text as string}</p></div>
        })}
      </div>
    </div>
  );
}
