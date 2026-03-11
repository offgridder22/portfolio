'use client';

import { useState } from 'react';
import { journeyCards } from './SceneThemes';

export default function JourneySection({ onChoose }) {
  const [activeCard, setActiveCard] = useState(null);

  function handleClick(scene) {
    setActiveCard(scene);
    onChoose(scene);
  }

  return (
    <section id="s-journey">
      <div className="journey-header">
        <span className="section-number">02 — Landscapes</span>
        <h2 className="journey-title">Choose<br />your <em>scene.</em></h2>
      </div>

      <div className="journey-cards">
        {journeyCards.map(card => (
          <div
            key={card.scene}
            className={`journey-card ${activeCard === card.scene ? 'active-card' : ''}`}
            data-scene={card.scene}
            onClick={() => handleClick(card.scene)}
          >
            <div className="card-left">
              <span className="card-name">{card.name}</span>
              <span className="card-desc">{card.desc}</span>
            </div>
            <div className="card-right">
              <span className="card-duration">{card.duration}</span>
              <div className="card-dot"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
