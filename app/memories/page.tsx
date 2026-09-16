"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Memorial = {
  id: string;
  child_name: string;
  birth_date: string | null;
  remembrance_date: string | null;
  story: string | null;
  image_url: string | null;
  is_public: boolean;
  created_at: string;
};

export default function Memories() {
  const router = useRouter();

  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [childName, setChildName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [remembranceDate, setRemembranceDate] = useState("");
  const [story, setStory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
      .select(
        "id, child_name, birth_date, remembrance_date, story, image_url, is_public, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setMemorials(data ?? []);
    }

    setLoading(false);
  }

  function startEditing(memorial: Memorial) {
    setEditingId(memorial.id);
    setChildName(memorial.child_name);
    setBirthDate(memorial.birth_date || "");
    setRemembranceDate(memorial.remembrance_date || "");
    setStory(memorial.story || "");
    setIsPublic(memorial.is_public);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditing() {
    setEditingId(null);
    setChildName("");
    setBirthDate("");
    setRemembranceDate("");
    setStory("");
    setIsPublic(false);
    setMessage("");
  }

  async function saveMemorial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) return;

    if (!childName.trim() || !story.trim()) {
      setMessage("Please add a name and a memory before saving.");
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

    const memorialData = {
      child_name: childName.trim(),
      birth_date: birthDate || null,
      remembrance_date: remembranceDate || null,
      story: story.trim(),
      is_public: isPublic,
    };

    const result = editingId
      ? await supabase
          .from("memorials")
          .update(memorialData)
          .eq("id", editingId)
          .eq("user_id", user.id)
      : await supabase.from("memorials").insert({
          user_id: user.id,
          ...memorialData,
        });

    setSaving(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(
      editingId
        ? "Your memory has been updated."
        : "Your memory has been saved."
    );

    setEditingId(null);
    setChildName("");
    setBirthDate("");
    setRemembranceDate("");
    setStory("");
    setIsPublic(false);

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
          placeholder="Child's name"
          value={childName}
          onChange={(event) => setChildName(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-600">
              Birth date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-600">
              Remembrance date
            </label>
            <input
              type="date"
              value={remembranceDate}
              onChange={(event) => setRemembranceDate(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>
        </div>

        <textarea
          required
          placeholder="Write about this memory..."
          value={story}
          onChange={(event) => setStory(event.target.value)}
          rows={8}
          className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3"
        />

        <label className="mt-4 flex items-center gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(event) => setIsPublic(event.target.checked)}
          />
          Share this memory publicly in the Garden of Memories
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update memory"
                : "Save memory"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-full border border-slate-300 px-6 py-3 text-slate-700"
            >
              Cancel
            </button>
          )}
        </div>

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
                      {memorial.child_name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(memorial.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => startEditing(memorial)}
                      className="text-sm text-slate-600 underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMemorial(memorial.id)}
                      className="text-sm text-slate-500 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {memorial.birth_date && (
                  <p className="mt-3 text-sm text-slate-500">
                    Born: {memorial.birth_date}
                  </p>
                )}

                {memorial.remembrance_date && (
                  <p className="mt-1 text-sm text-slate-500">
                    In remembrance: {memorial.remembrance_date}
                  </p>
                )}

                {memorial.story && (
                  <p className="mt-4 whitespace-pre-wrap text-slate-700">
                    {memorial.story}
                  </p>
                )}

                <p className="mt-4 text-xs font-medium text-slate-500">
                  {memorial.is_public
                    ? "Shared publicly"
                    : "Private memory"}
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
