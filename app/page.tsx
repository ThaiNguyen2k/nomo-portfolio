import ContactWorkspace from "./components/ContactWorkspace";
import ExperienceTimer from "./components/ExperienceTimer";
import MobileNav from "./components/MobileNav";
import ProjectGallery from "./components/ProjectGallery";
import SocialLinks from "./components/SocialLinks";
import TerminalGame from "./components/TerminalGame";
import TechBackground from "./components/TechBackground";

const skillGroups = [
  {
    name: "backend_services",
    skills: ["Python", "FastAPI", "REST APIs", "Cloudflare Workers / D1"],
  },
  {
    name: "data_and_auth",
    skills: ["PostgreSQL", "SQL", "SQLAlchemy", "Drizzle ORM", "Better Auth", "RBAC"],
  },
  {
    name: "web_and_mobile",
    skills: ["React", "TypeScript", "JavaScript ES6+", "React Native / Expo", "HTML / CSS / SCSS", "Responsive UI"],
  },
  {
    name: "platforms_and_delivery",
    skills: ["Cafe24", "Odoo", "WordPress", "Reusable components", "Unit testing", "Linting", "Production builds"],
  },
  {
    name: "engineering_tools_and_ai",
    skills: ["Git / GitHub", "VS Code", "Chrome DevTools", "OpenAI / Gemini", "Claude / Codex", "Figma / Photoshop"],
  },
];

const marqueeSkills = ["Python", "FastAPI", "PostgreSQL", "Cloudflare Workers / D1", "TypeScript", "React Native / Expo", "Drizzle ORM", "AI integrations"];

const lifeMilestones = [
  {
    period: "Aug 2018 - Nov 2022",
    type: "University",
    title: "Information Systems",
    place: "Can Tho University of Technology",
    detail: "Engineer’s Degree in Information Systems.",
  },
  {
    period: "Apr - Oct 2023",
    type: "Training",
    title: "Full-Stack Java Development",
    place: "KITS (Korea IT School), Vietnam",
    detail: "Practical project training in full-stack development, including React.",
  },
  {
    period: "Aug 2023 - Nov 2025",
    type: "Full-time",
    title: "Software Engineer",
    place: "Amoeba Co., Ltd",
    detail: "Built and maintained 10+ commerce and business web applications, reusable components, API integrations, and CMS customizations.",
  },
  {
    period: "Nov 2025 - Present",
    type: "Freelance",
    title: "Software Engineer",
    place: "Independent Projects",
    detail: "Delivered GFT Career Connect AI and NutriVision AI end to end, alongside ongoing Andar commerce work.",
  },
];

