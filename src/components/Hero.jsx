import React from 'react';
import './Hero.css';
import { GodRays } from "@paper-design/shaders-react";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* GodRays Background - Subtle light/dark rays overlay */}
      <div className="hero-shader-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <GodRays
          colorBack="#00000000"
          colors={["#a1a1aa40", "#e4e4e740", "#71717a40", "#52525b40"]}
          colorBloom="#a1a1aa"
          offsetX={0.85}
          offsetY={-1}
          intensity={0.5}
          spotty={0.45}
          midSize={10}
          midIntensity={0}
          density={0.38}
          bloom={0.3}
          speed={0.5}
          scale={1.6}
          frame={3332042.8159981333}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      <div className="container hero-container">
        {/* Giant full-width title directly below the navbar - single line */}
        <h1 className="hero-giant-title fade-up-element">
          Владислав Дагалдиев
        </h1>
        
        <div className="hero-grid">
          <div className="hero-content">
            {/* Tagline Subheading/Offer directly under name, inside the content block */}
            <h2 className="hero-tagline fade-up-element delay-1">
              Легкая атмосфера и живые эмоции,<br />
              сценарий под Ваше мероприятие
            </h2>
            
            {/* Smaller description text */}
            <p className="hero-description fade-up-element delay-2">
              Провожу мероприятия интеллигентно и уверенно, объединяю гостей, держу темп вечера и создаю праздник, в котором комфортно и действительно интересно гостям
            </p>
            
            <div className="hero-actions fade-up-element delay-3">
              <a href="#quiz" className="btn btn-primary btn-hero-cta">
                Рассчитать стоимость
              </a>
              <a href="https://t.me/VladislavDagaldiev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-hero-sec">
                Связаться в Telegram
              </a>
            </div>
          </div>
          
          <div className="hero-image-pane fade-up-element delay-1">
            <div className="hero-images-collage">
              <div className="hero-image-wrapper wrapper-primary">
                <img src="/hero8.jpg" alt="Владислав Дагалдиев" className="hero-img img-primary" />
                <div className="hero-image-frame"></div>
              </div>
              <div className="hero-image-wrapper wrapper-secondary">
                <img src="/hero9.jpg" alt="Владислав Дагалдиев" className="hero-img img-secondary" />
                <div className="hero-image-frame"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-badge">
        <span>PREMIUM EVENTS • 2026</span>
      </div>
    </section>
  );
}
