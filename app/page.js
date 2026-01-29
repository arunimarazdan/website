'use client';
import { useState, useEffect } from 'react';
import { getProjects, siteInfo } from './data';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => { setProjects(data); setLoading(false); });
  }, []);

  // --- CASE STUDY VIEW (Extracted Page) ---
  if (activeProject) {
    return (
      <div className="case-study">
        <nav className="cs-nav">
          <button onClick={() => setActiveProject(null)}>← Close Project</button>
          <span>{activeProject.title}</span>
        </nav>

        <header className="cs-header">
          <h1 className="cs-title">{activeProject.title}</h1>
          <div className="cs-meta-grid">
            <div className="meta-item"><strong>Year</strong>{activeProject.year}</div>
            <div className="meta-item"><strong>Location</strong>{activeProject.location}</div>
            <div className="meta-item"><strong>Typology</strong>{activeProject.type}</div>
            <div className="meta-item"><strong>Scale</strong>{activeProject.area}</div>
          </div>
          <p className="cs-summary">{activeProject.summary}</p>
        </header>

        <section className="cs-gallery">
          <img src={activeProject.mainImage} className="full-img" alt="Main" />
          <div className="gallery-stack">
            {activeProject.gallery.map((img, i) => (
              <img key={i} src={img.trim()} className="full-img" alt={`Detail ${i}`} />
            ))}
          </div>
        </section>

        <style jsx>{`
          .case-study { background: #fdfcfb; min-height: 100vh; padding: 40px 8%; color: #1a1a1a; animation: fadeIn 0.8s ease; }
          .cs-nav { display: flex; justify-content: space-between; text-transform: uppercase; font-size: 10px; letter-spacing: 2px; margin-bottom: 80px; }
          .cs-nav button { background: none; border: none; cursor: pointer; font-weight: 600; }
          .cs-title { font-family: 'Playfair Display', serif; font-size: 5rem; margin-bottom: 40px; font-weight: 400; }
          .cs-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 20px 0; margin-bottom: 40px; }
          .meta-item strong { display: block; font-size: 9px; text-transform: uppercase; color: #999; margin-bottom: 5px; }
          .cs-summary { font-size: 1.2rem; line-height: 1.6; max-width: 800px; margin-bottom: 100px; font-weight: 300; }
          .full-img { width: 100%; margin-bottom: 40px; display: block; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @media (max-width: 768px) { .cs-title { font-size: 2.5rem; } .cs-meta-grid { grid-template-columns: 1fr 1fr; gap: 20px; } }
        `}</style>
      </div>
    );
  }

  // --- MAIN GALLERY VIEW (Hover Teaser) ---
  return (
    <main className="main">
      <header className="hero">
        <div className="hero-top">
          <span className="name">{siteInfo.name}</span>
          <span className="role">{siteInfo.role}</span>
        </div>
        <h1 className="hero-big">Interior <br/> Archive.</h1>
      </header>

      <section className="grid">
        {loading ? <p>Loading...</p> : projects.map((p, i) => (
          <div key={i} className="card" onClick={() => setActiveProject(p)}>
            <img src={p.mainImage} alt={p.title} />
            <div className="hover-overlay">
              <div className="overlay-content">
                <p className="summary-text">{p.summary}</p>
                <div className="card-footer">
                  <h3>{p.title}</h3>
                  <span className="explore-btn">Explore Project →</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;600&display=swap');
        body { background: #fff; color: #1a1a1a; font-family: 'Inter', sans-serif; margin: 0; }
        .main { padding: 40px 5%; }
        .hero { margin-bottom: 100px; }
        .hero-top { display: flex; justify-content: space-between; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 60px; }
        .hero-big { font-family: 'Playfair Display', serif; font-size: clamp(4rem, 15vw, 10rem); line-height: 0.8; margin: 0; font-weight: 400; }
        
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .card { position: relative; aspect-ratio: 4/5; overflow: hidden; cursor: pointer; }
        .card img { width: 100%; height: 100%; object-fit: cover; transition: 0.8s ease; }
        
        .hover-overlay { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(255, 255, 255, 0.95); opacity: 0; transition: 0.4s;
          display: flex; align-items: center; justify-content: center; padding: 40px; text-align: center;
        }
        .card:hover .hover-overlay { opacity: 1; }
        .card:hover img { transform: scale(1.1); }
        
        .summary-text { font-size: 1rem; line-height: 1.5; font-weight: 300; margin-bottom: 40px; }
        .card-footer h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin: 0 0 10px 0; }
        .explore-btn { font-size: 10px; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }

        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
