'use client';
import { useState } from 'react';

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);

  const scrollToSection = (id) => {
    if (activeProject) setActiveProject(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const Navigation = () => (
    <nav className="nav-bar">
      <div className="nav-left" onClick={() => scrollToSection('hero')}>ARUNIMA RAZDAN</div>
      <div className="nav-right">
        <button onClick={() => scrollToSection('about')}>Arunima (About)</button>
        <button onClick={() => scrollToSection('work')}>Projects</button>
        <button onClick={() => scrollToSection('contact')}>Contact</button>
        <button onClick={() => window.open('/resume.pdf', '_blank')}>Resume</button>
      </div>
    </nav>
  );

  if (activeProject) {
    return (
      <div className="page-wrapper animate-in">
        <Navigation />
        <article className="project-detail">
          <header className="project-header">
            <h1 className="serif-xl">Speakeasy Bar</h1>
            <div className="meta-grid">
              <div className="meta-item"><span>Year</span>2025</div>
              <div className="meta-item"><span>Type</span>Bar</div>
              <div className="meta-item"><span>Area</span>250 sqm</div>
              <div className="meta-item"><span>Location</span>Sauchiehall Street, Glasgow</div>
              <div className="meta-item"><span>Client</span>The Glasgow School of Arts</div>
            </div>
            <p className="main-intro">This project studies how an interior atmosphere becomes the primary determinant of an individual’s experience. The use of light and shadow makes the space intimate and emotionally engaging. The speakeasy transforms into a setting where entertainment develops silently via discussion, reflection and shared experiences. Through introspection and shared moments, dialogue naturally develops between individuals as well as the place.</p>
          </header>

          <section className="narrative-stack">
            <div className="content-block">
              <h3>Materiality</h3>
              <p>On the Sauchiehall street, there is a mix of stone and slate construction plus modern infill materials.— Red, blonde or grey sandstone with carved stonework.— Slate roofing— Brick — Cast iron/framework— Timber— Reinforced concrete and steel frame seen in some modern structures.— Glass and metal curtain walling and modern claddding system. These materials can be incorporated in the dining space with dark timbered walls, bronze accents and mirrors where the soft amber candle lighting will reflect and create light illusion and warmth.</p>
              <div className="image-stack">
                 <img src="/materiality-1.jpg" alt="Materiality" />
                 <p className="caption">[Fig 01. Materiality Collage]</p>
              </div>
            </div>
          </section>
          
          <button className="back-btn" onClick={() => { setActiveProject(null); window.scrollTo(0,0); }}>CLOSE PROJECT</button>
        </article>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navigation />

      <section id="hero" className="hero-section">
        <h1 className="serif-xl">Atmosphere, <br/>Intimacy & Space.</h1>
      </section>

      <section id="about" className="section">
        <h2 className="label">01 / About</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>Arunima Razdan is an architect and interior designer whose work explores the relationship between space, atmosphere, and human experience. Her design approach is rooted in the belief that architecture is not only seen, but felt through light, shadow, material, sound, and movement.</p>
            <p>With an academic foundation shaped in India and advanced study at the Glasgow School of Art, Arunima’s work reflects a dialogue between structure and sensory perception.</p>
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <h2 className="label">02 / Selected Works</h2>
        <div className="work-grid">
          <div className="project-card" onClick={() => { setActiveProject(true); window.scrollTo(0,0); }}>
            <div className="card-content">
               <span className="serif-md">Speakeasy Bar</span>
               <p>Glasgow // 2025</p>
            </div>
            <div className="card-hover">
              <p>This project is located on Sauchiehall Street, a historic road in Glasgow. The Light, Shadow, and Reflection will be my main tools, utilising dim lighting, layered materials, and mirrors to slowly reveal spaces, encouraging movement and curiosity.</p>
              <span className="view-cta">EXPLORE NARRATIVE →</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <h2 className="label">03 / Contact</h2>
        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="serif-md">Let's build a <br/>conversation.</h2>
            <div className="social-links">
              <a href="mailto:ar.arunimarazdan@gmail.com" className="line-link">ar.arunimarazdan@gmail.com</a>
              <a href="https://linkedin.com/in/arunimarazdan" target="_blank" className="line-link">LinkedIn Profile</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email Address" required />
            <textarea placeholder="Write your message here..." rows="4" required></textarea>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&family=Inter:wght@300;400;500&display=swap');
        
        :root { --bg: #fdfaf5; --text: #1a1a1a; --accent: #9a8c73; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; -webkit-font-smoothing: antialiased; }
        
        .page-wrapper { padding: 0 6%; max-width: 1600px; margin: 0 auto; }
        
        /* Nav */
        .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 40px 0; position: sticky; top: 0; background: var(--bg); z-index: 100; border-bottom: 1px solid rgba(0,0,0,0.03); }
        .nav-left { font-weight: 500; letter-spacing: 2px; cursor: pointer; font-size: 13px; }
        .nav-right button { background: none; border: none; margin-left: 35px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; cursor: pointer; opacity: 0.4; transition: 0.3s; }
        .nav-right button:hover { opacity: 1; color: var(--accent); }

        /* Sections */
        .section { padding: 140px 0; border-top: 1px solid rgba(0,0,0,0.06); }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: var(--accent); margin-bottom: 60px; }
        
        .hero-section { min-height: 80vh; display: flex; align-items: center; }
        .serif-xl { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 9vw, 8rem); font-weight: 400; line-height: 1.1; margin: 0; letter-spacing: -1px; }
        .serif-md { font-family: 'Playfair Display', serif; font-size: 3.5rem; line-height: 1.2; margin-bottom: 40px; }

        .about-text { max-width: 850px; }
        .about-text p { font-size: 1.4rem; line-height: 1.7; margin-bottom: 30px; font-weight: 300; color: #333; }

        /* Work */
        .work-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); gap: 50px; }
        .project-card { height: 600px; background: #f4f0e9; position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .card-content { text-align: center; }
        .card-content p { font-size: 10px; letter-spacing: 3px; opacity: 0.4; margin-top: 15px; text-transform: uppercase; }
        .card-hover { position: absolute; inset: 0; background: #111; color: white; padding: 60px; display: flex; flex-direction: column; justify-content: center; opacity: 0; transition: 0.5s ease; }
        .project-card:hover .card-hover { opacity: 1; }
        .card-hover p { font-size: 1.1rem; line-height: 1.6; font-weight: 300; margin-bottom: 40px; }
        .view-cta { font-size: 11px; letter-spacing: 2px; border-bottom: 1px solid #fff; padding-bottom: 5px; align-self: flex-start; }

        /* Contact Section */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .social-links { display: flex; flex-direction: column; gap: 20px; }
        .line-link { font-size: 1.2rem; color: var(--text); text-decoration: none; border-bottom: 1px solid rgba(0,0,0,0.1); width: fit-content; padding-bottom: 4px; transition: 0.3s; }
        .line-link:hover { border-color: var(--text); color: var(--accent); }

        .contact-form { display: flex; flex-direction: column; gap: 40px; }
        .contact-form input, .contact-form textarea { background: none; border: none; border-bottom: 1px solid #ddd; padding: 15px 0; font-family: inherit; font-size: 1rem; outline: none; transition: 0.3s; }
        .contact-form input:focus, .contact-form textarea:focus { border-color: var(--text); }
        .contact-form button { background: var(--text); color: white; border: none; padding: 22px; font-size: 10px; letter-spacing: 3px; cursor: pointer; transition: 0.4s; }
        .contact-form button:hover { background: var(--accent); }

        /* Project Detail */
        .project-header { margin: 100px 0; max-width: 1000px; }
        .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 40px 0; margin: 60px 0; }
        .meta-item span { display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
        .main-intro { font-size: 1.8rem; line-height: 1.5; font-weight: 300; color: #222; }
        .content-block { margin: 150px 0; max-width: 900px; }
        .content-block h3 { text-transform: uppercase; font-size: 11px; letter-spacing: 3px; margin-bottom: 40px; color: var(--accent); }
        .content-block p { font-size: 1.3rem; line-height: 1.8; font-weight: 300; margin-bottom: 60px; }
        .image-stack img { width: 100%; height: auto; margin-bottom: 20px; }
        .caption { font-size: 10px; color: #999; text-align: center; letter-spacing: 1px; }
        .back-btn { background: var(--text); color: white; border: none; padding: 25px 50px; font-size: 10px; letter-spacing: 3px; cursor: pointer; margin-bottom: 100px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 1s ease forwards; }

        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; gap: 80px; }
          .serif-xl { font-size: 4rem; }
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
