// app/page.js
"use client";

import { useMemo, useState } from "react";
import { siteInfo, projects } from "./data";

export default function Page() {
  const [activeId, setActiveId] = useState(null);
  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) || null,
    [activeId]
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // --------- CASE STUDY (deep dive) ----------
  if (activeProject) {
    return (
      <div className="caseWrap">
        <header className="topbar">
          <button className="backBtn" onClick={() => setActiveId(null)}>
            ← Back
          </button>
          <div className="topbarRight">
            <span className="chip">{activeProject.category}</span>
            <span className="chip">{activeProject.type}</span>
          </div>
        </header>

        <section className="caseHeader">
          <div className="caseTitle">
            <h1>{activeProject.title}</h1>
            <p className="caseIntro">{activeProject.caseStudy.intro}</p>
          </div>

          <div className="meta">
            <div className="row">
              <span className="k">Year</span>
              <span className="v">{activeProject.year}</span>
            </div>
            <div className="row">
              <span className="k">Location</span>
              <span className="v">{activeProject.location}</span>
            </div>
            <div className="row">
              <span className="k">Type</span>
              <span className="v">{activeProject.type}</span>
            </div>
            <div className="row">
              <span className="k">Area</span>
              <span className="v">{activeProject.area}</span>
            </div>
            <div className="row">
              <span className="k">Client</span>
              <span className="v">{activeProject.client}</span>
            </div>
          </div>
        </section>

        <section className="hero">
          <img src={activeProject.heroImage} alt={`${activeProject.title} hero`} />
          <div className="cap">01 // Project cover</div>
        </section>

        <section className="caseBody">
          {activeProject.caseStudy.sections.map((sec, i) => (
            <div key={i} className="block">
              <div className="blockText">
                <h2>{sec.heading}</h2>
                <p>{sec.body}</p>
              </div>
              <div className="blockImgs">
                {sec.images.map((im, idx) => (
                  <figure key={idx} className="fig">
                    <img src={im.src} alt={im.caption || sec.heading} />
                    {im.caption ? <figcaption>{im.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </div>
          ))}

          <div className="conclusion">
            <h2>Conclusion</h2>
            <p>{activeProject.caseStudy.conclusion}</p>
          </div>
        </section>

        <footer className="caseFooter">
          <button
            className="primary"
            onClick={() => {
              setActiveId(null);
              setTimeout(() => scrollTo("projects"), 60);
            }}
          >
            Back to Projects
          </button>
        </footer>

        <style jsx global>{baseStyles}</style>
        <style jsx>{caseStyles}</style>
      </div>
    );
  }

  // --------- SINGLE PAGE (About/Projects/Contact) ----------
  return (
    <main className="page">
      <style jsx global>{baseStyles}</style>

      <nav className="nav">
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {siteInfo.name}
        </div>

        <div className="navLinks">
          <button onClick={() => scrollTo("about")}>Arunima (About)</button>
          <button onClick={() => scrollTo("projects")}>Projects</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
          <a href={siteInfo.resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </nav>

      <section className="heroTop" id="top">
        <h1 className="bigName">{siteInfo.name}</h1>
        <p className="role">{siteInfo.role}</p>
      </section>

      <section className="about" id="about">
        <h2 className="sectionTitle">About</h2>
        <div className="aboutGrid">
          <div className="aboutText">
            {siteInfo.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="aboutCard">
            <div className="aboutCardInner">
              <div className="label">Focus</div>
              <div className="val">Atmosphere, Light, Shadow, Material, Memory</div>

              <div className="spacer" />

              <div className="label">Approach</div>
              <div className="val">Research-led, sensory interiors, gradual revelation</div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <h2 className="sectionTitle">Selected Projects</h2>

        <div className="grid">
          {projects.map((p) => (
            <article key={p.id} className="card" onClick={() => setActiveId(p.id)}>
              <img className="thumb" src={p.heroImage} alt={p.title} />
              <div className="overlay">
                <div className="overlayInner">
                  <p className="teaser">{p.teaserSummary}</p>
                  <div className="line" />
                  <div className="title">{p.title}</div>
                  <div className="sub">{p.subtitle}</div>
                  <div className="cta">View Project →</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="sectionTitle">Contact</h2>

        <div className="contactGrid">
          <div className="contactLeft">
            <p className="contactLead">
              For collaborations, studio opportunities, or inquiries, please reach out.
            </p>

            <div className="contactLinks">
              <a href={`mailto:${siteInfo.contact.email}`}>{siteInfo.contact.email}</a>
              <a href={siteInfo.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <form
            className="contactForm"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = form.name.value || "";
              const email = form.email.value || "";
              const msg = form.message.value || "";
              const subject = encodeURIComponent(`Portfolio message from ${name}`.trim());
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
              window.location.href = `mailto:${siteInfo.contact.email}?subject=${subject}&body=${body}`;
            }}
          >
            <label>
              Your name
              <input name="name" placeholder="Name" />
            </label>

            <label>
              Your email
              <input name="email" type="email" placeholder="Email" required />
            </label>

            <label>
              Message
              <textarea name="message" placeholder="Write your message..." rows={6} required />
            </label>

            <button className="primary" type="submit">
              Message me
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div>{siteInfo.name}</div>
        <div className="muted">© {new Date().getFullYear()}</div>
      </footer>
    </main>
  );
}

const baseStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap');

:root{
  --bg: #f6f1ea;
  --ink: #151515;
  --muted: rgba(21,21,21,0.60);
  --hair: rgba(21,21,21,0.10);
  --card: rgba(255,255,255,0.55);
}

*{ box-sizing: border-box; }
html, body{ margin:0; padding:0; background: var(--bg); color: var(--ink); }
body{ font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
a{ color: inherit; text-decoration: none; }
button{ font: inherit; }

.page{
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 26px 60px;
}

.nav{
  position: sticky;
  top: 0;
  z-index: 20;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding: 18px 0 18px;
  background: linear-gradient(to bottom, var(--bg) 75%, rgba(246,241,234,0));
  border-bottom: 1px solid var(--hair);
}

.brand{
  letter-spacing: 0.22em;
  font-size: 0.85rem;
  text-transform: uppercase;
  cursor: pointer;
}

.navLinks{
  display:flex;
  gap: 22px;
  align-items:center;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.navLinks button{
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.65;
}
.navLinks a{
  opacity: 0.65;
}
.navLinks button:hover, .navLinks a:hover{
  opacity: 1;
}

.heroTop{
  padding: 72px 0 34px;
}

.bigName{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  font-size: 3.6rem;
  letter-spacing: -0.02em;
  margin: 0;
}

.role{
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.sectionTitle{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  font-size: 1.8rem;
  margin: 0 0 18px;
}

.about{ padding: 34px 0 30px; }
.aboutGrid{
  display:grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 34px;
  align-items: start;
}

.aboutText p{
  margin: 0 0 14px;
  line-height: 1.85;
  color: rgba(21,21,21,0.82);
}

.aboutCard{
  background: var(--card);
  border: 1px solid var(--hair);
  border-radius: 18px;
  padding: 22px;
}

.aboutCardInner{
  border-radius: 14px;
  padding: 14px;
  border: 1px solid rgba(21,21,21,0.08);
}

.label{
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
}

.val{
  margin-top: 8px;
  line-height: 1.7;
  opacity: 0.85;
}

.spacer{ height: 18px; }

.projects{ padding: 34px 0 30px; }

.grid{
  display:grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.card{
  position: relative;
  border-radius: 16px;
  overflow:hidden;
  cursor: pointer;
  border: 1px solid rgba(21,21,21,0.10);
  background: rgba(0,0,0,0.05);
  min-height: 520px;
}

.thumb{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
  transform: scale(1.02);
  transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.overlay{
  position:absolute;
  inset:0;
  background: rgba(15,15,15,0.86);
  opacity:0;
  transition: opacity 260ms ease;
  display:flex;
  align-items:flex-end;
  padding: 26px;
}

.overlayInner{
  max-width: 420px;
}

.teaser{
  margin:0 0 16px;
  font-size: 1.02rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.88);
}

.line{
  width: 56px;
  height: 1px;
  background: rgba(255,255,255,0.22);
  margin: 18px 0;
}

.title{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  font-size: 2rem;
  color: white;
}

.sub{
  margin-top: 8px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.75;
  color: white;
}

.cta{
  margin-top: 18px;
  display:inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: white;
  border-bottom: 1px solid rgba(255,255,255,0.35);
  padding-bottom: 6px;
}

.card:hover .overlay{ opacity:1; }
.card:hover .thumb{ transform: scale(1.06); }

.contact{ padding: 34px 0 10px; }
.contactGrid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  align-items:start;
}

.contactLead{
  margin:0 0 16px;
  color: rgba(21,21,21,0.82);
  line-height: 1.8;
}

.contactLinks{
  display:flex;
  flex-direction: column;
  gap: 10px;
}

.contactLinks a{
  opacity: 0.75;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.contactLinks a:hover{ opacity: 1; }

.contactForm{
  background: var(--card);
  border: 1px solid var(--hair);
  border-radius: 18px;
  padding: 18px;
  display:flex;
  flex-direction: column;
  gap: 12px;
}

.contactForm label{
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.65;
  display:flex;
  flex-direction: column;
  gap: 8px;
}

.contactForm input, .contactForm textarea{
  border-radius: 12px;
  border: 1px solid rgba(21,21,21,0.12);
  padding: 12px 12px;
  background: rgba(255,255,255,0.65);
  outline: none;
  font-size: 0.95rem;
}

.primary{
  margin-top: 6px;
  border-radius: 999px;
  border: 1px solid rgba(21,21,21,0.18);
  background: rgba(21,21,21,0.92);
  color: white;
  padding: 12px 16px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
  cursor: pointer;
}

.primary:hover{ background: rgba(21,21,21,1); }

.footer{
  margin-top: 48px;
  padding-top: 18px;
  border-top: 1px solid var(--hair);
  display:flex;
  justify-content: space-between;
  align-items:center;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.muted{ opacity: 0.55; }

@media (max-width: 900px){
  .grid{ grid-template-columns: 1fr; }
  .aboutGrid{ grid-template-columns: 1fr; }
  .contactGrid{ grid-template-columns: 1fr; }
  .card{ min-height: 460px; }
  .bigName{ font-size: 2.8rem; }
}
`;

const caseStyles = `
.caseWrap{
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 26px 60px;
}

.topbar{
  position: sticky;
  top: 0;
  z-index: 30;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 18px 0;
  background: linear-gradient(to bottom, var(--bg) 75%, rgba(246,241,234,0));
  border-bottom: 1px solid var(--hair);
}

.backBtn{
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.75;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-size: 0.78rem;
}
.backBtn:hover{ opacity: 1; }

.topbarRight{
  display:flex;
  gap: 10px;
}

.chip{
  border: 1px solid rgba(21,21,21,0.16);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
}

.caseHeader{
  display:grid;
  grid-template-columns: 1.5fr 0.9fr;
  gap: 34px;
  padding: 34px 0 10px;
}

.caseTitle h1{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  font-size: 3rem;
  margin: 0 0 12px;
}

.caseIntro{
  margin: 0;
  line-height: 1.9;
  color: rgba(21,21,21,0.82);
}

.meta{
  border: 1px solid rgba(21,21,21,0.10);
  border-radius: 18px;
  background: rgba(255,255,255,0.45);
  padding: 16px;
  align-self: start;
}

.row{
  display:flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(21,21,21,0.06);
}
.row:last-child{ border-bottom:none; }

.k{
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
}
.v{
  font-family: "Playfair Display", serif;
  font-size: 1.05rem;
  opacity: 0.90;
  text-align: right;
}

.hero{
  margin-top: 18px;
  border-radius: 18px;
  overflow:hidden;
  border: 1px solid rgba(21,21,21,0.10);
  background: rgba(0,0,0,0.04);
}
.hero img{
  width: 100%;
  display:block;
  height: auto;
}
.cap{
  padding: 12px 14px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.55;
  border-top: 1px solid rgba(21,21,21,0.08);
  background: rgba(255,255,255,0.45);
}

.caseBody{
  padding: 28px 0 10px;
}

.block{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  padding: 26px 0;
  border-bottom: 1px solid rgba(21,21,21,0.08);
}

.blockText h2{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  margin: 0 0 12px;
  font-size: 1.8rem;
}
.blockText p{
  margin: 0;
  line-height: 1.9;
  color: rgba(21,21,21,0.82);
}

.blockImgs{
  display:flex;
  flex-direction: column;
  gap: 14px;
}

.fig{
  margin: 0;
  border-radius: 16px;
  overflow:hidden;
  border: 1px solid rgba(21,21,21,0.10);
  background: rgba(0,0,0,0.04);
}
.fig img{
  width: 100%;
  display:block;
  height: auto;
}
.fig figcaption{
  padding: 10px 12px;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.55;
  border-top: 1px solid rgba(21,21,21,0.08);
  background: rgba(255,255,255,0.45);
}

.conclusion{
  padding: 28px 0 6px;
}
.conclusion h2{
  font-family: "Playfair Display", serif;
  font-weight: 400;
  margin: 0 0 12px;
}
.conclusion p{
  margin: 0;
  line-height: 1.9;
  color: rgba(21,21,21,0.82);
}

.caseFooter{
  padding: 34px 0 40px;
  text-align:center;
}

@media (max-width: 900px){
  .caseHeader{ grid-template-columns: 1fr; }
  .block{ grid-template-columns: 1fr; }
  .caseTitle h1{ font-size: 2.4rem; }
}
`;
