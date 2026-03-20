import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import './App.css'

function App() {

  return (
    <>
      <Helmet>
        <title>Mahib Abrar – Developer Portfolio</title>

        <meta name="description" content="Welcome to my portfolio! I'm Mahib Abrar, a passionate developer creating innovative solutions. Explore my projects and get in touch!" />
        <meta name="keywords" content="Mahib Abrar, developer portfolio, projects, contact, web development, software engineering" />
        <meta name="author" content="Mahib Abrar" />

        {/* Og */}
        <meta property="og:title" content="Mahib Abrar – Developer Portfolio" />
        <meta property="og:description" content="Welcome to my portfolio! I'm Mahib Abrar, a passionate developer creating innovative solutions. Explore my projects and get in touch!" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/128323013?v=4" />
        <meta property="og:url" content="https://itsmahibabrar.github.io" />
      </Helmet>
      
      <Navbar />

      <section id="hero" className="hero-section">
        <div className="heroleft">
          <h1>Hi, I'm <span className="highlight">Mahib Abrar</span></h1>
          <p>I'm a passionate developer creating innovative solutions. As a Hobby!</p>
          <a href="#projects" className="cta-btn">View My Work</a>
        </div>
        <div className="heroright">
          <img src="https://avatars.githubusercontent.com/u/128323013?v=4" alt="profile" />
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Me</h2>
        <p>I'm a self-taught developer with a passion for creating innovative solutions. I enjoy working on projects that challenge me and allow me to learn new technologies. When I'm not coding, you can find me exploring the outdoors or playing video games.</p>
      </section>

      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects">
          <div className="project-card">
            <img src="https://jywvaocqguhhvphhbquv.supabase.co/storage/v1/object/public/server-logos/b26b2365-39e1-4dca-a69e-d3cc8ad0493e/1773912048662.webp" alt="Bangla Quran MCP" />
            <div className="card-content">
              <h3>Bangla Quran MCP</h3>
          <p>Bangla-Quran-MCP provides Model Context Protocol (MCP) access to Quran resources in Bangla (Bengali)</p>
          <a href="https://mcpize.com/mcp/bangla-quran-mcp" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
            </div>
          
        </div>
        <div className="project-card">
            <div className="card-content">
          <h3>Project Two</h3>
          <p>A mobile app that helps users manage their daily tasks and stay organized.</p>
          <a href="#" className="project-link">View Project</a>
          </div>
        </div>
        </div>
        
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Me</h2>
        <p>If you'd like to get in touch, feel free to reach out via email or connect with me on social media.</p>
        <div className="social-icons">
          <a
            href="https://github.com/itsmahibabrar"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>


          <a
            href="mailto:mahibabrar123@gmail.com"
            className="social-icon"
            aria-label="Email"
            title="Email"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Mahib Abrar. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
