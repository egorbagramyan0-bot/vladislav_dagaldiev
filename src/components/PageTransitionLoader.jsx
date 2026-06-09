import React, { useEffect, useState } from 'react';
import './PageTransitionLoader.css';

export default function PageTransitionLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Elegant fade out after 1.8s
    const timerFade = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Unmount after animation finishes
    const timerRemove = setTimeout(() => {
      setVisible(false);
    }, 2100);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerRemove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <h1 className="loader-title">Владислав Дагалдиев</h1>
        <div className="loader-subtitle-wrapper">
          <p className="loader-subtitle">Ведущий мероприятий</p>
          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
}
