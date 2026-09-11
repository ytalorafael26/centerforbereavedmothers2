export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">About us</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Compassion without judgment.</h1>
      <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
        The Center for Bereaved Mothers exists to provide emotional support, education,
        connection, resources, advocacy and community for mothers grieving the loss of a child.
      </p>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          ["Safety", "A calm, respectful experience for people who may arrive feeling vulnerable."],
          ["Inclusion", "Every mother is welcome regardless of culture, faith, age, identity, disability or circumstance."],
          ["Human connection", "Technology should make compassionate connection easier—not replace it."]
        ].map(([title,text]) => (
          <div key={title} className="rounded-4xl border border-slate-200 p-7 shadow-soft">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
