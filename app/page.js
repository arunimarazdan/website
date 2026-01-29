'use client';
import { useState } from 'react';
import { projects, siteInfo } from './data';

export default function Portfolio() {
  const [selected, setSelected] = useState(null);

  return (
    <main>
      <header style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{siteInfo.name}</h1>
        <p>{siteInfo.role}</p>
      </header>

      <div className="grid-gallery">
        {projects.map((p, i) => (
          <div key={i} className="project-card" onClick={() => setSelected(p)}>
            <img src={p.mainImage} alt="" />
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay">
          <button onClick={() => setSelected(null)} style={{ float: 'right', fontSize: '2rem', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
          <h1>{selected.title}</h1>
          <p style={{ maxWidth: '600px' }}>{selected.description}</p>
          <div style={{ margin: '20px 0' }}>
            {selected.pdfLink && <a href={selected.pdfLink} target="_blank" className="btn">View PDF Portfolio</a>}
            {selected.modelLink && <a href={selected.modelLink} target="_blank" className="btn">View 3D Model</a>}
          </div>
          {selected.gallery.map((img, i) => <img key={i} src={img} style={{ width: '100%', marginBottom: '20px' }} alt="" />)}
        </div>
      )}
    </main>
  );
}
