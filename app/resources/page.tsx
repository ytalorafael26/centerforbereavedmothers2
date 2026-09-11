const categories = ["Books","Videos","Meditation","Music","Podcasts","Research","Articles","Worksheets","PDF Guides","Children","Marriage","Family","Self Care","Hope","Healing"];

export default function Resources() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Resource Library</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Explore resources at your own pace.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A searchable home for educational materials, guided practices, articles, research and practical worksheets.</p>
      <div className="mt-10 flex flex-wrap gap-3">{categories.map(c => <button key={c} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-beige">{c}</button>)}</div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {["Understanding grief","Gentle self-care","Supporting the family","When to seek professional support","Grief and relationships","Hope after loss"].map((title,i) => (
          <article key={title} className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Featured resource</span>
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">Content placeholder ready to be connected to the resource database and CMS.</p>
            <span className="mt-5 inline-block text-sm font-medium">Read resource →</span>
          </article>
        ))}
      </div>
    </div>
  );
}
