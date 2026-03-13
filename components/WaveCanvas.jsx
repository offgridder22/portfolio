'use client';

import { useEffect, useRef } from 'react';

const WAVE_COUNT = 9;
const WAVE_SPEED = 0.38;
const MAX_RADIUS_FACTOR = 0.72;
const LINE_WIDTH_BASE = 1.1;

function getWaveColor(scene, alpha) {
  const palettes = {
    dawn:   `rgba(160,180,195,${alpha})`,
    forest: `rgba(80,140,100,${alpha})`,
    ocean:  `rgba(60,140,200,${alpha})`,
    dusk:   `rgba(200,130,80,${alpha})`,
  };
  return palettes[scene];
}

export default function WaveCanvas({ scene }) {
  const canvasRef = useRef(null);
  const wavesRef = useRef([]);
  const rafRef = useRef(0);
  const sceneRef = useRef(scene);
  sceneRef.current = scene;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function initWaves() {
      if (!canvas) return;
      const section = canvas.parentElement;
      canvas.width = section?.offsetWidth || window.innerWidth;
      canvas.height = section?.offsetHeight || window.innerHeight;
      const maxR = Math.hypot(canvas.width, canvas.height) * 0.5 * MAX_RADIUS_FACTOR;
      const gap = maxR / WAVE_COUNT;
      wavesRef.current = [];
      for (let i = 0; i < WAVE_COUNT; i++) {
        wavesRef.current.push({ r: i * gap, maxR, phase: i / WAVE_COUNT });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      const maxR = Math.hypot(W, H) * 0.5 * MAX_RADIUS_FACTOR;
      wavesRef.current.forEach(wave => {
        wave.r += WAVE_SPEED;
        if (wave.r > maxR) wave.r = 0;
        const progress = wave.r / maxR;
        let alpha = 0.32;
        if (progress < 0.08) alpha = progress / 0.08 * 0.32;
        else if (progress > 0.72) alpha = (1 - (progress - 0.72) / 0.28) * 0.32;
        alpha = Math.max(0, alpha);
        const lw = LINE_WIDTH_BASE * (1 - progress * 0.6);
        ctx.beginPath();
        ctx.arc(cx, cy, wave.r, 0, Math.PI * 2);
        ctx.strokeStyle = getWaveColor(sceneRef.current, alpha);
        ctx.lineWidth = lw;
        ctx.stroke();
      });
      rafRef.current = requestAnimationFrame(draw);
    }

    initWaves();
    draw();

    const handleResize = () => initWaves();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="wave-canvas" />;
}
