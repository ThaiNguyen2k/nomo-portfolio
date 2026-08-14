const projects = [
  {
    id: "01",
    slug: "career-ai",
    name: "GFT Career Connect AI",
    period: "Jul - Aug 2026",
    category: "AI support automation platform",
    description:
      "A bilingual, multi-role support platform with controlled AI triage, knowledge retrieval, confidence gating, human handoff, audit history, and real-data dashboards.",
    stack: ["React 19", "TypeScript", "Cloudflare D1", "Drizzle ORM"],
    live: "https://gft-career-connect-ai.nguyendragon2000.workers.dev/",
    github: "https://github.com/ThaiNguyen2k/gft-career-connect-ai",
    featured: true,
  },
  {
    id: "02",
    slug: "nutrivision",
    name: "NutriVision AI",
    period: "Aug 2026",
    category: "Mobile nutrition intelligence",
    description:
      "A full-stack Expo, React, and FastAPI product for meal analysis, food logging, weight tracking, and source-aware nutrition insights across daily, 7-day, and 30-day views.",
    stack: ["Expo", "React", "FastAPI", "PostgreSQL"],
    featured: true,
  },
  {
    id: "03",
    slug: "andar",
    name: "Andar E-commerce",
    period: "Apr 2025 - Jun 2026",
    category: "Fashion commerce experience",
    description:
      "Production product and campaign pages built from PSD concepts, with responsive merchandising UI, galleries, sticky CTAs, variant interactions, and seasonal releases.",
    stack: ["Cafe24", "JavaScript", "SCSS", "Photoshop"],
    live: "https://andar01.cafe24.com/",
  },
  {
    id: "04",
    slug: "arria",
    name: "Arria USA",
    period: "Sep 2024 - Apr 2025",
    category: "Commerce & operations website",
    description:
      "A responsive Odoo and React storefront translated from Figma, including dynamic contact flows, checkout and payment journeys, validation, and spam prevention.",
    stack: ["Odoo", "React", "JavaScript", "SCSS"],
    live: "https://arriausa.com/",
  },
  {
    id: "05",
    slug: "gvmarket",
    name: "GV Market",
    period: "Aug 2024 - May 2025",
    category: "Multi-page e-commerce website",
    description:
      "Responsive home, listing, detail, about, and contact experiences with reusable product cards, category sections, filtering UI, and promotional layouts.",
    stack: ["React", "JavaScript", "HTML5", "CSS3"],
    live: "https://gvmarket.vn/",
  },
  {
    id: "06",
    slug: "erpia",
    name: "Erpia Corporate",
    period: "Dec 2023 - Mar 2024",
    category: "Corporate digital presence",
    description:
      "A responsive corporate website with reusable React components, scalable layout patterns, performance refinements, and cross-device UI delivery.",
    stack: ["React", "JavaScript", "HTML5", "SCSS"],
    live: "https://erpia.net/",
  },
];

