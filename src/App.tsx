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

      
    </>
  )
}

export default App
