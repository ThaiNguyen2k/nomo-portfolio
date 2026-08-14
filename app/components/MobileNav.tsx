"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import SocialLinks from "./SocialLinks";

const links = [
  ["#home", "_hello"],
  ["#about", "_about-me"],
  ["#projects", "_projects"],
  ["#experience", "_experience"],
  ["#contact", "_contact-me"],
];

const subscribeToClient = () => () => {};

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <button
        className={`mobile-menu-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span /><span /><span />
      </button>
      {mounted && createPortal(
        <div className={`mobile-menu-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <div className="mobile-menu-heading"><span># navigate:</span><span>05 routes</span></div>
          <nav aria-label="Mobile navigation">
            {links.map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="mobile-menu-socials">
            <span>find Nomo online:</span>
            <SocialLinks compact />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
