import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <h1>About Me</h1>
      <p>Hi, I'm Mahib Abrar, a hobbyist developer experimenting with web backend technologies. I'm curious, always learning, and love solving problems with code.</p>

      <section className="skilled-language">
        <h2>Skilled Languages</h2>
        <section className="language-list">
          <div className="language-item">
            <h3>Python <span>(Advanced)</span></h3>
            <p>Experienced in building web applications, APIs, and automation scripts using Python. Proficient in frameworks like Django and Flask.</p>
          </div>
          <div className="language-item">
            <h3>JavaScript <span>(Intermediate-Advanced)</span></h3>
            <p>Skilled in JavaScript for both frontend and backend development. Experienced with React for building user interfaces and Node.js for server-side applications.</p>
          </div>
          <div className="language-item">
            <h3>HTML & CSS <span>(Intermediate)</span></h3>
            <p>Proficient in creating responsive and accessible web layouts using HTML and CSS.</p>
          </div>
          <div className="language-item">
            <h3>PHP <span>(Basic-Intermediate)</span></h3>
            <p>Previously experienced in PHP development but currently focusing on Python and JavaScript.</p>
          </div>
        </section>
      </section>

      <section className="hobbies-interests">
        <h2>Hobbies & Interests</h2>
        <p>In my free time, I enjoy exploring new technologies, contributing to open-source projects, and learning about software architecture. I'm passionate about building tools that improve developer experience and performance.</p>
        <p>I'm also aiming to create projects that can make a positive impact on the world. Check out my <Link to="/projects">projects</Link> to see what I've built so far.</p>
      </section>

      <section className="education">
        <h2>Education</h2>
        <p>Since I'm under 18, I am still in school and pursuing my education, while learning coding and development on the side.</p>
      </section>

      <section className="contact">
        <h2>Contact</h2>
        <p>Email: <a href="mailto:mahbabrar@example.com">mahbabrar@example.com</a></p>
        <p>GitHub: <a href="https://github.com/itsmahibabrar" target="_blank" rel="noopener noreferrer">itsmahibabrar</a></p>
        <p>LinkedIn: <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
      </section>
    </>
  );
}