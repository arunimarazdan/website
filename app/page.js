'use client';
import { useState, useEffect } from 'react';
import { getProjects, siteInfo } from './data';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null); // Controls the internal PDF viewer
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => { setProjects(data); setLoading(false); });
  }, []);

  return (
    <main className="portfolio">
      {/* NAVIGATION */}
      <nav className="nav">
        <div className="logo">{siteInfo.name}</div>
        <div className="nav-links">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <h1 className="hero-title">Architectural <br/> Portfolio // 2025</h1>
      </header>

      {/* ABOUT ME SECTION */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <h2 className="label">01 / Profile</h2>
          <div className="about-text">
            <p><strong>Arunima Razdan</strong> is an Architect and Interior Designer bridging structural rigor with sensory design.</p>
            <p>From India to the Glasgow School of Art, her journey explores the harmony between exterior structure and interior emotion.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section">
        <h2 className="label">02 / Selected Works</h2>
        <div className="project-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card" onClick={() => setSelectedPdf(p.pdfLink)}>
              <div className="img-holder">
                <img src={p.mainImage} alt={p.title} />
                <div className="img-overlay"><span>View Project PDF</span></div>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <h2 className="label">03 / Connection</h2>
        <div className="contact-content">
          <p>For collaborations and inquiries:</p>
          <a href={`mailto:${siteInfo.email}`} className="email-link">{siteInfo.email}</a>
        </div>
      </section>

      {/* INTERNAL PDF VIEWER (MODAL) */}
      {selectedPdf && (
        <div className="pdf-modal">
          <button className="close-btn" onClick={() => setSelectedPdf(null)}>✕ Close</button>
          <div className="pdf-container">
            <iframe src={selectedPdf} width="100%" height="100%" allow="autoplay"></iframe>
          </div>
        </div>
      )}

      {/* STYLING - THE PREMIUM LOOK */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        :root { --bg: #f2eee8; --text: #1a1a1a; }
        
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; }
        .portfolio { padding: 0 5%; max-width: 1400px; margin: 0 auto; }

        .nav { display: flex; justify-content: space-between; padding: 40px 0; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; }
        .nav-links a { margin-left: 20px; text-decoration: none; color: inherit; opacity: 0.6; }

        .hero { height: 60vh; display: flex; align-items: flex-end; padding-bottom: 50px; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 10vw, 6rem); line-height: 0.9; margin: 0; }

        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px; margin-bottom: 40px; }

        .about-grid { display: grid; grid-template-columns: 1fr 2fr; margin: 100px 0; }
        .about-text { font-size: 1.5rem; font-weight: 300; line-height: 1.4; max-width: 700px; }

        .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .project-card { cursor: pointer; }
        .img-holder { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #ddd; margin-bottom: 15px; }
        .img-holder img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .img-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4); color: white; display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; text-transform: uppercase; font-size: 12px; }
        .project-card:hover .img-overlay { opacity: 1; }
        .project-card:hover img { transform: scale(1.05); }

        .contact-section { margin: 150px 0; }
        .email-link { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--text); text-decoration: none; border-bottom: 1px solid var(--text); }

        /* THE INTERNAL PDF VIEWER STYLES */
        .pdf-modal { position: fixed; top:0; left:0; width: 100vw; height: 100vh; background: white; z-index: 1000; display: flex; flex-direction: column; }
        .close-btn { background: black; color: white; border: none; padding: 15px; cursor: pointer; font-weight: bold; }
        .pdf-container { flex-grow: 1; }

        @media (max-width: 768px) { .about-grid, .project-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
