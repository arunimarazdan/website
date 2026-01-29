'use client';
import { useEffect, useState } from 'react';
import { getProjects } from './data';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  if (active) {
    return (
      <div className="case">
        <button className="back" onClick={() => setActive(null)}>← Back</button>

        <h1>{active.title}</h1>
        <p className="summary">{active.summary}</p>

        <div className="images">
          {active.gallery.map((src, i) => (
            <img key={i} src={src} alt={`page-${i}`} />
          ))}
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <main>
      <header>
        <h1>Arunima Razdan</h1>
        <p>Architect & Interior Designer</p>
      </header>

      <section className="grid">
        {projects.map(p => (
          <div key={p.id} className="card" onClick={() => setActive(p)}>
            <img src={p.heroImage} />
            <div className="overlay">
              <p>{p.summary}</p>
              <span>Explore</span>
            </div>
          </div>
        ))}
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
main {
  padding: 60px;
  background: #f6f1ea;
  color: #1a1a1a;
}

header {
  margin-bottom: 80px;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 12px;
}

.card {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
  color: white;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  transition: opacity 0.3s;
}

.card:hover .overlay {
  opacity: 1;
}

.case {
  padding: 80px;
  background: #f6f1ea;
}

.case h1 {
  font-size: 3.5rem;
}

.summary {
  max-width: 700px;
  font-size: 1.2rem;
  margin-bottom: 60px;
}

.images img {
  width: 100%;
  margin-bottom: 60px;
}

.back {
  background: none;
  border: none;
  margin-bottom: 40px;
  cursor: pointer;
}
`;
