import Image from "next/image";
import Link from "next/link";

const base = "/projects/atletec-zwift-racing-league";

const meta = [
  ["Client", "Atletec"],
  ["Industry", "Esport / eCycling / Racing"],
  ["Role", "Lead Designer"],
  ["Year", "2021"],
  ["Services", "Art Direction · Graphic Design · Motion Design · 3D Design · Social Media"],
];

const trailerFrames = [
  {
    src: `${base}/trailer-frame-01-wireframe.png`,
    title: "Wireframe Bicycle Loading Sequence",
    body: "The bicycle becomes the central technical object of the launch film.",
  },
  {
    src: `${base}/trailer-frame-02-error.png`,
    title: "Error Diagnostic",
    body: "Warning states and glitch signals bring the esport interface language forward.",
  },
  {
    src: `${base}/trailer-frame-03-scan.png`,
    title: "Glitch Scan",
    body: "Scanlines, corrupted data and low-light HUD layers define the trailer rhythm.",
  },
  {
    src: `${base}/trailer-frame-04-loading.png`,
    title: "Final Loading Interface",
    body: "A final system screen ties motion, bike geometry and racing tension together.",
  },
];

const development = [
  {
    src: `${base}/campaign-en-selle.png`,
    title: "Bicycle Object System",
    body: "Cycling equipment was treated as a graphic object, not only as a sport reference.",
    ratio: "16/9",
  },
  {
    src: `${base}/campaign-ecyclisme.png`,
    title: "Wheel Study",
    body: "Wheel structures became radial compositions for campaign and motion layouts.",
    ratio: "16/9",
  },
  {
    src: `${base}/trailer-frame-01-wireframe.png`,
    title: "Technical Wireframe",
    body: "The 3D bicycle model was integrated into interface-led motion sequences.",
    ratio: "16/9",
  },
];

const social = [
  {
    src: `${base}/social-victory.png`,
    title: "Victory Announcement",
    ratio: "16/9",
  },
  {
    src: `${base}/social-defeat.png`,
    title: "Defeat Announcement",
    ratio: "16/9",
  },
  {
    src: `${base}/social-emea-ranking.png`,
    title: "Championship Standings",
    ratio: "16/9",
  },
  {
    src: `${base}/social-individual-ranking.png`,
    title: "Individual Rider Ranking",
    ratio: "16/9",
  },
  {
    src: `${base}/social-race-result.png`,
    title: "Race Finish Result",
    ratio: "16/9",
  },
];

const campaign = [
  {
    src: `${base}/campaign-next-race.png`,
    title: "Next Race Poster",
    ratio: "1400/1980",
  },
  {
    src: `${base}/campaign-en-selle.png`,
    title: "Atletec se met en selle",
    ratio: "16/9",
  },
  {
    src: `${base}/campaign-ecyclisme.png`,
    title: "Et roule vers l'eCyclisme",
    ratio: "16/9",
  },
  {
    src: `${base}/campaign-sprintons.png`,
    title: "Sprintons vers les victoires",
    ratio: "16/9",
  },
];

export default function AtletecZwiftCaseStudy() {
  return (
    <article className="bg-[#070707] text-bone">
      <Hero />
      <Overview />
      <VideoSection />
      <TrailerFrames />
      <Development />
      <SocialSystem />
      <CampaignVisuals />
      <Results />
    </article>
  );
}

function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-[#ef1f2a]">
      <div className="absolute inset-0">
        <Image
          src={`${base}/hero-cover.png`}
          alt="Atletec Zwift Racing League hero cover"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center opacity-95"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 30%, rgba(0,0,0,0.62))",
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
            Case Study · 2021
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-white/75">
              Atletec · Zwift Racing League
            </p>
            <h1 className="mt-5 h-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-normal">
              Racing
              <br />
              System
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="max-w-md text-[15px] leading-relaxed text-white/82">
              A complete visual ecosystem for virtual cycling competition:
              motion trailer, 3D cycling assets, race announcements, rankings
              and social communication for an entire competitive season.
            </p>
          </div>
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
          <Kicker>Project Overview</Kicker>
          <h2 className="mt-6 h-display text-[clamp(2.5rem,6vw,5.7rem)] leading-[0.95] tracking-normal">
            From cycling communication to esport identity.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:pt-2">
          <p className="body-lead leading-[1.75]">
            Zwift Racing League is one of the largest virtual cycling
            competitions in the world. The mission was to create a complete
            visual language capable of supporting race announcements, rankings,
            social updates, motion content and promotional campaigns.
          </p>
          <p className="mt-6 body-lead leading-[1.75]">
            The art direction moves away from traditional cycling visuals and
            sits between sport, esport, data interfaces and futuristic
            performance systems.
          </p>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-y border-white/15 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
        {meta.map(([label, value]) => (
          <div key={label} className="p-5 lg:p-6">
            <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#ff3a3f]">
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

function VideoSection() {
  return (
    <section className="page-x pb-24 md:pb-32">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-5">
          <Kicker>Motion Design Trailer</Kicker>
          <h2 className="mt-5 h-display text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.95] tracking-normal">
            Launching the Atletec x Otakam partnership.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="body-lead leading-[1.7]">
            A motion trailer built around futuristic interfaces, loading
            systems, technical diagnostics and glitch effects inspired by
            gaming culture.
          </p>
        </div>
      </div>

      <div className="mt-10 aspect-video overflow-hidden border border-white/15 bg-black">
        <iframe
          src="https://player.vimeo.com/video/610429045?h=0&title=0&byline=0&portrait=0"
          title="Announcement Zwift Team Atletec x Otakamfr"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </section>
  );
}

function TrailerFrames() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="page-x">
        <Kicker>Trailer Frame Gallery</Kicker>
        <div className="mt-6 grid grid-cols-12 gap-8 items-end">
          <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.7rem)] leading-[0.95] tracking-normal">
            Interface, error states and loading tension.
          </h2>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 body-lead leading-[1.7]">
            The trailer transforms a bicycle model into a digital object:
            scanned, diagnosed, loaded and staged like a competitive game
            asset.
          </p>
        </div>
      </div>

      <div className="page-x mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {trailerFrames.map((item, index) => (
          <FigureCard key={item.src} item={item} index={index} dark />
        ))}
      </div>
    </section>
  );
}

