import { useEffect, useState } from 'react';
import './PageTransitionLoader.css';

export default function PageTransitionLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timeoutFinished = false;
    let isTransitioned = false;

    const triggerFadeOut = () => {
      if (isTransitioned) return;
      isTransitioned = true;
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 800); // Matches the 0.8s CSS transition
    };

    const minTimer = setTimeout(() => {
      timeoutFinished = true;
      if (document.readyState === 'complete') {
        triggerFadeOut();
      }
    }, 1000);

    const handleLoad = () => {
      if (timeoutFinished) {
        triggerFadeOut();
      }
    };

    if (document.readyState === 'complete') {
      // If document is already loaded, minTimer will run and triggerFadeOut after 1.0s
    } else {
      window.addEventListener('load', handleLoad);
    }

    const maxTimer = setTimeout(() => {
      triggerFadeOut();
    }, 2500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-name">ВЛАДИСЛАВ ДАГАЛДИЕВ</div>
        <div className="loader-progress-container">
          <div className="loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
