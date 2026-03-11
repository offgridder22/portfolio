'use client';

import { useState } from 'react';
import { quotes } from './SceneThemes';

export default function CloseSection() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  function nextQuote() {
    setFading(true);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % quotes.length);
      setFading(false);
    }, 420);
  }

  const q = quotes[index];

  return (
    <section id="s-close">
      <blockquote
        className="close-quote"
        style={{ opacity: fading ? 0 : 0.75, transition: 'opacity 0.4s ease' }}
      >
        &ldquo;{q.text}&rdquo;
      </blockquote>
      <p
        className="close-attr"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        {q.author}
      </p>
      <button className="btn-ghost" onClick={nextQuote}>Another word</button>
    </section>
  );
}
