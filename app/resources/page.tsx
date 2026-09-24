"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
const categories = ["Books","Videos","Meditation","Music","Podcasts","Research","Articles","Worksheets","PDF Guides","Children","Marriage","Family","Self Care","Hope","Healing"];

export default function Resources() {
    const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setResources(data ?? []);
    }

    setLoading(false);
  }
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Grief Support Resources</p>
     <h1 className="mt-3 text-5xl font-semibold tracking-tight">Support for every step of your journey.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A collection of e-books, guides and supportive materials created to walk alongside bereaved mothers throughout their journey.</p>
      <div className="mt-10 flex flex-wrap gap-3">{categories.map(c => <button key={c} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-beige">{c}</button>)}</div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
       {loading ? (
  <p className="text-slate-600">Loading resources...</p>
) : resources.length === 0 ? (
  <p className="text-slate-600">No resources are available yet.</p>
) : (
  resources.map((resource) => (
    <article
      key={resource.id}
      className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {resource.category}
      </span>

      <h2 className="mt-4 text-xl font-semibold">
        {resource.title}
      </h2>

      <p className="mt-3 leading-7 text-slate-600">
        {resource.description}
      </p>
    </article>
  ))
)}
      </div>
    </div>
  );
}
