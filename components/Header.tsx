import Link from "next/link";
import { Heart, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-slate-200/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lavender/30">
            <Heart className="h-5 w-5 text-slate-700" />
          </span>
          <span className="font-semibold tracking-tight">Center for Bereaved Mothers</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link className="focus-ring rounded-lg" href="/about">About</Link>
          <Link className="focus-ring rounded-lg" href="/support">Find Support</Link>
          <Link className="focus-ring rounded-lg" href="/resources">Resources</Link>
          <Link className="focus-ring rounded-lg" href="/events">Events</Link>
          <Link className="focus-ring rounded-lg" href="/login">Sign in</Link>
          <Link className="rounded-full bg-slate-900 px-5 py-2.5 text-white transition hover:-translate-y-0.5" href="/signup">Become a Member</Link>
        </nav>
        <button aria-label="Open menu" className="focus-ring rounded-xl p-2 md:hidden">
          <Menu />
        </button>
      </div>
    </header>
  );
}