export default function Home() {
  return (
    <main className="portfolio-main">
      <TechBackground />
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
          <div className="availability"><span /> Available for Software Engineer opportunities</div>
          <p className="eyebrow">Hello, I am <span className="nickname">Nomo</span></p>
          <h1>Nguyen Thai<br /><span>Nguyen.</span></h1>
          <p className="hero-role">Software Engineer <span>/ Web, Mobile &amp; AI Products</span></p>
          <p className="hero-summary">
            I build and ship complete software products across web, mobile, backend APIs, databases, and cloud services. Nearly three years delivering commerce, business, and AI applications from implementation through production.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">→</span></a>
            <a className="button button-ghost" href="/Nguyen-Thai-Nguyen-Software-Engineer-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
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
                <p><b>04</b> &nbsp;focus: <strong>&quot;Software Engineer&quot;</strong>,</p>
                <p><b>05</b> &nbsp;craft: [<strong>&quot;APIs&quot;</strong>, <strong>&quot;Web&quot;</strong>, <strong>&quot;Mobile&quot;</strong>],</p>
                <p><b>06</b> &nbsp;location: <strong>&quot;HCMC&quot;</strong>,</p>
                <p><b>07</b> &nbsp;status: <span>true</span></p>
                <p><b>08</b> &#125;;</p>
              </div>
            </div>
          </div>
          <span className="float-tag tag-one">FastAPI()</span>
          <span className="float-tag tag-two">PostgreSQL</span>
          <span className="float-tag tag-three">Ship.Software()</span>
        </div>
      </section>

      <div className="skill-marquee" aria-label="Core technologies">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((cycle) => (
            <div className="marquee-group" aria-hidden={cycle === 1} key={cycle}>
              {marqueeSkills.map((skill) => <span key={`${cycle}-${skill}`}>{skill} <i>+</i></span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="section-shell content-section" id="about">
        <div className="section-heading">
          <p><span>01.</span> / about-me</p>
          <h2>Engineering end to end.<br /><span>From data to experience.</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p className="lead">Software engineer building complete products across responsive web, mobile, backend services, databases, and cloud platforms.</p>
            <p>I have delivered 10+ commerce and business applications, pairing React and TypeScript with API integrations, data workflows, and production delivery. Recent work spans FastAPI, PostgreSQL, Cloudflare Workers and D1, Expo, and role-based access.</p>
            <p>I build AI-enabled products from service design through user workflows, including data validation, privacy boundaries, migrations, automated checks, and deployment. My delivery practice includes reusable components, unit testing, linting, and production builds.</p>
            <a className="text-link" href="mailto:nguyendragon2000@gmail.com">Let&apos;s build something useful <span aria-hidden="true">↗</span></a>
          </div>
          <div className="metrics-grid">
            <article><strong>10<span>+</span></strong><p>web applications delivered</p></article>
            <article><strong>03<span>yr</span></strong><p>software engineering experience</p></article>
            <article><strong>05</strong><p>intake sources in GFT Career AI</p></article>
            <article><strong>02</strong><p>full-stack AI products delivered</p></article>
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
                <p><b>02</b> * Software Engineer with nearly 3 years building</p>
                <p><b>03</b> * production web, mobile, and AI products.</p>
                <p><b>04</b> * Full-stack delivery with FastAPI, PostgreSQL,</p>
                <p><b>05</b> * Cloudflare, React, Expo, and TypeScript.</p>
                <p><b>06</b> * Design secure workflows, APIs, and data layers.</p>
                <p><b>07</b> * Ship with tests, reviews, and production builds.</p>
                <p><b>08</b> {"*/"}</p>
              </div>
            </div>
            <div className="code-showcase">
              <p>{"//"} code snippet showcase:</p>
              <article><span>GFT Career Connect AI</span><pre><code><em>const</em> workflow = [<br />  &quot;intake&quot;, &quot;dedupe&quot;,<br />  &quot;route&quot;, &quot;retrieve&quot;,<br />  &quot;verify&quot;, &quot;handoff&quot;<br />];</code></pre><small>AI workflows · Cloudflare D1</small></article>
              <article><span>NutriVision AI</span><pre><code><em>type</em> Stack = &#123;<br />  mobile: &quot;Expo&quot;,<br />  service: &quot;FastAPI&quot;,<br />  data: &quot;PostgreSQL&quot;<br />&#125;;</code></pre><small>full-stack mobile · API · data</small></article>
            </div>
          </div>
        </div>

        <div className="stack-panel">
          <div className="window-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>skills.json</span>
            <span>GMT+7 · VIETNAM</span>
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
            <p><span>26</span> &#125;</p>
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
          <h2>Software engineering<br /><span>from idea to production.</span></h2>
        </div>
        <div className="life-timeline" aria-label="Education and professional journey">
          <div className="life-timeline-heading">
            <span>{"//"} life.timeline</span>
            <span>2018 → now</span>
          </div>
          <div className="life-timeline-scroll">
            <div className="life-track" aria-hidden="true" />
            {lifeMilestones.map((milestone, index) => (
              <article className={`life-milestone ${index === lifeMilestones.length - 1 ? "active" : ""}`} key={milestone.period}>
                <span className="life-node" aria-hidden="true"><i>{String(index + 1).padStart(2, "0")}</i></span>
                <p className="life-period">{milestone.period}</p>
                <span className="life-type">{milestone.type}</span>
                <h3>{milestone.title}</h3>
                <strong>{milestone.place}</strong>
                <p className="life-detail">{milestone.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <ExperienceTimer />
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell">
          <div className="contact-copy">
            <p className="eyebrow">04. / contact-me</p>
            <h2>Have a product in mind?<br /><span>Let&apos;s make it real.</span></h2>
          <p>I am open to Software Engineer roles and product collaborations across backend, full-stack, web, mobile, and AI systems. Tell me about the product, technical challenge, or team you are building.</p>
          </div>
          <ContactWorkspace />
        </div>
      </section>

      <TerminalGame />

      <footer className="site-footer">
        <div className="footer-socials">
          <span>find Nomo online:</span>
          <SocialLinks compact />
        </div>
        <span>© 2026 Nguyen Thai Nguyen / Nomo</span>
        <a className="back-to-top" href="#home" aria-label="Back to top" title="Back to top">↑</a>
      </footer>
    </main>
  );
}
