import Image from "next/image";
import Link from "next/link";

const base = "/projects/venice-carnival";

const meta = [
  ["Project", "Venice Carnival"],
  ["Type", "Personal Project"],
  ["Services", "Art Direction · Graphic Design · Illustration"],
  ["Focus", "Cultural identity · Poster design · Event applications"],
];

const posterSeries = [
  {
    src: `${base}/official-poster.png`,
    title: "Official Venice Carnival poster",
    body: "Primary campaign artwork built around the illustrated mask and a warm theatrical field.",
    ratio: "1920/2675",
  },
  {
    src: `${base}/poster-variation-blue.png`,
    title: "Blue stage variation",
    body: "An alternative poster direction using festival lights and a colder event atmosphere.",
    ratio: "2/3",
  },
  {
    src: `${base}/poster-variation-warm.png`,
    title: "Warm color exploration",
    body: "A tighter composition focused on orange, purple and deep navy contrast.",
    ratio: "2/3",
  },
  {
    src: `${base}/poster-variation-lights.png`,
    title: "Festival lights version",
    body: "A graphic adaptation inspired by carnival stages, night events and dense architectural color.",
    ratio: "2/3",
  },
];

const applications = [
  {
    src: `${base}/ticket-design.png`,
    title: "Ticket design",
    body: "The identity applied to an event experience format, preserving the same mask and chromatic language.",
    ratio: "1400/478",
  },
  {
    src: `${base}/large-scale-mural.png`,
    title: "Large-scale mural",
    body: "The hero artwork extended as environmental branding, using the mask as an architectural presence.",
    ratio: "3/2",
  },
  {
    src: `${base}/official-poster.png`,
    title: "Street advertising",
    body: "The poster system translated to public display while keeping high contrast and immediate recognition.",
    ratio: "1920/2675",
  },
];

const system = [
  {
    src: `${base}/graphic-pattern.png`,
    title: "Graphic pattern exploration",
    body: "The visual language extends through modular circles, color blocks and repeated mask fragments.",
    ratio: "1400/459",
  },
  {
    src: `${base}/poster-collection.png`,
    title: "Poster collection",
    body: "Multiple campaign variations presented as one flexible identity family.",
    ratio: "16/9",
  },
];

export default function VeniceCarnivalCaseStudy() {
  return (
    <article className="bg-[#120d19] text-bone">
      <Hero />
      <Overview />
      <Challenge />
      <CreativeDirection />
      <HeroArtwork />
      <PosterSeries />
      <BrandApplications />
      <VisualSystem />
      <HistoricalContext />
      <Results />
    </article>
  );
}

function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-[#f26a22]">
      <div className="absolute inset-0">
        <Image
          src={`${base}/hero-header.png`}
          alt="Venice Carnival main key visual"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,13,25,0.2), transparent 42%, rgba(18,13,25,0.86))",
        }}
      />

      <div className="relative z-10 page-x min-h-screen flex flex-col justify-between pt-[calc(var(--nav-h)+36px)] pb-10">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/work"
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors"
          >
            Back to work
          </Link>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/70">
            Personal Project
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-white/78">
              Art Direction · Graphic Design · Illustration
            </p>
            <h1 className="mt-5 h-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.9] tracking-normal">
              Venice
              <br />
              Carnival
            </h1>
          </div>
          <p className="col-span-12 lg:col-span-4 max-w-md text-[15px] leading-relaxed text-white/82">
            A fictional identity project reinterpreting the elegance, mystery
            and theatrical atmosphere of the Venice Carnival through a custom
            illustrated mask.
          </p>
        </div>
      </div>
    </header>
  );
}

