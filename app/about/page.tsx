export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">About us</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight">Compassion without judgment.</h1>
      <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
        The Center for Bereaved Mothers exists to provide emotional support, education,
        connection, resources, advocacy and community for mothers grieving the loss of a child.
      </p>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          ["Safety", "A calm, respectful experience for people who may arrive feeling vulnerable."],
          ["Inclusion", "Every mother is welcome regardless of culture, faith, age, identity, disability or circumstance."],
          ["Human connection", "Technology should make compassionate connection easier—not replace it."]
        ].map(([title,text]) => (
          <div key={title} className="rounded-4xl border border-slate-200 p-7 shadow-soft">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
            <section className="mt-24 border-t border-slate-200 pt-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <img
              src="/IMG_3990.jpg"
              alt="Ana Paula Fernandes de Medeiros Oliveira, founder of the Center for Bereaved Mothers"
              className="h-[520px] w-full rounded-4xl object-cover shadow-soft"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
              Meet the Founder
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Ana Paula Fernandes de Medeiros Oliveira
            </h2>

            <p className="mt-3 text-lg font-medium text-slate-500">
              Founder · Author · Bereaved Mother
            </p>

            <p className="mt-7 leading-8 text-slate-600">
              Ana Paula is a Brazilian author, speaker and bereaved mother whose
              personal experience with child loss became the foundation for a
              mission of compassion, support and connection.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              After walking alongside her son Benício through a complex medical
              journey and experiencing his loss, Ana transformed part of her own
              grief into a commitment to help other mothers feel seen, supported
              and less alone.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              The Center for Bereaved Mothers was born from that vision: to
              create a safe and compassionate place where mothers can find
              resources, community, remembrance and support while navigating
              life after the loss of a child.
            </p>
          </div>
        </div>
      </section>
                 <section className="mt-16">
        <div className="overflow-hidden rounded-4xl bg-slate-50">
          <div className="grid items-center md:grid-cols-[1.25fr_.75fr]">
            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">
                Background & Advocacy
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                A personal story transformed into purpose.
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Ana Paula holds a degree in Architecture and a postgraduate
                specialization in Lighting Design. Alongside her professional
                background, she has years of experience serving and leading women
                and young people in Christian communities in Brazil and the United
                States.
              </p>

              <p className="mt-5 leading-8 text-slate-600">
                She is the author of books created from her experience with grief,
                motherhood and hope, and has developed initiatives focused on
                supporting bereaved mothers through writing, conversations,
                community and compassionate resources.
              </p>
            </div>

            <div className="h-full min-h-[420px]">
              <img
                src="/IMG_3989.jpg"
                alt="Ana Paula Fernandes"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
