import Link from "next/link";
import { ArrowRight, BookOpen, Heart, HeartHandshake, ShieldCheck, Users } from "lucide-react";

const cards = [
  { icon: HeartHandshake, title: "Find support", text: "Discover groups, professionals, events and resources that fit your needs.", href: "/support" },
  { icon: BookOpen, title: "Learn at your pace", text: "Explore compassionate education about grief, family, self-care and healing.", href: "/resources" },
  { icon: Users, title: "Connect with community", text: "Build meaningful connections in carefully moderated spaces.", href: "/signup" },
];

export default function Home() {
  return (
    <div>
      <section className="gradient overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:py-32">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700">
              A safe digital home for grieving mothers
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-.04em] text-slate-900 sm:text-6xl lg:text-7xl">
              You don&apos;t have to walk through grief alone.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Supporting mothers through grief with compassion, dignity, hope and community.
              Find understanding, connection, education and gentle support—at your own pace.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-full bg-slate-900 px-6 py-3.5 font-medium text-white shadow-soft transition hover:-translate-y-0.5">
                Become a Member
              </Link>
              <Link href="/support" className="rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 font-medium text-slate-800 transition hover:bg-white">
                Find Support
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-lavender/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-white/80 bg-white/65 p-8 shadow-soft">
              <div className="rounded-[2rem] bg-gradient-to-br from-lavender/40 via-white to-sky/50 p-8">
                <div className="mx-auto flex aspect-square max-w-sm items-center justify-center rounded-full border border-white/80 bg-white/55 shadow-inner">
                  <div className="text-center">
                    <Heart className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                    <p className="text-xl font-medium text-slate-800">There is space for your story.</p>
                    <p className="mt-2 text-sm text-slate-600">Come as you are.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">How we help</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Gentle support, practical resources, real connection.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, ...card }) => (
            <Link key={card.title} href={card.href} className="focus-ring rounded-4xl border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-beige"><Icon /></div>
              <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Explore <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">A place to remember</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Garden of Memories</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              A peaceful, private space to preserve memories and honor a child&apos;s life.
              Privacy is controlled by each mother, with public sharing only by explicit consent.
            </p>
            <Link href="/signup" className="mt-7 inline-flex rounded-full bg-lavender px-6 py-3 font-medium text-slate-900">Create your private space</Link>
          </div>
          <div className="rounded-4xl border border-white bg-white p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Private by default", "Your memories, your control", "Family sharing by permission", "Peaceful and hopeful"].map((x) => (
                <div key={x} className="flex gap-3 rounded-2xl bg-beige/70 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-4xl bg-slate-900 p-8 text-white shadow-soft sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[.18em] text-slate-300">You set the pace</p>
              <h2 className="mt-3 text-3xl font-semibold">Support is here when you are ready.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                This platform complements—never replaces—qualified medical or mental health care.
              </p>
            </div>
            <Link href="/support" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900">
              Find support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

