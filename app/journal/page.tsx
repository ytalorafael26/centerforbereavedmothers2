"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type JournalEntry = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
};

export default function Journal() {
  const router = useRouter();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    if (!supabase) {
      setMessage("The journal service is not configured yet.");
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
      .from("journal_entries")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setEntries(data ?? []);
    }

    setLoading(false);
  }

  async function saveEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) return;

    if (!content.trim()) {
      setMessage("Please write something before saving.");
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

    const { error } = await supabase.from("journal_entries").insert({
      user_id: user.id,
      title: title.trim() || null,
      content: content.trim(),
    });

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle("");
    setContent("");
    setMessage("Your journal entry has been saved.");
    loadEntries();
  }

  async function deleteEntry(id: string) {
    if (!supabase) return;

    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setEntries((current) => current.filter((entry) => entry.id !== id));
    setMessage("Journal entry deleted.");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
        Private journal
      </p>

      <h1 className="mt-3 text-4xl font-semibold">
        A quiet place for your thoughts.
      </h1>

      <p className="mt-3 max-w-2xl text-slate-600">
        Write freely. Your journal entries are private to your account.
      </p>

      <form
        onSubmit={saveEntry}
        className="mt-10 rounded-4xl border border-slate-200 bg-white p-7 shadow-soft"
      >
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />

        <textarea
          required
          placeholder="Write whatever is on your heart..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={8}
          className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save entry"}
        </button>

        {message && (
          <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {message}
          </p>
        )}
      </form>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Your entries</h2>

        {loading ? (
          <p className="mt-4 text-slate-600">Loading your journal...</p>
        ) : entries.length === 0 ? (
          <p className="mt-4 text-slate-600">
            You have not written your first entry yet.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-4xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {entry.title || "Untitled entry"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(entry.created_at).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteEntry(entry.id)}
                    className="text-sm text-slate-500 underline"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-slate-700">
                  {entry.content}
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
