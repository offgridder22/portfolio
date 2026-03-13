'use client';

import Script from 'next/script';

export default function HeroSection({ onBegin }) {
  return (
    <section id="s-hero">
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="hero-layout">
        <div className="flower-scene flower-scene--left" aria-hidden="true">
          {/* @ts-ignore */}
          <spline-viewer url="https://prod.spline.design/BWzDAq-WNI3BdpQQ/scene.splinecode" render-on-demand />
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

        <div className="flower-scene flower-scene--right" aria-hidden="true">
          {/* @ts-ignore */}
          <spline-viewer url="https://prod.spline.design/d05SypZF284irdiU/scene.splinecode" render-on-demand />
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span className="scroll-label">scroll</span>
      </div>
    </section>
  );
}