function Development() {
  return (
    <section className="page-x py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <Kicker>3D Development</Kicker>
          <h2 className="mt-5 h-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.95] tracking-normal">
            Cycling parts as graphic architecture.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="body-lead leading-[1.75]">
            Bike frames, wheels and technical components were used as raw
            material for composition. The goal was to make the equipment feel
            like a modular identity system: physical enough for cycling,
            digital enough for esport.
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {development.map((item, index) => (
          <FigureCard key={item.src} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function SocialSystem() {
  return (
    <section className="bg-[#ef1f2a] text-[#191919] py-24 md:py-32">
      <div className="page-x">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-black/55">
              Season Communication System
            </p>
            <h2 className="mt-5 h-display text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.92] tracking-normal text-[#272727]">
              One season, many race states.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[15px] leading-relaxed text-black/70">
            A modular content system allowed the team to publish victories,
            defeats, rankings, race results and individual performances while
            keeping a strong, recognizable identity.
          </p>
        </div>
      </div>

      <div className="page-x mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {social.map((item, index) => (
          <FigureCard key={item.src} item={item} index={index} light />
        ))}
      </div>
    </section>
  );
}

function CampaignVisuals() {
  return (
    <section className="page-x py-24 md:py-32">
      <Kicker>Campaign Visuals</Kicker>
      <div className="mt-6 grid grid-cols-12 gap-8 items-end">
        <h2 className="col-span-12 lg:col-span-7 h-display text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.95] tracking-normal">
          Editorial racing posters for a digital peloton.
        </h2>
        <p className="col-span-12 lg:col-span-4 lg:col-start-9 body-lead leading-[1.7]">
          Campaign visuals used French cycling language, bold red fields,
          newspaper-like typography and repeated symbols to create a distinct
          Atletec presence within the league.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-5">
          <FigureCard item={campaign[0]} index={0} />
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 gap-5">
          {campaign.slice(1).map((item, index) => (
            <FigureCard key={item.src} item={item} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
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
              A complete design framework capable of supporting an entire
              season of competition.
            </p>
            <p className="mt-8 body-lead max-w-2xl leading-[1.75]">
              The final system established a strong visual identity for Atletec
              inside the Zwift Racing League ecosystem through motion design,
              3D exploration, editorial layouts and social media communication.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Art Direction", "Motion Design", "3D Design", "Social Media", "Lead Designer"].map(
                (item) => (
                  <span
                    key={item}
                    className="border border-white/15 px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/70"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FigureCard({
  item,
  index,
  dark,
  light,
}: {
  item: { src: string; title: string; body?: string; ratio?: string };
  index: number;
  dark?: boolean;
  light?: boolean;
}) {
  return (
    <figure
      className={[
        "group overflow-hidden border",
        dark
          ? "border-white/12 bg-[#080808]"
          : light
            ? "border-black/10 bg-white/12"
            : "border-white/12 bg-ink-700",
      ].join(" ")}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: item.ratio ?? "16/9" }}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.025]"
        />
      </div>
      <figcaption className="flex items-start gap-5 p-5 md:p-6">
        <span
          className={[
            "font-mono text-[10px] tracking-[0.22em]",
            light ? "text-black/55" : "text-[#ff3a3f]",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span
            className={[
              "block font-display text-xl leading-tight",
              light ? "text-[#272727]" : "text-white",
            ].join(" ")}
          >
            {item.title}
          </span>
          {item.body && (
            <span
              className={[
                "mt-2 block text-[13px] leading-relaxed",
                light ? "text-black/65" : "text-white/58",
              ].join(" ")}
            >
              {item.body}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#ff3a3f]">
      {children}
    </p>
  );
}