function Overview() {
  return (
    <section className="page-x py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8 border-t border-white/15 pt-10">
        <div className="col-span-12 lg:col-span-7">
          <Kicker>Overview</Kicker>
          <h2 className="mt-6 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
            A contemporary identity for a historic celebration.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <p className="body-lead leading-[1.75]">
            Venice Carnival is a fictional visual identity created around one
            of Italy's most iconic cultural celebrations. The project explores
            illustration, poster design, event branding and environmental
            applications through one central artwork: a custom Venetian mask.
          </p>
          <p className="mt-6 body-lead leading-[1.75]">
            The goal was to preserve the theatrical character of the festival
            while building a more contemporary graphic language.
          </p>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/15 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
        {meta.map(([label, value]) => (
          <div key={label} className="p-5 lg:p-6">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#ff9d2f]">
              {label}
            </dt>
            <dd className="mt-3 text-[13px] leading-snug text-white/82">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Challenge() {
  return (
    <TextSection
      kicker="Challenge"
      title="Respect the heritage without reproducing the past."
      body={[
        "The Venice Carnival carries a strong visual history: masks, costumes, ornament, mystery and ceremony. The challenge was to reinterpret that heritage without turning the project into a nostalgic reproduction.",
        "The identity needed to feel elegant and theatrical, but also graphic enough to live across posters, tickets, murals and modular campaign compositions.",
      ]}
    />
  );
}

function CreativeDirection() {
  return (
    <section className="bg-[#f26a22] text-[#17111b] py-24 md:py-32">
      <div className="page-x grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-black/55">
            Creative Direction
          </p>
          <h2 className="mt-6 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal text-[#17111b]">
            A mask built from contrast, color and ornamental rhythm.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="text-[15px] leading-relaxed text-black/72">
            The art direction combines a custom illustrated Venetian mask,
            feather structures, decorative ornaments and geometric backgrounds.
            The palette moves between orange, violet, green, gold and deep
            navy, creating a tension between historical elegance and modern
            poster energy.
          </p>
        </div>
      </div>

      <div className="page-x mt-12">
        <Figure
          src={`${base}/mask-closeup.png`}
          title="Illustration detail"
          body="The mask is the identity's anchor: symmetrical, theatrical and decorative, with layered feathers and gold ornament used as visual rhythm."
          ratio="2/3"
          light
        />
      </div>
    </section>
  );
}

function HeroArtwork() {
  return (
    <section className="page-x py-24 md:py-32">
      <Kicker>Hero Artwork</Kicker>
      <div className="mt-6 grid grid-cols-12 gap-8 items-end">
        <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
          The key visual introduces the full world of the project.
        </h2>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 body-lead leading-[1.7]">
          The composition frames the mask as a central stage object. Large
          circular forms create a theatrical backdrop, while texture gives the
          flat illustration a printed, tactile quality.
        </p>
      </div>
      <div className="mt-12">
        <Figure
          src={`${base}/hero-header.png`}
          title="Main key visual"
          body="Opening fullscreen visual built around the mask, feathers, ornament and a warm orange-to-red atmosphere."
          ratio="1920/629"
        />
      </div>
    </section>
  );
}

function PosterSeries() {
  return (
    <section className="bg-[#08070b] py-24 md:py-32">
      <div className="page-x">
        <Kicker>Poster Series</Kicker>
        <div className="mt-6 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
            One illustration, multiple atmospheres.
          </h2>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 body-lead leading-[1.7]">
            The poster series tests how the mask can shift tone through
            lighting, background geometry and color temperature while keeping
            the same iconic structure.
          </p>
        </div>
      </div>
      <div className="page-x mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {posterSeries.map((item) => (
          <Figure key={item.src} {...item} />
        ))}
      </div>
    </section>
  );
}

function BrandApplications() {
  return (
    <section className="page-x py-24 md:py-32">
      <Kicker>Brand Applications</Kicker>
      <div className="mt-6 grid grid-cols-12 gap-8 items-end">
        <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
          From poster artwork to event experience.
        </h2>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 body-lead leading-[1.7]">
          The identity was designed to move beyond a single poster. The mask,
          color palette and typography expand into tickets, street advertising
          and environmental surfaces.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-12">
          <Figure {...applications[0]} />
        </div>
        <div className="lg:col-span-7">
          <Figure {...applications[1]} />
        </div>
        <div className="lg:col-span-5">
          <Figure {...applications[2]} />
        </div>
      </div>
    </section>
  );
}

function VisualSystem() {
  return (
    <section className="bg-[#f26a22] text-[#17111b] py-24 md:py-32">
      <div className="page-x">
        <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-black/55">
          Visual System
        </p>
        <div className="mt-6 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal text-[#17111b]">
            Ornament becomes structure.
          </h2>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[15px] leading-relaxed text-black/72">
            The system is built from repeated circles, color blocks, mask
            fragments, feather shapes and textured fields. These elements
            allow the identity to scale without losing its theatrical tone.
          </p>
        </div>
      </div>
      <div className="page-x mt-12 grid grid-cols-1 gap-5">
        {system.map((item) => (
          <Figure key={item.src} {...item} light />
        ))}
      </div>
    </section>
  );
}

function HistoricalContext() {
  return (
    <TextSection
      kicker="Historical Context"
      title="A modern reading of a centuries-old celebration."
      body={[
        "The Venice Carnival dates back to the Middle Ages and remains known for its elaborate costumes and masks. Its visual identity is tied to anonymity, elegance, theatricality and public spectacle.",
        "This project uses those cultural markers as a starting point, then translates them into a contemporary graphic language: sharper color, simplified geometry, expressive texture and large-scale poster composition.",
      ]}
    />
  );
}

function Results() {
  return (
    <section className="page-x pb-28 md:pb-40">
      <div className="border-y border-white/15 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <Kicker>Results</Kicker>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="h-display text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.02] tracking-normal">
              A flexible visual identity built from illustration, cultural
              reinterpretation and scalable graphic elements.
            </p>
            <p className="mt-8 body-lead max-w-2xl leading-[1.75]">
              The project became an exercise in translating cultural heritage
              into a contemporary visual system. It strengthened the connection
              between illustration and branding, showing how one artwork can
              generate posters, applications, patterns and environmental
              storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TextSection({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string[];
}) {
  return (
    <section className="page-x py-24 md:py-32 border-t border-white/10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-6 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
            {title}
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:pt-8 space-y-6">
          {body.map((paragraph) => (
            <p key={paragraph} className="body-lead leading-[1.75]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Figure({
  src,
  title,
  body,
  ratio,
  light,
}: {
  src: string;
  title: string;
  body: string;
  ratio: string;
  light?: boolean;
}) {
  return (
    <figure
      className={[
        "group overflow-hidden border",
        light ? "border-black/10 bg-white/12" : "border-white/12 bg-ink-700",
      ].join(" ")}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.025]"
        />
      </div>
      <figcaption className="p-5 md:p-6">
        <span
          className={[
            "block font-display text-xl leading-tight",
            light ? "text-[#17111b]" : "text-white",
          ].join(" ")}
        >
          {title}
        </span>
        <span
          className={[
            "mt-2 block text-[13px] leading-relaxed",
            light ? "text-black/65" : "text-white/58",
          ].join(" ")}
        >
          {body}
        </span>
      </figcaption>
    </figure>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#ff9d2f]">
      {children}
    </p>
  );
}
