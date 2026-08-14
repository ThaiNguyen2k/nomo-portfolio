"use client";

import { useState } from "react";

const links = [
  ["#home", "_hello"],
  ["#about", "_about-me"],
  ["#projects", "_projects"],
  ["#experience", "_experience"],
  ["#contact", "_contact-me"],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      <div className={`mobile-menu-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-heading"><span># navigate:</span><button type="button" onClick={() => setOpen(false)}>×</button></div>
        <nav aria-label="Mobile navigation">
          {links.map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="mobile-menu-socials">
          <span>find me in:</span>
          <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:nguyendragon2000@gmail.com">Email ↗</a>
        </div>
      </div>
    </>
  );
}
