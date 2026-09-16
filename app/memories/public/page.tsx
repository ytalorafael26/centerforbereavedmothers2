"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Memorial = {
  id: string;
  child_name: string;
  birth_date: string | null;
  remembrance_date: string | null;
  story: string | null;
  image_url: string | null;
  created_at: string;
};

export default function PublicMemories() {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPublicMemories();
  }, []);

  async function loadPublicMemories() {
    if (!supabase) {
      setMessage("The memories service is not configured yet.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("memorials")
      .select(
        "id, child_name, birth_date, remembrance_date, story, image_url, created_at"
      )
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setMemorials(data ?? []);
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
          Garden of Memories
        </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
  A place to remember, honor, and love.
</h1>

        <p className="mt-4 text-lg text-slate-600">
  A collection of memories shared by mothers who wish to honor
  their children and keep their stories alive.
</p>
</div>

<div className="mx-auto mt-8 max-w-xl text-center">
  <div className="mx-auto h-px w-16 bg-slate-200" />
  <p className="mt-4 text-sm italic text-slate-500">
    Every memory is a story of love that deserves to be remembered.
  </p>
</div>

      {loading ? (
        <p className="mt-12 text-center text-slate-600">
          Loading memories...
        </p>
      ) : message ? (
        <p className="mx-auto mt-12 max-w-xl rounded-2xl bg-slate-100 p-5 text-center text-slate-700">
          {message}
        </p>
      ) : memorials.length === 0 ? (
        <div className="mx-auto mt-12 max-w-xl rounded-4xl border border-slate-200 bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold">
            The garden is waiting for its first shared memory.
          </h2>

          <p className="mt-3 text-slate-600">
            When a mother chooses to share a memory publicly, it will appear
            here.
          </p>
        </div>
      ) : (
        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memorials.map((memorial) => (
            <article
              key={memorial.id}
              className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-soft"
            >
              {memorial.image_url && (
                <img
                  src={memorial.image_url}
                  alt={`Memory of ${memorial.child_name}`}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-7">
                <h2 className="text-2xl font-semibold">
                  {memorial.child_name}
                </h2>

                {(memorial.birth_date || memorial.remembrance_date) && (
                  <p className="mt-2 text-sm text-slate-500">
                    {memorial.birth_date || ""}
                    {memorial.birth_date && memorial.remembrance_date
                      ? " — "
                      : ""}
                    {memorial.remembrance_date || ""}
                  </p>
                )}

                {memorial.story && (
                  <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-700">
                    {memorial.story}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
