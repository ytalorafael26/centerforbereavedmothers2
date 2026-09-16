import Link from "next/link";

export default function Dashboard() {
  const items = [
    ["Journal", "Private writing space", "/journal"],
    ["Garden of Memories", "Honor and preserve memories", "#"],
    ["Find Support", "Groups and professionals", "#"],
    ["Resources", "Saved and recommended", "#"],
    ["Events", "Upcoming gatherings", "#"],
    ["Settings", "Privacy and preferences", "/settings"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
        Member space
      </p>

      <h1 className="mt-3 text-4xl font-semibold">
        Welcome. Take this at your own pace.
      </h1>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([title, text, href]) => (
          <Link
            key={title}
            href={href}
            className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-slate-600">{text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
