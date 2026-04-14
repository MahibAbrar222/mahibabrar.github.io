import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mahib Abrar – Developer Portfolio</title>
        <meta
          name="description"
          content="Welcome to my portfolio! I'm Mahib Abrar, a passionate developer creating innovative solutions. Explore my projects and get in touch!"
        />
        <meta
          name="keywords"
          content="Mahib Abrar, developer portfolio, projects, contact, web development, software engineering"
        />
        <meta name="author" content="Mahib Abrar" />

        <meta property="og:title" content="Mahib Abrar – Developer Portfolio" />
        <meta
          property="og:description"
          content="Welcome to my portfolio! I'm Mahib Abrar, a passionate developer creating innovative solutions. Explore my projects and get in touch!"
        />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/128323013?v=4" />
        <meta property="og:url" content="https://itsmahibabrar.github.io" />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mahib Abrar",
            "alternateName": "Mahib",
            "description": "Student and hobbyist software developer focused on building performance-oriented web applications, embedded systems with ESP32, and experimental AI-driven simulations.",
            "url": "https://itsmahibabrar.github.io",
            "image": "https://avatars.githubusercontent.com/u/128323013?v=4",
            "jobTitle": "Student & Hobbyist Developer",
            "knowsAbout": [
              "Web Development",
              "JavaScript",
              "ReactJS",
              "Python",
              "ESP32",
              "Embedded Systems",
              "API Design",
              "AI Simulations"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Monipur High School & College"
            },
            "sameAs": [
              "https://github.com/itsmahibabrar",
              "https://mahfil.net/channel/mahib-abrar",
              "https://www.youtube.com/@mahibabrarofficial"
            ]
          })}
        </script>
      </Helmet>
      
      <main>
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <span className="eyebrow">Building thoughtful, fast experiences</span>
              <h1>
                Hi, I'm <span className="highlight">Mahib Abrar</span>
              </h1>
              <p>
                I design and develop calm, reliable products with a focus on performance, accessibility,
                and developer experience. Mostly crafting for the web and Model Context Protocol.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn primary">View projects</a>
                <a href="/about" className="btn ghost">About me</a>
              </div>
              <div className="hero-metrics">
                <div className="metric">
                  <span className="metric-value">1+</span>
                  <span className="metric-label">MCP tools launched</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-frame">
                <img src="https://avatars.githubusercontent.com/u/128323013?v=4" alt="Mahib Abrar portrait" />
              </div>
              <aside className="status-card" aria-label="Current activity">
                <span className="dot" aria-hidden="true" />
                <div>
                  <p className="status-label">Currently building</p>
                  <p className="status-value">Microtools & MCP endpoints</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <header className="section-header">
            <p className="eyebrow">About</p>
            <h2>Intentional craft over noise</h2>
            <p className="section-lead">
              I love experimenting with new stacks, shaping lean architectures, and keeping interfaces
              purposeful. From API design to UI polish, I sweat the details so the experience feels
              effortless.
            </p>
          </header>
          <div className="about-grid">
            <div className="about-card">
              <h3>What drives me</h3>
              <ul>
                <li>Performance-first builds with clean, maintainable code.</li>
                <li>Accessible, readable interfaces that feel calm.</li>
                <li>Rapid prototyping to validate ideas quickly.</li>
              </ul>
            </div>
            <div className="about-card">
              <h3>Stacks I lean on</h3>
              <ul>
                <li>TypeScript, React, Vite, Node.</li>
                <li>MCP-compatible services and tooling.</li>
                <li>Design systems with purposeful motion.</li>
              </ul>
            </div>
          </div>
          <div className="about-cta">
            <a href="/about" className="btn primary">View my story</a>
            <a href="#contact" className="btn ghost">Start a conversation</a>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <header className="section-header">
            <p className="eyebrow">Selected work</p>
            <h2>Projects that balance utility and polish</h2>
            <p className="section-lead">A snapshot of experiments shipped recently.</p>
          </header>
          <div className="projects">
            <article className="project-card">
              <div className="project-top">
                <div className="pill">Model Context Protocol</div>
                <div className="pill subtle">Open source</div>
              </div>
              <h3>Bangla Quran MCP</h3>
              <p>Provides MCP access to Quran resources in Bangla with reliable endpoints and clean responses.</p>
              <div className="project-links">
                <a href="https://mcpize.com/mcp/bangla-quran-mcp" target="_blank" rel="noopener noreferrer" className="btn text">View project</a>
              </div>
            </article>

            <article className="project-card">
              <div className="project-top">
                <div className="pill">Realtime</div>
                <div className="pill subtle">Service tooling</div>
              </div>
              <h3>Minecraft Server Status MCP</h3>
              <p>Queries Minecraft Java Edition servers for up-to-date status, latency, and MOTD in a single call.</p>
              <div className="project-links">
                <a href="https://mcpize.com/mcp/minecraft-server-status" target="_blank" rel="noopener noreferrer" className="btn text">View project</a>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <header className="section-header">
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something thoughtful</h2>
            <p className="section-lead">
              Want to collaborate or need a quick prototype? Drop a note and I’ll respond within a day.
            </p>
          </header>
          <div className="contact-actions">
            <a href="mailto:mahibabrar123@gmail.com" className="btn primary" rel="me">Email me</a>
            <a href="https://github.com/itsmahibabrar" className="btn ghost" target="_blank" rel="noopener noreferrer me">GitHub</a>
          </div>
          <div className="social-icons">
            <a
              href="https://github.com/itsmahibabrar"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="mailto:mahibabrar123@gmail.com"
              className="social-icon"
              aria-label="Email"
              title="Email"
              rel="me"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}