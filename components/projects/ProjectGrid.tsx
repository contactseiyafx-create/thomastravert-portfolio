"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectFilters } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { ProjectRow, ProjectGridCard } from "./ProjectCard";

type Filter = "ALL" | ProjectCategory;
type ViewMode = "list" | "grid";

/**
 * Work-page controller.
 * - Top bar with category filters + list/grid view toggle.
 * - Renders editorial rows or a 3-up grid depending on the mode.
 * - Filter / view state is in-memory (no querystring) — the grid stays light.
 */
export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    if (filter === "ALL") return projects;
    return projects.filter((p) => p.tags?.includes(filter));
  }, [filter]);

  // Trim filter list to only those that actually have projects so the bar
  // never advertises an empty slot.
  const visibleFilters = useMemo(() => {
    const used = new Set(projects.flatMap((p) => p.tags ?? []) as Filter[]);
    return projectFilters.filter((f) => f === "ALL" || used.has(f));
  }, []);

  return (
    <section className="page-x pb-24">
      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-bone-line">
        {/* Filters */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 items-center">
          {visibleFilters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={[
                  "font-mono text-[11px] tracking-[0.22em] uppercase transition-colors duration-300",
                  active
                    ? "text-bone"
                    : "text-bone-muted hover:text-bone-dim",
                ].join(" ")}
              >
                <span className="inline-flex items-center gap-2">
                  {active && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
                  )}
                  {f}
                </span>
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.22em] text-bone-muted">
            VIEW
          </span>
          <ViewToggle mode={view} onChange={setView} />
        </div>
      </div>

      {/* RESULTS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${view}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2"
        >
          {filtered.length === 0 ? (
            <p className="font-mono text-[12px] tracking-[0.22em] text-bone-muted py-20 text-center uppercase">
              No projects in this category yet — check back soon.
            </p>
          ) : view === "list" ? (
            <div className="divide-y divide-bone-line">
              {filtered.map((p, i) => (
                <ProjectRow key={p.slug} project={p} i={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pt-10">
              {filtered.map((p, i) => (
                <ProjectGridCard key={p.slug} project={p} i={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────── view toggle ───────────────────── */

function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (m: ViewMode) => void;
}) {
  return (
    <div className="flex border border-bone-line">
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={mode === "list"}
        className={[
          "p-2 transition-colors duration-300",
          mode === "list"
            ? "bg-bone-line text-bone"
            : "text-bone-muted hover:text-bone-dim",
        ].join(" ")}
      >
        <ListIcon />
      </button>
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        aria-pressed={mode === "grid"}
        className={[
          "p-2 border-l border-bone-line transition-colors duration-300",
          mode === "grid"
            ? "bg-bone-line text-bone"
            : "text-bone-muted hover:text-bone-dim",
        ].join(" ")}
      >
        <GridIcon />
      </button>
    </div>
  );
}

function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M0 1.5H12M0 6H12M0 10.5H12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0" y="0" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="0" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="0" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
