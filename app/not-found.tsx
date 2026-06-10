import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center text-center page-x pt-[var(--nav-h)]">
      <div>
        <p className="h-eyebrow">ERROR · 404</p>
        <h1 className="h-display text-[clamp(5rem,18vw,15rem)] mt-4">
          NOT
          <br />
          FOUND
        </h1>
        <p className="body-lead mt-6">
          The page you are looking for has slipped through the cracks.
        </p>
        <Link
          href="/"
          className="cta-btn mt-8 inline-flex"
        >
          <span>RETURN HOME</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="arrow">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
