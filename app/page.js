'use client';
import { useState, useEffect } from 'react';
import { getProjects, siteInfo } from './data';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <main style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: '100px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>{siteInfo.name}</h1>
        <p style={{ opacity: 0.5, fontSize: '1.1rem', marginTop: '10px' }}>{siteInfo.role}</p>
      </header>

      <div style={{ display: 'grid', gap: '60px' }}>
        {projects.length > 0 ? projects.map((p, i) => (
          <article key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{p.title}</h2>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '25px' }}>{p.description}</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {p.pdfLink && <a href={p.pdfLink} target="_blank" className="btn">View Portfolio PDF</a>}
              {p.modelLink && <a href={p.modelLink} target="_blank" className="btn">Open 3D Model</a>}
            </div>
          </article>
        )) : <p>Loading projects from Google Sheets...</p>}
      </div>

      <style jsx>{`
        .btn {
          text-decoration: none;
          color: white;
          background: black;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.2s;
        }
        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }
      `}</style>
    </main>
  );
}
