import ContactWorkspace from "./components/ContactWorkspace";
import MobileNav from "./components/MobileNav";
import ProjectGallery from "./components/ProjectGallery";
import TerminalGame from "./components/TerminalGame";

const skillGroups = [
  {
    name: "frontend",
    skills: ["React.js", "TypeScript", "JavaScript ES6+", "HTML5 / CSS3", "SCSS", "Responsive UI"],
  },
  {
    name: "backend_cloud",
    skills: ["FastAPI", "Python", "REST APIs", "Cloudflare Workers", "Better Auth", "RBAC"],
  },
  {
    name: "database",
    skills: ["PostgreSQL", "SQL", "Cloudflare D1", "Drizzle ORM", "SQLAlchemy", "Database migrations"],
  },
  {
    name: "mobile_cms",
    skills: ["React Native / Expo", "Cafe24", "Odoo", "WordPress"],
  },
  {
    name: "tools_ai_design",
    skills: ["Git / GitHub", "VS Code", "Chrome DevTools", "ChatGPT / Claude / Codex", "Figma / Photoshop"],
  },
];

const marqueeSkills = skillGroups.flatMap((group) => group.skills).slice(0, 8);

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Nguyen Thai Nguyen - home">
          <img className="brand-logo" src="/nomo-logo-cube-site.png" alt="Nomo logo" width="58" height="58" />
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
        <MobileNav />
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
                <img src="/avatar-nomo.png" alt="Portrait of Nguyen Thai Nguyen" width="1254" height="1405" />
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
        <div className="marquee-track">
          {[0, 1].map((cycle) => (
            <div className="marquee-group" aria-hidden={cycle === 1} key={cycle}>
              {marqueeSkills.map((skill) => <span key={`${cycle}-${skill}`}>{skill} <i>+</i></span>)}
            </div>
          ))}
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

        <div className="about-console">
          <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>about.workspace</span><span>3 files</span></div>
          <div className="about-console-body">
            <aside className="about-explorer">
              <p># personal-info</p>
              <details open><summary>▾ bio</summary><span>profile.md</span><span>experience.json</span></details>
              <details open><summary>▾ education</summary><span>can-tho-university</span><span>kits-fullstack-java</span></details>
              <details><summary>▸ interests</summary><span>product-ui</span><span>ai-engineering</span></details>
              <p># contacts</p>
              <a href="mailto:nguyendragon2000@gmail.com">email.config</a>
              <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">github.link</a>
            </aside>
            <div className="about-source">
              <div className="source-tab">profile.md <span>×</span></div>
              <div className="source-lines">
                <p><b>01</b> {"/**"}</p>
                <p><b>02</b> * Frontend-focused engineer with nearly 3 years</p>
                <p><b>03</b> * of production experience across commerce,</p>
                <p><b>04</b> * business systems, mobile, cloud, and AI products.</p>
                <p><b>05</b> *</p>
                <p><b>06</b> * I translate Figma and PSD designs into</p>
                <p><b>07</b> * responsive, maintainable React interfaces.</p>
                <p><b>08</b> *</p>
                <p><b>09</b> * Current focus: TypeScript, FastAPI, Workers,</p>
                <p><b>10</b> * PostgreSQL/D1, tested AI-assisted delivery.</p>
                <p><b>11</b> */</p>
              </div>
            </div>
            <div className="code-showcase">
              <p>{"//"} code snippet showcase:</p>
              <article><span>GFT Career Connect AI</span><pre><code><em>const</em> pipeline = [<br />  &quot;triage&quot;, &quot;retrieval&quot;,<br />  &quot;confidence-gate&quot;,<br />  &quot;human-handoff&quot;<br />];</code></pre><small>64/64 tests · Cloudflare</small></article>
              <article><span>NutriVision AI</span><pre><code><em>type</em> Stack = &#123;<br />  mobile: &quot;Expo&quot;,<br />  api: &quot;FastAPI&quot;,<br />  db: &quot;PostgreSQL&quot;<br />&#125;;</code></pre><small>full-stack · private repository</small></article>
            </div>
          </div>
        </div>

        <div className="stack-panel">
          <div className="window-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>skills.json</span>
            <span>UTF-8</span>
          </div>
          <div className="stack-content">
            <p><span>01</span> &#123;</p>
            {skillGroups.map((group, index) => (
              <div className="skill-group" key={group.name}>
                <p><span>{String(index * 4 + 2).padStart(2, "0")}</span> <em>&quot;{group.name}&quot;</em>: [</p>
                <div className="skill-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <p><span>{String(index * 4 + 4).padStart(2, "0")}</span> ],</p>
              </div>
            ))}
            <p><span>22</span> &#125;</p>
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

          <ProjectGallery />
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
              <div className="timeline-date">Jul 2026 - Present</div>
              <div><span>Freelance</span><h3>Full-stack Developer</h3><p>Independent Projects</p></div>
              <p>Built GFT Career Connect AI and NutriVision AI end to end—from product flows and responsive UI to APIs, databases, authentication, AI integrations, automated tests, and production deployment.</p>
            </article>
            <article className="timeline-item">
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
            <span className="comment">{"//"} education &amp; training</span>
            <div><p>2018 - 2022</p><h3>Engineer&apos;s Degree</h3><span>Information Systems<br />Can Tho University of Technology</span></div>
            <div><p>2023</p><h3>Full-Stack Java</h3><span>Practical frontend focus with React<br />KITS Vietnam</span></div>
          </aside>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell">
          <div className="contact-copy">
            <p className="eyebrow">04. / contact-me</p>
            <h2>Have a product in mind?<br /><span>Let&apos;s make it real.</span></h2>
            <p>I am open to frontend roles and thoughtful product collaborations. Tell me about the challenge, the team, or the interface you want to bring to life.</p>
          </div>
          <ContactWorkspace />
        </div>
      </section>

      <TerminalGame />

      <footer className="site-footer">
        <div className="footer-socials">
          <span>find me in:</span>
          <a href="https://github.com/ThaiNguyen2k" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:nguyendragon2000@gmail.com">Email ↗</a>
        </div>
        <span>© 2026 Nguyen Thai Nguyen / Nomo</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