const skills = [
  "React.js",
  "TypeScript",
  "JavaScript ES6+",
  "HTML5 / CSS3",
  "SCSS",
  "React Native / Expo",
  "Cloudflare Workers / D1",
  "FastAPI / Python",
  "REST APIs",
  "Cafe24 / Odoo / WordPress",
  "Figma / Photoshop",
  "AI-assisted development",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Nguyen Thai Nguyen - home">
          <img className="brand-logo" src="/nomo-logo-modern.png" alt="Nomo logo" width="42" height="42" />
          <span>nomo.dev</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">_hello</a>
          <a href="#about">_about-me</a>
          <a href="#projects">_projects</a>
          <a href="#experience">_experience</a>
        </nav>
        <a className="header-contact" href="#contact">
          _contact-me <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy reveal">
          <div className="availability"><span /> Available for frontend opportunities</div>
          <p className="eyebrow">Hello, I am <span className="nickname">Nomo</span></p>
          <h1>Nguyen Thai<br /><span>Nguyen.</span></h1>
          <p className="hero-role">Frontend Developer <span>/ React &amp; TypeScript</span></p>
          <p className="hero-summary">
            I turn ambitious ideas and detailed designs into fast, responsive, production-ready interfaces - with nearly three years of experience across commerce, business systems, and AI products.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">→</span></a>
            <a className="button button-ghost" href="/Nguyen-Thai-Nguyen-Frontend-Developer-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
          </div>
          <p className="code-link"><span>const</span> github = <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">&quot;github.com/ThaiNguyen2k&quot;</a>;</p>
        </div>

        <div className="hero-visual reveal reveal-delay" aria-label="Developer profile card">
          <div className="terminal-glow" />
          <div className="profile-window">
            <div className="window-bar">
              <div className="window-dots"><i /><i /><i /></div>
              <span>nguyen.profile.tsx</span>
              <span className="window-status">● live</span>
            </div>
            <div className="profile-window-body">
              <div className="portrait-wrap">
                <img src="/profile.png" alt="Portrait of Nguyen Thai Nguyen" width="305" height="381" />
                <div className="portrait-badge"><span>03</span> years<br />experience</div>
              </div>
              <div className="profile-code" aria-hidden="true">
                <p><b>01</b> <em>const</em> developer = &#123;</p>
                <p><b>02</b> &nbsp;name: <strong>&quot;Thai Nguyen&quot;</strong>,</p>
                <p><b>03</b> &nbsp;nickname: <strong>&quot;Nomo&quot;</strong>,</p>
                <p><b>04</b> &nbsp;focus: <strong>&quot;Frontend&quot;</strong>,</p>
                <p><b>05</b> &nbsp;craft: [<strong>&quot;React&quot;</strong>, <strong>&quot;TS&quot;</strong>],</p>
                <p><b>06</b> &nbsp;location: <strong>&quot;HCMC&quot;</strong>,</p>
                <p><b>07</b> &nbsp;status: <span>true</span></p>
                <p><b>08</b> &#125;;</p>
              </div>
            </div>
          </div>
          <span className="float-tag tag-one">&lt;React /&gt;</span>
          <span className="float-tag tag-two">TypeScript</span>
          <span className="float-tag tag-three">UI.Engineer()</span>
        </div>
      </section>

      <div className="skill-marquee" aria-label="Core technologies">
        <div>
          {skills.slice(0, 8).map((skill) => <span key={skill}>{skill} <i>+</i></span>)}
        </div>
      </div>

      <section className="section-shell content-section" id="about">
        <div className="section-heading">
          <p><span>01.</span> / about-me</p>
          <h2>Code with purpose.<br /><span>Interfaces with character.</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p className="lead">Frontend-focused software engineer who cares equally about visual fidelity, maintainable code, and the small interaction details that make products feel finished.</p>
            <p>I have delivered and maintained 10+ responsive applications, translating Figma and PSD designs into reusable React interfaces and commerce experiences. My work spans Cafe24, Odoo, WordPress, REST integrations, Cloudflare, and mobile experiences with Expo.</p>
            <p>I also use AI as a disciplined engineering partner - for architecture exploration, refactoring, debugging, test generation, and documentation - then validate every output through diffs, browser checks, linting, builds, and automated tests.</p>
            <a className="text-link" href="mailto:nguyendragon2000@gmail.com">Let&apos;s build something useful <span aria-hidden="true">↗</span></a>
          </div>
          <div className="metrics-grid">
            <article><strong>10<span>+</span></strong><p>web applications delivered</p></article>
            <article><strong>03<span>yr</span></strong><p>professional experience</p></article>
            <article><strong>12</strong><p>routes shipped in GFT Career AI</p></article>
            <article><strong>64<span>/64</span></strong><p>verified unit tests</p></article>
          </div>
        </div>

        <div className="stack-panel">
          <div className="window-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>skills.json</span>
            <span>UTF-8</span>
          </div>
          <div className="stack-content">
            <p><span>01</span> <em>&quot;frontend&quot;</em>: [</p>
            <div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <p><span>18</span> ]</p>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-shell">
          <div className="section-heading section-heading-row">
            <div>
              <p><span>02.</span> / selected-projects</p>
              <h2>Work that ships.<br /><span>Products that perform.</span></h2>
            </div>
            <p className="section-note">A selection of AI, commerce, and business products I am building and have delivered.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.name}>
                <div className={`project-visual visual-${project.slug}`}>
                  <div className="project-visual-top"><span>{project.id} / 06</span><span>{project.period}</span></div>
                  <div className="project-mock" aria-hidden="true">
                    <span className="mock-side" />
                    <span className="mock-line wide" />
                    <span className="mock-line mid" />
                    <span className="mock-card a" />
                    <span className="mock-card b" />
                    <span className="mock-dot" />
                  </div>
                  <p>{project.category}</p>
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <div><span>Project {project.id} //</span><h3>{project.name}</h3></div>
                    <span className="project-arrow" aria-hidden="true">↗</span>
                  </div>
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
      </section>

      <section className="section-shell content-section" id="experience">
        <div className="section-heading">
          <p><span>03.</span> / experience</p>
          <h2>From design files<br /><span>to production systems.</span></h2>
        </div>
        <div className="experience-grid">
          <div className="timeline">
            <article className="timeline-item active">
              <div className="timeline-date">Dec 2025 - Jun 2026</div>
              <div><span>Freelance</span><h3>Frontend Developer</h3><p>Amoeba Co., Ltd</p></div>
              <p>Continued delivery for Andar, building interactive storefront UI, seasonal campaign pages, responsive product journeys, and performance improvements.</p>
            </article>
            <article className="timeline-item">
              <div className="timeline-date">Aug 2023 - Nov 2025</div>
              <div><span>Full-time</span><h3>Frontend Developer</h3><p>Amoeba Co., Ltd</p></div>
              <p>Delivered 10+ responsive commerce and business applications, reusable components, CMS customizations, and API-connected customer journeys.</p>
            </article>
          </div>
          <aside className="education-card">
            <span className="comment">// education &amp; training</span>
            <div><p>2018 - 2022</p><h3>Engineer&apos;s Degree</h3><span>Information Systems<br />Can Tho University of Technology</span></div>
            <div><p>2023</p><h3>Full-Stack Java</h3><span>Practical frontend focus with React<br />KITS Vietnam</span></div>
          </aside>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-inner">
          <div className="contact-copy">
            <p className="eyebrow">04. / contact-me</p>
            <h2>Have a product in mind?<br /><span>Let&apos;s make it real.</span></h2>
            <p>I am open to frontend roles and thoughtful product collaborations. Tell me about the challenge, the team, or the interface you want to bring to life.</p>
            <a className="button button-primary" href="mailto:nguyendragon2000@gmail.com?subject=Let&apos;s%20work%20together">Start a conversation <span aria-hidden="true">→</span></a>
          </div>
          <div className="contact-terminal">
            <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>contact.config.js</span><span>ready</span></div>
            <div className="contact-code">
              <p><b>01</b> <em>const</em> contact = &#123;</p>
              <p><b>02</b> &nbsp;email: <a href="mailto:nguyendragon2000@gmail.com">&quot;nguyendragon2000@gmail.com&quot;</a>,</p>
              <p><b>03</b> &nbsp;phone: <a href="tel:+84939205421">&quot;+84 939 205 421&quot;</a>,</p>
              <p><b>04</b> &nbsp;github: <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">&quot;@ThaiNguyen2k&quot;</a>,</p>
              <p><b>05</b> &nbsp;location: <strong>&quot;Ho Chi Minh City&quot;</strong>,</p>
              <p><b>06</b> &nbsp;available: <span>true</span></p>
              <p><b>07</b> &#125;;</p>
            </div>
            <div className="terminal-status"><span>● online</span><span>Response time: &lt; 24h</span></div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Nguyen Thai Nguyen / Nomo</span>
        <span>Designed from Figma. Built with React &amp; TypeScript.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
