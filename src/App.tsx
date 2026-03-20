import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import './App.css'

function App() {

  return (
    <>
      <Helmet>
        <title>Mahib Abrar – Developer Portfolio</title>
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
