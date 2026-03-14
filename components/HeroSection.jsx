'use client';

import WindyLandscape from './WindyLandscape';

export default function HeroSection({ onBegin }) {
  return (
    <section id="s-hero">
      <div className="hero-bg" aria-hidden="true">
        <WindyLandscape src="/images/dawn.png" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow hero-parallax-bg">A breath. A moment. A return.</p>
        <h1 className="hero-title hero-parallax-mid">
          Still<em>ness</em><br />
          begins<br />
          <em>here.</em>
        </h1>
        <p className="hero-sub hero-parallax-mid">
          A quiet space for breathwork. Let the landscape shift around you as you settle into the rhythm of your breath.
        </p>
        <button className="cta-pill hero-parallax-fg" onClick={onBegin}>
          Begin session
          <span className="cta-arrow">&rarr;</span>
        </button>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span className="scroll-label">scroll</span>
      </div>
    </section>
  );
}
