'use client';
import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [view, setView] = useState('work'); // 'work', 'about', 'contact'
  const [activeProject, setActiveProject] = useState(null);

  // Scroll to top whenever view or active project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, activeProject]);

  const navItems = [
    { label: 'Arunima (About)', id: 'about' },
    { label: 'Projects', id: 'work' },
    { label: 'Contact', id: 'contact' },
    { label: 'Resume', id: 'resume' },
  ];

  const handleNav = (id) => {
    if (id === 'resume') {
      window.open('/resume.pdf', '_blank'); // Assuming you'll add resume.pdf to public folder
      return;
    }
    setActiveProject(null);
    setView(id);
  };

  // --- NAVIGATION COMPONENT ---
  const Navigation = () => (
    <nav className="nav-bar">
      <div className="nav-left" onClick={() => handleNav('work')}>ARUNIMA RAZDAN</div>
      <div className="nav-right">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => handleNav(item.id)}
            className={view === item.id ? 'active' : ''}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );

  // --- PROJECT DETAIL VIEW ---
  if (activeProject) {
    return (
      <div className="page-wrapper">
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
            <p className="main-intro">
              This project studies how an interior atmosphere becomes the primary determinant of an individual’s experience. The use of light and shadow makes the space intimate and emotionally engaging. The speakeasy transforms into a setting where entertainment develops silently via discussion, reflection and shared experiences. Through introspection and shared moments, dialogue naturally develops between individuals as well as the place.
            </p>
          </header>

          <section className="narrative-stack">
            <div className="content-block">
              <h3>Materiality</h3>
              <p>On the Sauchiehall street, there is a mix of stone and slate construction plus modern infill materials.— Red, blonde or grey sandstone with carved stonework.— Slate roofing— Brick — Cast iron/framework— Timber— Reinforced concrete and steel frame seen in some modern structures.— Glass and metal curtain walling and modern claddding system. These materials can be incorporated in the dining space with dark timbered walls, bronze accents and mirrors where the soft amber candle lighting will reflect and create light illusion and warmth.</p>
              <div className="image-placeholder">
                 <img src="/materiality-1.jpg" alt="Materiality Study" />
                 <span>[Fig 01. Materiality Collage]</span>
              </div>
            </div>

            <div className="content-block">
              <h3>In Praise of Shadows</h3>
              <p>Traditional Japanese culture has developed a refined understanding of shadows, dimness, and restraint. Darkness is an essential condition that gives depth and emotional richness to space. Excessive lighting reduces imagination.</p>
              <div className="image-placeholder">
                 <img src="/shadow-sketch.jpg" alt="Shadow Sketch" />
                 <span>[Fig 02. Lighting Study]</span>
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }

  // --- ABOUT VIEW ---
  if (view === 'about') {
    return (
      <div className="page-wrapper">
        <Navigation />
        <section className="about-content">
          <h1 className="serif-xl">About</h1>
          <div className="about-text">
            <p>Arunima Razdan is an architect and interior designer whose work explores the relationship between space, atmosphere, and human experience. Her design approach is rooted in the belief that architecture is not only seen, but felt through light, shadow, material, sound, and movement.</p>
            <p>With an academic foundation shaped in India and advanced study at the Glasgow School of Art, Arunima’s work reflects a dialogue between structure and sensory perception. She is particularly interested in how restraint, dimness, and gradual revelation can shape intimacy, memory, and emotional connection within interior spaces.</p>
            <p>Her projects often investigate everyday typologies such as streets, bars, and social interiors, reinterpreting them through research, observation, and theoretical frameworks drawn from thinkers such as Jun’ichirō Tanizaki and Juhani Pallasmaa. Rather than focusing on spectacle, her work prioritizes atmosphere, stillness, and the quiet moments that encourage reflection and conversation.</p>
            <p>Arunima’s practice bridges analytical research with experiential design, creating spaces that invite people to pause, engage, and form meaningful relationships with their surroundings.</p>
          </div>
        </section>
      </div>
    );
  }

  // --- CONTACT VIEW ---
  if (view === 'contact') {
    return (
      <div className="page-wrapper">
        <Navigation />
        <section className="contact-content">
          <h1 className="serif-xl">Contact</h1>
          <p>For collaborations or inquiries, please reach out via email.</p>
          <a href="mailto:ar.arunimarazdan@gmail.com" className="email-link">ar.arunimarazdan@gmail.com</a>
        </section>
      </div>
    );
  }

  // --- WORK VIEW (Default) ---
  return (
    <div className="page-wrapper">
      <Navigation />
      <main className="work-grid">
        <div className="project-card" onClick={() => setActiveProject(true)}>
          <div className="card-front">
             <span className="serif-md">Speakeasy Bar</span>
             <p className="card-loc">Glasgow // 2025</p>
          </div>
          <div className="card-hover">
            <p className="hover-summary">
              This project is located on Sauchiehall Street, a historic road in Glasgow. The Light, Shadow, and Reflection will be my main tools, utilising dim lighting, layered materials, and mirrors to slowly reveal spaces, encouraging movement and curiosity...
            </p>
            <span className="cta">VIEW PROJECT →</span>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500&display=swap');
        
        :root { --bg: #fdfaf5; --text: #1a1a1a; --accent: #9a8c73; }
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; }
        
        .page-wrapper { padding: 0 6%; }
        
        /* Nav Bar */
        .nav-bar { display: flex; justify-content: space-between; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(0,0,0,0.05); position: sticky; top: 0; background: var(--bg); z-index: 100; }
        .nav-left { font-weight: 500; letter-spacing: 2px; cursor: pointer; font-size: 13px; }
        .nav-right button { background: none; border: none; margin-left: 30px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; opacity: 0.5; transition: 0.3s; }
        .nav-right button:hover, .nav-right button.active { opacity: 1; }

        /* Typography */
        .serif-xl { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 10vw, 8rem); font-weight: 400; margin: 60px 0; line-height: 1; }
        .serif-md { font-family: 'Playfair Display', serif; font-size: 2.5rem; }

        /* Work Grid */
        .work-grid { padding: 100px 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 40px; }
        .project-card { height: 550px; background: #f0ebe3; position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .card-front { text-align: center; transition: 0.5s ease; }
        .card-loc { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin-top: 15px; opacity: 0.4; }
        
        .card-hover { position: absolute; inset: 0; background: var(--text); color: #fff; padding: 60px; display: flex; flex-direction: column; justify-content: center; opacity: 0; transition: 0.4s ease; transform: translateY(10px); }
        .project-card:hover .card-hover { opacity: 1; transform: translateY(0); }
        .hover-summary { font-size: 1.1rem; line-height: 1.6; font-weight: 300; margin-bottom: 40px; }
        .cta { font-size: 10px; letter-spacing: 2px; font-weight: 600; border-bottom: 1px solid #fff; padding-bottom: 5px; align-self: flex-start; }

        /* Project Detail */
        .project-header { max-width: 900px; margin-bottom: 100px; }
        .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 30px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 30px 0; margin-bottom: 50px; }
        .meta-item span { display: block; font-size: 9px; text-transform: uppercase; color: #999; margin-bottom: 5px; }
        .meta-item { font-size: 14px; }
        .main-intro { font-size: 1.6rem; line-height: 1.5; font-weight: 300; color: #444; }

        .content-block { max-width: 800px; margin: 0 auto 150px auto; }
        .content-block h3 { text-transform: uppercase; font-size: 12px; letter-spacing: 2px; margin-bottom: 30px; border-left: 2px solid var(--accent); padding-left: 15px; }
        .content-block p { font-size: 1.2rem; line-height: 1.8; margin-bottom: 60px; font-weight: 300; }
        .image-placeholder { width: 100%; margin-bottom: 40px; }
        .image-placeholder img { width: 100%; height: auto; background: #eee; min-height: 400px; display: block; }
        .image-placeholder span { font-size: 10px; color: #999; margin-top: 15px; display: block; text-align: center; }

        /* About & Contact */
        .about-text { max-width: 800px; }
        .about-text p { font-size: 1.3rem; line-height: 1.7; margin-bottom: 30px; font-weight: 300; }
        .contact-content { text-align: center; padding: 100px 0; }
        .email-link { font-size: 2rem; color: var(--accent); text-decoration: none; border-bottom: 2px solid var(--accent); }

        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr; }
          .serif-xl { font-size: 3.5rem; }
          .meta-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
