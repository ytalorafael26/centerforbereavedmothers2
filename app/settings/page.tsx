"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Settings() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!supabase) {
        setMessage("The profile service is not configured yet.");
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

      setEmail(user.email ?? "");
      setName(user.user_metadata?.full_name ?? "");
      setLanguage(user.user_metadata?.language ?? "English");
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function saveProfile() {
    if (!supabase) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        language,
      },
    });

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Your profile has been saved.");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-slate-600">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
        Settings
      </p>

      <h1 className="mt-3 text-4xl font-semibold">Your profile</h1>

      <p className="mt-3 text-slate-600">
        Manage your personal information and language preference.
      </p>

      <div className="mt-10 rounded-4xl border border-slate-200 bg-white p-7 shadow-soft">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Language
            </label>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            >
              <option>English</option>
              <option>Português (Brasil)</option>
              <option>Español</option>
            </select>
          </div>

          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message && (
            <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              {message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-sm font-medium text-slate-600 underline"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
