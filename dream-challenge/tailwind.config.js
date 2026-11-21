// Tailwind mapping of the Sweet Dreams design tokens (styles/tokens.css).
// The static Netlify build doesn't need Tailwind at runtime; use this file when moving to
// a build pipeline (Vite / Tailwind CLI) so utilities and components share one source of truth.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.js'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        midnight: 'var(--c-midnight)', indigo: 'var(--c-indigo)', periwinkle: 'var(--c-periwinkle)',
        lavender: 'var(--c-lavender)', haze: 'var(--c-haze)', blush: 'var(--c-blush)', moon: 'var(--c-moon)',
        ink: 'var(--c-ink)', mist: 'var(--c-mist)', gold: 'var(--c-gold)',
      },
      fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)' },
      borderRadius: { card: 'var(--r-card)', panel: 'var(--r-panel)', frame: 'var(--r-frame)' },
      backgroundImage: { 'cta-moon': 'var(--g-cta-moon)', 'cta-lavender': 'var(--g-cta-lavender)', glass: 'var(--g-glass)' },
      boxShadow: { 'cta-moon': 'var(--sh-cta-moon)', 'cta-lavender': 'var(--sh-cta-lavender)', glass: 'var(--sh-glass)' },
    },
  },
};
