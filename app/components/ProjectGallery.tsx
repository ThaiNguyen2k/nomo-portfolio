"use client";

import { useState } from "react";

const projects = [
  {
    id: "01", slug: "career-ai", name: "GFT Career Connect AI", period: "Jul - Aug 2026", category: "AI support automation platform",
    description: "A bilingual, multi-role support platform with controlled AI triage, knowledge retrieval, confidence gating, human handoff, audit history, and real-data dashboards.",
    stack: ["React 19", "TypeScript", "Cloudflare D1", "Drizzle ORM"], live: "https://gft-career-connect-ai.nguyendragon2000.workers.dev/", github: "https://github.com/ThaiNguyen2k/gft-career-connect-ai", featured: true,
  },
  {
    id: "02", slug: "nutrivision", name: "NutriVision AI", period: "Aug 2026", category: "Mobile nutrition intelligence",
    description: "A full-stack Expo, React, and FastAPI product for meal analysis, food logging, weight tracking, and source-aware nutrition insights across daily, 7-day, and 30-day views.",
    stack: ["Expo", "React", "FastAPI", "PostgreSQL"], featured: true,
  },
  {
    id: "03", slug: "andar", name: "Andar E-commerce", period: "Apr 2025 - Jun 2026", category: "Fashion commerce experience",
    description: "Production product and campaign pages built from PSD concepts, with responsive merchandising UI, galleries, sticky CTAs, variant interactions, and seasonal releases.",
    stack: ["Cafe24", "JavaScript", "SCSS", "Photoshop"], live: "https://andar01.cafe24.com/",
  },
  {
    id: "04", slug: "arria", name: "Arria USA", period: "Sep 2024 - Apr 2025", category: "Commerce & operations website",
    description: "A responsive Odoo and React storefront translated from Figma, including dynamic contact flows, checkout and payment journeys, validation, and spam prevention.",
    stack: ["Odoo", "React", "JavaScript", "SCSS"], live: "https://arriausa.com/",
  },
  {
    id: "05", slug: "gvmarket", name: "GV Market", period: "Aug 2024 - May 2025", category: "Multi-page e-commerce website",
    description: "Responsive home, listing, detail, about, and contact experiences with reusable product cards, category sections, filtering UI, and promotional layouts.",
    stack: ["React", "JavaScript", "HTML5", "CSS3"], live: "https://gvmarket.vn/",
  },
  {
    id: "06", slug: "erpia", name: "Erpia Corporate", period: "Dec 2023 - Mar 2024", category: "Corporate digital presence",
    description: "A responsive corporate website with reusable React components, scalable layout patterns, performance refinements, and cross-device UI delivery.",
    stack: ["React", "JavaScript", "HTML5", "SCSS"], live: "https://erpia.net/",
  },
];

const filters = [
  { id: "all", label: "all projects", terms: [] },
  { id: "react", label: "React / TypeScript", terms: ["React", "React 19", "TypeScript"] },
  { id: "backend", label: "backend / cloud", terms: ["FastAPI", "PostgreSQL", "Cloudflare D1", "Drizzle ORM"] },
  { id: "commerce", label: "commerce / CMS", terms: ["Cafe24", "Odoo"] },
  { id: "mobile", label: "mobile", terms: ["Expo"] },
];

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const selected = filters.find((filter) => filter.id === activeFilter) ?? filters[0];
  const visibleProjects = selected.terms.length === 0
    ? projects
    : projects.filter((project) => project.stack.some((technology) => selected.terms.includes(technology)));

  return (
    <div className="projects-layout">
      <aside className="project-filter-panel" aria-label="Filter projects by technology">
        <p># projects</p>
        {filters.map((filter) => (
          <button className={activeFilter === filter.id ? "active" : ""} type="button" key={filter.id} onClick={() => setActiveFilter(filter.id)}>
            <i aria-hidden="true" /> {filter.label}<span>{filter.id === "all" ? projects.length : projects.filter((project) => project.stack.some((item) => filter.terms.includes(item))).length}</span>
          </button>
        ))}
      </aside>
      <div>
        <div className="project-filter-summary"><span>{selected.label}</span><b>{visibleProjects.length.toString().padStart(2, "0")} results</b></div>
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.name}>
              <div className={`project-visual visual-${project.slug}`}>
                <div className="project-visual-top"><span>{project.id} / 06</span><span>{project.period}</span></div>
                <div className="project-mock" aria-hidden="true"><span className="mock-side" /><span className="mock-line wide" /><span className="mock-line mid" /><span className="mock-card a" /><span className="mock-card b" /><span className="mock-dot" /></div>
                <p>{project.category}</p>
              </div>
              <div className="project-body">
                <div className="project-title-row"><div><span>Project {project.id} {"//"}</span><h3>{project.name}</h3></div><span className="project-arrow" aria-hidden="true">↗</span></div>
                <p>{project.description}</p>
                <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links">
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <span aria-hidden="true">↗</span></a>}
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code <span aria-hidden="true">↗</span></a>}
                  {!project.live && !project.github && <span className="private-label">Private repository</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
