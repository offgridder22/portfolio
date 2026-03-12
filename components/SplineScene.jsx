'use client';

import { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineSkeleton() {
  return (
    <div className="spline-skeleton">
      <div className="spline-skeleton-orb" />
    </div>
  );
}

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const splineRef = useRef(null);

  // Only render Spline when hero is in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '100px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleLoad = useCallback((splineApp) => {
    splineRef.current = splineApp;
    if (splineApp?.canvas) {
      splineApp.canvas.style.background = 'transparent';
    }
    setLoaded(true);
  }, []);

  return (
    <div className="spline-container" ref={containerRef}>
      {!loaded && <SplineSkeleton />}
      {visible && (
        <Suspense fallback={<SplineSkeleton />}>
          <Spline
            scene="https://prod.spline.design/4zM-BEYPGycxhSyk/scene.splinecode"
            onLoad={handleLoad}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
