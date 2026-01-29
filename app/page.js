'use client';
import { useState } from 'react';

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);

  // This is your "Between Conversations" data directly in the code
  const projectData = {
    title: "Between Conversations",
    category: "Hospitality // Speakeasy",
    location: "Sauchiehall Street, Glasgow",
    year: "2025",
    intro: "The final proposal creates an interior space that invites people to pause, engage in conversations, and feel connected to the surroundings using light, shadow, and reflection as primary tools.",
    sections: [
      {
        heading: "Materiality & Site Mapping",
        text: "On Sauchiehall street, there is a mix of stone and slate construction. These materials are incorporated into the dining space with dark timbered walls, bronze accents, and mirrors where soft amber candle lighting creates light illusions.",
        images: ["/map.jpg", "/material-study.jpg"] // Place these in your 'public' folder
      },
      {
        heading: "In Praise of Shadows",
        text: "Inspired by Jun’ichirō Tanizaki, the project treats darkness as an essential condition that gives depth and emotional richness. Beauty is revealed gradually through restraint rather than clarity.",
        images: ["/shadow-sketch.jpg", "/interior-render.jpg"]
      },
      {
        heading: "The Architecture of Image",
        text: "Based on Juhani Pallasmaa’s theory, architecture is a mental phenomenon. The space uses sequence and movement to heighten sensory awareness, allowing the space to dissolve into atmosphere.",
        images: ["/corridor.jpg", "/spatial-memory.jpg"]
      }
    ]
  };

  if (activeProject) {
    return (
      <div className="detail-view">
        <button className="close-btn" onClick={() => setActiveProject(null)}>CLOSE ×</button>
        
        <header className="project-hero">
          <span className="label">{projectData.category}</span>
          <h1 className="serif">{projectData.title}</h1>
          <div className="meta-grid">
            <div><strong>Location</strong><p>{projectData.location}</p></div>
            <div><strong>Year</strong><p>{projectData.year}</p></div>
          </div>
        </header>

        <section className="narrative-section">
          <p className="large-intro">{projectData.intro}</p>
          
          {projectData.sections.map((section, idx) => (
            <div key={idx} className="content-block">
              <div className="text-col">
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
              </div>
              <div className="image-col">
                {section.images.map((img, i) => (
                  <div key={i} className="img-container">
                    {/* This is where your PDF screenshots will appear */}
                    <div className="placeholder-box">Image from PDF: {img}</div>
                    <img src={img} alt="Project detail" onError={(e) => e.target.style.display='none'}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <footer className="conclusion">
          <h3 className="serif">Conclusion</h3>
          <p>The speakeasy transforms into a setting where entertainment develops silently via discussion, reflection and shared experiences.</p>
        </footer>

        <style jsx>{`
          .detail-view { background: #fdfcfb; color: #1a1a1a; padding: 60px 10%; min-height: 100vh; font-family: 'Inter', sans-serif; }
          .close-btn { background: none; border: none; cursor: pointer; letter-spacing: 2px; font-size: 10px; margin-bottom: 40px; }
          .serif { font-family: 'Playfair Display', serif; font-weight: 400; }
          .project-hero { margin-bottom: 80px; }
          .project-hero h1 { font-size: clamp(3rem, 8vw, 6rem); margin: 10px 0; }
          .label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #888; }
          .meta-grid { display: flex; gap: 40px; border-top: 1px solid #eee; padding-top: 20px; }
          .meta-grid strong { font-size: 9px; text-transform: uppercase; display: block; color: #999; }
          
          .large-intro { font-size: 1.8rem; line-height: 1.4; margin-bottom: 100px; font-weight: 300; border-left: 3px solid #1a1a1a; padding-left: 30px; }
          
          .content-block { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 120px; align-items: start; }
          .text-col h3 { font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
          .text-col p { line-height: 1.8; opacity: 0.8; font-size: 1.1rem; }
          
          .placeholder-box { width: 100%; height: 300px; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #999; margin-bottom: 10px; }
          .img-container img { width: 100%; height: auto; margin-bottom: 20px; }

          .conclusion { text-align: center; padding: 100px 0; border-top: 1px solid #eee; }
          .conclusion h3 { font-size: 2.5rem; }

          @media (max-width: 900px) { .content-block { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    );
  }

  return (
    <main className="home">
      <nav className="nav">
        <span>Arunima Razdan</span>
        <div className="nav-right">
          <a href="#">About</a>
          <a href="#">Work</a>
        </div>
      </nav>

      <header className="hero">
        <h1 className="serif">Architectural Foundations <br/> & Human-Centered Interiors.</h1>
        <p className="bio">Bridging structure and soul: shaping sensory environments through light and cultural narrative.</p>
      </header>

      <section className="grid">
        <div className="card" onClick={() => setActiveProject(true)}>
          <div className="card-visual">
            <span className="serif">Between Conversations</span>
          </div>
          <div className="overlay">
            <p>Explore the Speakeasy Narrative →</p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Inter:wght@300;400&display=swap');
        body { background: #fdfcfb; margin: 0; }
        .home { padding: 40px 8%; }
        .nav { display: flex; justify-content: space-between; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 100px; }
        .nav-right a { margin-left: 30px; text-decoration: none; color: inherit; }
        .hero { max-width: 900px; margin-bottom: 100px; }
        .serif { font-family: 'Playfair Display', serif; }
        .hero h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 400; line-height: 1.1; }
        .bio { font-size: 1.2rem; margin-top: 30px; opacity: 0.6; max-width: 500px; }
        
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { height: 500px; background: #f0ebe3; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; }
        .card-visual { font-size: 2rem; }
        .overlay { position: absolute; inset: 0; background: #1a1a1a; color: white; display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.4s; }
        .card:hover .overlay { opacity: 1; }
      `}</style>
    </main>
  );
}
