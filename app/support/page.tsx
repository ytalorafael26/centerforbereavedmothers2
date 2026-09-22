"use client";

import { useEffect, useState } from "react";
import { MapPin, Search, Users, Video } from "lucide-react";
import { supabase } from "@/lib/supabase";

type SupportGroup = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  language: string | null;
};

export default function Support() {
  const [groups, setGroups] = useState<SupportGroup[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Any location");
  const [language, setLanguage] = useState("Any language");

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("support_groups")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setGroups(data ?? []);
    }
  }

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      !search.trim() ||
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      (group.description ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation =
      location === "Any location" || group.location === location;

    const matchesLanguage =
      language === "Any language" || group.language === language;

    return matchesSearch && matchesLocation && matchesLanguage;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
        Find Support
      </p>

      <h1 className="mt-3 text-5xl font-semibold tracking-tight">
        Support that meets you where you are.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Search groups, professionals, events and partner organizations.
        Find support that fits your needs, language and location.
      </p>

      <div className="mt-10 rounded-4xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
          <label className="sr-only" htmlFor="support-search">
            Search
          </label>

          <input
            id="support-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-lavender"
            placeholder="Search support, groups, professionals..."
          />

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option>Any location</option>
            <option>Online</option>
          </select>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3"
          >
            <option>Any language</option>
            <option>English</option>
            <option>Português</option>
            <option>Español</option>
          </select>

          <button
  type="button"
  onClick={() => setSearch(search.trim())}
  className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white"
>
  <Search className="h-4 w-4" />
  Search
</button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft">
          <Users className="h-6 w-6" />
          <h2 className="mt-5 text-xl font-semibold">Support Groups</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Online and in-person communities with moderator approval.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft">
          <Video className="h-6 w-6" />
          <h2 className="mt-5 text-xl font-semibold">Professionals</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Verified professionals and educational specialists.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft">
          <MapPin className="h-6 w-6" />
          <h2 className="mt-5 text-xl font-semibold">Local Resources</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Regional chapters, events and partner organizations.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Available support groups</h2>

        {filteredGroups.length === 0 ? (
          <div className="mt-5 rounded-4xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-slate-600">
              No support groups are available yet.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <article
                key={group.id}
                className="rounded-4xl border border-slate-200 bg-white p-7 shadow-soft"
              >
                <h3 className="text-xl font-semibold">{group.name}</h3>

                {group.description && (
                  <p className="mt-3 leading-7 text-slate-600">
                    {group.description}
                  </p>
                )}

                {group.location && (
                  <p className="mt-4 text-sm text-slate-500">
                    Location: {group.location}
                  </p>
                )}

                {group.language && (
                  <p className="mt-1 text-sm text-slate-500">
                    Language: {group.language}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
