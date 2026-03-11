'use client';

import { sectionIds } from './SceneThemes';

const navLabels = ['Arrive', 'Practice', 'Journey', 'Rest'];

export default function Nav({ activeSection, onNavigate }) {
  return (
    <nav>
      <span className="nav-logo">Breathe</span>
      <ul className="nav-steps">
        {navLabels.map((label, i) => (
          <li
            key={label}
            className={i === activeSection ? 'active' : ''}
            onClick={() => onNavigate(i)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ProgressDots({ activeSection, onNavigate }) {
  return (
    <div className="progress-dots">
      {sectionIds.map((_, i) => (
        <button
          key={i}
          className={`progress-dot ${i === activeSection ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
        />
      ))}
    </div>
  );
}
