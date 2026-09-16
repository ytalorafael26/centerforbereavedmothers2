"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Memorial = {
  id: string;
  title: string;
  story: string;
  created_at: string;
};

export default function Memories() {
  const router = useRouter();

  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMemorials();
  }, []);

  async function loadMemorials() {
    if (!supabase) {
      setMessage("The memories service is not configured yet.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("memorials")
      .select("id, title, story, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setMemorials(data ?? []);
    }

    setLoading(false);
  }

  async function saveMemorial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) return;

    if (!title.trim() || !story.trim()) {
      setMessage("Please add a title and a memory before saving.");
      return;
    }

    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("memorials").insert({
      user_id: user.id,
      title: title.trim(),
      story: story.trim(),
    });

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle("");
    setStory("");
    setMessage("Your memory has been saved.");
    loadMemorials();
  }

  async function deleteMemorial(id: string) {
    if (!supabase) return;

    const { error } = await supabase
      .from("memorials")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMemorials((current) =>
      current.filter((memorial) => memorial.id !== id)
    );

    setMessage("Memory deleted.");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
        Garden of Memories
      </p>

      <h1 className="mt-3 text-4xl font-semibold">
        A place to honor a beautiful memory.
      </h1>

      <p className="mt-3 max-w-2xl text-slate-600">
        Preserve a story, a moment, or something you never want to forget.
      </p>

      <form
        onSubmit={saveMemorial}
        className="mt-10 rounded-4xl border border-slate-200 bg-white p-7 shadow-soft"
      >
        <input
          type="text"
          placeholder="Memory title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />

        <textarea
          required
          placeholder="Write about this memory..."
          value={story}
          onChange={(event) => setStory(event.target.value)}
          rows={8}
          className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save memory"}
        </button>

        {message && (
          <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {message}
          </p>
        )}
      </form>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Your memories</h2>

        {loading ? (
          <p className="mt-4 text-slate-600">Loading your memories...</p>
        ) : memorials.length === 0 ? (
          <p className="mt-4 text-slate-600">
            You have not created your first memory yet.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {memorials.map((memorial) => (
              <article
                key={memorial.id}
                className="rounded-4xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {memorial.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(memorial.created_at).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteMemorial(memorial.id)}
                    className="text-sm text-slate-500 underline"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-slate-700">
                  {memorial.story}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="mt-8 text-sm font-medium text-slate-600 underline"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
