'use client';
import { useEffect, useState } from "react";
import { getProjects, siteInfo } from "./data";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{siteInfo.name}</h1>
        <p style={{ opacity: 0.7 }}>{siteInfo.role}</p>
      </header>

      {loading ? <p>Loading projects...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {projects.map((p, i) => (
            <div key={i} onClick={() => setSelected(p)} style={{ cursor: 'pointer', border: '1px solid #eee', padding: '20px' }}>
              <img src={p.mainImage} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="" />
              <h3>{p.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{p.description?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'white', padding: '40px', overflowY: 'auto', zIndex: 100 }}>
          <button onClick={() => setSelected(null)} style={{ float: 'right', fontSize: '2rem', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
          <h1>{selected.title}</h1>
          <p>{selected.description}</p>
          <div style={{ margin: '30px 0', display: 'flex', gap: '20px' }}>
            {selected.pdfLink && <a href={selected.pdfLink} target="_blank" style={{ padding: '10px 20px', background: 'black', color: 'white', textDecoration: 'none' }}>View PDF</a>}
            {selected.modelLink && <a href={selected.modelLink} target="_blank" style={{ padding: '10px 20px', border: '1px solid black', color: 'black', textDecoration: 'none' }}>View 3D Model</a>}
          </div>
        </div>
      )}
    </main>
  );
}
