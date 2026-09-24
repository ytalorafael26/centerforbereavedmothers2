"use client";

import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
  if (!supabase) return;

  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
  async function handleLogout() {
  if (!supabase) return;

  await supabase.auth.signOut();
  setUser(null);
  window.location.href = "/";
}

  return (
    <header className="glass sticky top-0 z-50 border-b border-slate-200/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-2xl"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lavender/30">
            <Heart className="h-5 w-5 text-slate-700" />
          </span>
          <span className="font-semibold tracking-tight">
            Center for Bereaved Mothers
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link className="focus-ring rounded-lg" href="/about">
            About
            
          </Link>
          <Link className="focus-ring rounded-lg" href="/memories/public">
  Garden of Memories
</Link>
          <Link className="focus-ring rounded-lg" href="/support">
            Find Support
          </Link>
          <Link className="focus-ring rounded-lg" href="/resources">
  Grief Support Resources
</Link>
          <Link className="focus-ring rounded-lg" href="/events">
            Events
          </Link>
       {user ? (
  <>
    <Link className="focus-ring rounded-lg" href="/dashboard">
      My Space
    </Link>

    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full bg-slate-900 px-5 py-2.5 text-white transition hover:-translate-y-0.5"
    >
      Sign out
    </button>
  </>
) : (
  <>
    <Link className="focus-ring rounded-lg" href="/login">
      Sign in
    </Link>

    <Link
      className="rounded-full bg-slate-900 px-5 py-2.5 text-white transition hover:-translate-y-0.5"
      href="/signup"
    >
      Become a Member
    </Link>
  </>
)}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="focus-ring rounded-xl p-2 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200/70 bg-white px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              className="rounded-xl px-4 py-3 hover:bg-slate-100"
              href="/about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <Link
              className="rounded-xl px-4 py-3 hover:bg-slate-100"
              href="/support"
              onClick={() => setOpen(false)}
            >
              Find Support
            </Link>

            <Link
  className="rounded-xl px-4 py-3 hover:bg-slate-100"
  href="/resources"
  onClick={() => setOpen(false)}
>
  Grief Support Resources
</Link>

            <Link
              className="rounded-xl px-4 py-3 hover:bg-slate-100"
              href="/events"
              onClick={() => setOpen(false)}
            >
              Events
            </Link>

            {user ? (
  <>
    <Link
      className="rounded-xl px-4 py-3 hover:bg-slate-100"
      href="/dashboard"
      onClick={() => setOpen(false)}
    >
      My Space
    </Link>

    <button
      type="button"
      onClick={() => {
        setOpen(false);
        handleLogout();
      }}
      className="mt-2 rounded-full bg-slate-900 px-5 py-3 text-center text-white"
    >
      Sign out
    </button>
  </>
) : (
  <>
    <Link
      className="rounded-xl px-4 py-3 hover:bg-slate-100"
      href="/login"
      onClick={() => setOpen(false)}
    >
      Sign in
    </Link>

    <Link
      className="mt-2 rounded-full bg-slate-900 px-5 py-3 text-center text-white"
      href="/signup"
      onClick={() => setOpen(false)}
    >
      Become a Member
    </Link>
  </>
)}
          </div>
        </nav>
      )}
    </header>
  );
}
