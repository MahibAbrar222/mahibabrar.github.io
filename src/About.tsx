import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="about-page">
      <header className="about-hero">
        <p className="eyebrow">About</p>
        <h1>Intentional, curious, and always learning</h1>
        <p className="about-lead">
          I’m Mahib Abrar — a hobbyist developer who loves exploring the edges of web and backend
          technologies, shaping clean architectures, and crafting thoughtful experiences.
        </p>
        <div className="about-actions">
          <a className="btn primary" href="#contact">Get in touch</a>
          <Link className="btn ghost" to="/">Back home</Link>
        </div>
      </header>

      <section className="about-panels" aria-labelledby="skills-heading">
        <div className="panel-head">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-heading">Skilled languages & stacks</h2>
          <p className="panel-lead">Tooling I reach for when building.</p>
        </div>
        <div className="language-list">
          <div className="language-item">
            <div className="chip">Advanced</div>
            <h3>Python</h3>
            <p>Web apps, APIs, automation; comfortable with Django, Flask, and clean service layers.</p>
          </div>
          <div className="language-item">
            <div className="chip">Intermediate-Advanced</div>
            <h3>JavaScript</h3>
            <p>React for UI, Node.js for backend services, focused on DX and performance.</p>
          </div>
          <div className="language-item">
            <div className="chip">Intermediate</div>
            <h3>HTML & CSS</h3>
            <p>Accessible, responsive layouts with purposeful motion and systematized tokens.</p>
          </div>
          <div className="language-item">
            <div className="chip">Basic-Intermediate</div>
            <h3>PHP</h3>
            <p>Past experience shipping small tools; currently channeling learnings into Python/JS stacks.</p>
          </div>
        </div>
      </section>

      <section className="about-panels" aria-labelledby="hobbies-heading">
        <div className="panel-head">
          <p className="eyebrow">Hobbies</p>
          <h2 id="hobbies-heading">Hobbies & interests</h2>
          <p className="panel-lead">
            Exploring new tech, contributing to open source, and learning how better systems are designed.
          </p>
        </div>
        <div className="panel-grid">
          <div className="panel-card">
            <h3>Building for impact</h3>
            <p>
              Small tools that improve developer experience and performance, with an eye on real-world use.
            </p>
          </div>
          <div className="panel-card">
            <h3>Learning in public</h3>
            <p>
              Sharing learnings through projects, refining architectures, and experimenting with MCP-style
              services.
            </p>
          </div>
          <div className="panel-card">
            <h3>Always experimenting</h3>
            <p>
              Rapid prototypes to validate ideas quickly, then tightening the details so they feel effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="about-panels" aria-labelledby="education-heading">
        <div className="panel-head">
          <p className="eyebrow">Education</p>
          <h2 id="education-heading">Learning path</h2>
          <p className="panel-lead">
            Still in school, building alongside studies, and pairing curiosity with focused practice.
          </p>
        </div>
        <div className="panel-card">
          <p>
            I’m under 18 and balancing school with coding. Each project is a way to explore, document, and
            improve my craft.
          </p>
        </div>
      </section>

      <section className="about-panels" id="contact" aria-labelledby="contact-heading">
        <div className="panel-head">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading">Let’s collaborate</h2>
          <p className="panel-lead">Reach out and I’ll reply within a day.</p>
        </div>
        <div className="contact-grid">
          <a className="contact-card" href="mailto:mahibabrar123@gmail.com">
            <span className="chip">Email</span>
            <h3>mahibabrar123@gmail.com</h3>
            <p>Best for quick questions and project ideas.</p>
          </a>
          <a
            className="contact-card"
            href="https://github.com/itsmahibabrar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="chip">GitHub</span>
            <h3>@itsmahibabrar</h3>
            <p>Browse code, issues, and ongoing experiments.</p>
          </a>
          <a className="contact-card" href="https://www.youtube.com/@mahibabrar-23" target="_blank" rel="noopener noreferrer">
            <span className="chip">Youtube</span>
            <h3>Youtube Gaming Channel</h3>
            <p>Its mainly about gaming content, not coding.</p>
          </a>
        </div>
      </section>
    </main>
  );
}