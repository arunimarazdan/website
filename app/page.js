"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [openProjectId, setOpenProjectId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const projects = useMemo(
    () => [
      {
        id: "speakeasy",
        title: "Speakeasy Bar",
        subtitle: "Glasgow // 2025",
        coverImage: "/aru_website_pic.jpg", // in /public
        teaser:
          "This project is located on Sauchiehall Street, a historic road in Glasgow. Light, shadow, and reflection are used to slowly reveal spaces, encouraging movement and curiosity.",
        meta: [
          ["Year", "2025"],
          ["Type", "Bar"],
          ["Area", "250 sqm"],
          ["Location", "Sauchiehall Street, Glasgow"],
          ["Client", "The Glasgow School of Art"],
        ],
        sections: [
          {
            heading: "Materiality & Site Mapping",
            body:
              "On Sauchiehall Street, there is a mix of stone and slate construction. These materials are incorporated into the dining space with dark timbered walls, bronze accents and mirrors where soft amber candle lighting creates light illusions.",
            images: [
              { src: "/map.jpg", caption: "Site Map" },
              { src: "/material-study.jpg", caption: "Materiality Study" },
            ],
          },
          {
            heading: "In Praise of Shadows",
            body:
              "Traditional Japanese culture has developed a refined understanding of shadows, dimness, and restraint. Darkness can give depth and emotional richness to space, and excessive lighting can flatten imagination.",
            images: [{ src: "/lighting-study.jpg", caption: "Lighting Study" }],
          },
        ],
      },
    ],
    []
  );

  const openProject = projects.find((p) => p.id === openProjectId) || null;

  function scrollTo(ref) {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onSendMessage(e) {
    e.preventDefault();

    // No backend yet, so we use a mailto that opens the visitor’s email client.
    const to = "ar.arunimarazdan@gmail.com";
    const subject = `Portfolio message from ${form.name || "Visitor"}`;
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}`;

    const href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  }

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <div className="brand">ARUNIMA RAZDAN</div>
          <nav className="links">
            <button className="link" onClick={() => scrollTo(aboutRef)}>
              ARUNIMA (ABOUT)
            </button>
            <button className="link" onClick={() => scrollTo(projectsRef)}>
              PROJECTS
            </button>
            <button className="link" onClick={() => scrollTo(contactRef)}>
              CONTACT
            </button>
            <a className="link" href="/resume.pdf" target="_blank" rel="noreferrer">
              RESUME
            </a>
          </nav>
        </div>
      </header>

      <main className="page">
        {/* ABOUT */}
        <section ref={aboutRef} id="about" className="section">
          <div className="sectionTop">
            <div className="kicker">01 / ABOUT</div>
            <div className="rule" />
          </div>

          <div className="aboutWrap">
            <div className="aboutText">
              <p>
                Arunima Razdan is an architect and interior designer whose work explores the
                relationship between space, atmosphere, and human experience. Her design approach is
                rooted in the belief that architecture is not only seen, but felt through light,
                shadow, material, sound, and movement.
              </p>
              <p>
                With an academic foundation shaped in India and advanced study at the Glasgow School
                of Art, Arunima’s work reflects a dialogue between structure and sensory perception.
              </p>
            </div>

            {/* Optional portrait / image */}
            {/* If you do not want it, delete this block. */}
            <div className="aboutImage">
              <Image
                src="/aru_website_pic.jpg"
                alt="Arunima Razdan"
                width={900}
                height={1100}
                className="img"
                priority
              />
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={projectsRef} id="projects" className="section">
          <div className="sectionTop">
            <div className="kicker">02 / SELECTED WORKS</div>
            <div className="rule" />
          </div>

          <div className="projectsCenter">
            <div className="projectsGrid">
              {projects.map((p) => (
                <article key={p.id} className="card">
                  <button
                    className="cardButton"
                    onClick={() => setOpenProjectId(p.id)}
                    aria-label={`Open project: ${p.title}`}
                  >
                    <div className="cardMedia">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="cardImg"
                        sizes="(max-width: 900px) 90vw, 760px"
                        priority
                      />
                      <div className="cardOverlay">
                        <div className="cardText">
                          <div className="cardTitle">{p.title}</div>
                          <div className="cardSub">{p.subtitle}</div>
                        </div>
                      </div>
                    </div>

                    <div className="cardFooter">
                      <p className="cardTeaser">{p.teaser}</p>
                      <div className="cardCta">EXPLORE NARRATIVE →</div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactRef} id="contact" className="section">
          <div className="sectionTop">
            <div className="kicker">03 / CONTACT</div>
            <div className="rule" />
          </div>

          <div className="contactWrap">
            <div className="contactLeft">
              <h2 className="contactHeadline">Let’s build a conversation.</h2>

              <a className="contactLink" href="mailto:ar.arunimarazdan@gmail.com">
                ar.arunimarazdan@gmail.com
              </a>

              {/* Replace this with your real LinkedIn URL */}
              <a
                className="contactLink"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile
              </a>
            </div>

            <form className="contactRight" onSubmit={onSendMessage}>
              <label className="field">
                <span className="label">Your name</span>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Your name"
                />
              </label>

              <label className="field">
                <span className="label">Your email</span>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="you@email.com"
                  required
                />
              </label>

              <label className="field">
                <span className="label">Message</span>
                <textarea
                  className="textarea"
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Write your message…"
                  rows={6}
                  required
                />
              </label>

              <button className="send" type="submit">
                SEND MESSAGE
              </button>

              <div className="note">
                This opens your email app (no backend connected yet). If you want the message to send
                directly from the site, use Formspree/Web3Forms later.
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* PROJECT MODAL (keeps the “touch” of the first page) */}
      {openProject && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modalBackdrop" onClick={() => setOpenProjectId(null)} />
          <div className="modalPanel">
            <div className="modalTop">
              <div>
                <div className="modalTitle">{openProject.title}</div>
                <div className="modalSub">{openProject.subtitle}</div>
              </div>
              <button className="close" onClick={() => setOpenProjectId(null)}>
                CLOSE PROJECT
              </button>
            </div>

            <div className="modalBody">
              <div className="meta">
                {openProject.meta.map(([k, v]) => (
                  <div key={k} className="metaRow">
                    <div className="metaKey">{k}</div>
                    <div className="metaVal">{v}</div>
                  </div>
                ))}
              </div>

              <p className="modalIntro">{openProject.teaser}</p>

              {openProject.sections.map((s) => (
                <section key={s.heading} className="projSection">
                  <h3 className="projH">{s.heading}</h3>
                  <p className="projP">{s.body}</p>

                  <div className="projImages">
                    {s.images.map((img) => (
                      <figure key={img.src} className="fig">
                        <div className="figMedia">
                          <Image
                            src={img.src}
                            alt={img.caption || s.heading}
                            fill
                            className="figImg"
                            sizes="(max-width: 900px) 92vw, 760px"
                          />
                        </div>
                        {img.caption && <figcaption className="cap">{img.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #f6f3ee;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .link {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
          text-decoration: none;
        }
        .link:hover {
          color: rgba(0, 0, 0, 0.9);
        }

        .page {
          background: #f6f3ee;
          min-height: 100vh;
        }
        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 54px 28px 72px;
        }
        .sectionTop {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 34px;
        }
        .kicker {
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
          white-space: nowrap;
        }
        .rule {
          height: 1px;
          flex: 1;
          background: rgba(0, 0, 0, 0.08);
        }

        .aboutWrap {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: start;
        }
        .aboutText p {
          margin: 0 0 22px;
          font-size: 26px;
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.72);
          font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
        }
        .aboutImage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 2px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.06);
        }
        .img {
          object-fit: cover;
        }

        .projectsCenter {
          display: flex;
          justify-content: center; /* centers the projects block */
        }
        .projectsGrid {
          width: min(760px, 100%);
          display: grid;
          gap: 34px;
        }
        .card {
          border-radius: 2px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .cardButton {
          width: 100%;
          border: none;
          padding: 0;
          background: none;
          cursor: pointer;
          text-align: left;
        }
        .cardMedia {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: rgba(0, 0, 0, 0.1);
        }
        .cardImg {
          object-fit: cover;
        }
        .cardOverlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.72);
        }
        .cardText {
          text-align: center;
          padding: 18px 18px;
        }
        .cardTitle {
          font-size: 56px;
          line-height: 1.05;
          font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
          color: rgba(0, 0, 0, 0.82);
        }
        .cardSub {
          margin-top: 10px;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.45);
        }
        .cardFooter {
          padding: 28px 26px 24px;
          background: #0f0f10;
          color: #fff;
        }
        .cardTeaser {
          margin: 0 0 18px;
          max-width: 58ch;
          font-size: 18px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.85);
        }
        .cardCta {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.9;
          display: inline-block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
          padding-bottom: 6px;
        }

        .contactWrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 54px;
          align-items: start;
        }
        .contactHeadline {
          margin: 0 0 22px;
          font-size: 68px;
          line-height: 1;
          font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
          color: rgba(0, 0, 0, 0.82);
        }
        .contactLink {
          display: inline-block;
          margin: 10px 0;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.72);
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.18);
          padding-bottom: 6px;
        }
        .contactLink:hover {
          color: rgba(0, 0, 0, 0.92);
          border-bottom-color: rgba(0, 0, 0, 0.35);
        }

        .contactRight {
          display: grid;
          gap: 18px;
        }
        .field {
          display: grid;
          gap: 8px;
        }
        .label {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
        }
        .input,
        .textarea {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.16);
          background: transparent;
          padding: 12px 0;
          font-size: 16px;
          outline: none;
          color: rgba(0, 0, 0, 0.8);
        }
        .textarea {
          resize: vertical;
          padding-top: 10px;
        }
        .send {
          margin-top: 8px;
          height: 56px;
          border: none;
          background: #111;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .send:hover {
          background: #000;
        }
        .note {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          line-height: 1.45;
        }

        /* Modal */
        .modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
        }
        .modalBackdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
        }
        .modalPanel {
          position: relative;
          width: min(980px, calc(100vw - 32px));
          max-height: calc(100vh - 32px);
          background: #f6f3ee;
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.14);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        }
        .modalTop {
          padding: 22px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .modalTitle {
          font-size: 28px;
          font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
          color: rgba(0, 0, 0, 0.82);
        }
        .modalSub {
          margin-top: 6px;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
        }
        .close {
          border: 1px solid rgba(0, 0, 0, 0.22);
          background: transparent;
          padding: 10px 14px;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.7);
        }
        .close:hover {
          color: rgba(0, 0, 0, 0.9);
          border-color: rgba(0, 0, 0, 0.35);
        }
        .modalBody {
          padding: 22px 22px 34px;
          overflow: auto; /* keeps the nice scroll inside the project */
          max-height: calc(100vh - 120px);
        }
        .meta {
          display: grid;
          gap: 6px;
          margin-bottom: 18px;
        }
        .metaRow {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
        }
        .metaKey {
          color: rgba(0, 0, 0, 0.5);
        }
        .modalIntro {
          margin: 18px 0 26px;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(0, 0, 0, 0.72);
        }
        .projSection {
          margin-top: 26px;
          padding-top: 18px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .projH {
          margin: 0 0 10px;
          font-size: 18px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.72);
        }
        .projP {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(0, 0, 0, 0.72);
        }
        .projImages {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }
        .fig {
          margin: 0;
        }
        .figMedia {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: rgba(0, 0, 0, 0.06);
        }
        .figImg {
          object-fit: cover;
        }
        .cap {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 960px) {
          .aboutWrap {
            grid-template-columns: 1fr;
          }
          .contactWrap {
            grid-template-columns: 1fr;
          }
          .contactHeadline {
            font-size: 52px;
          }
          .cardTitle {
            font-size: 44px;
          }
        }
      `}</style>
    </>
  );
}
