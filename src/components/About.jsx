import React from 'react';
import './About.css';

export default function About() {
  const advantages = [
    "Без навязчивых конкурсов",
    "Современный сценарий",
    "Индивидуальная подготовка",
    "Работа по договору",
    "Всегда на связи",
    "Главные на празднике — Вы и гости"
  ];

  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <div className="about-grid">
          {/* Left: Portrait */}
          <div className="about-visual reveal-element">
            <div className="about-image-wrapper">
              <img src="/vladik.png" alt="Владислав Дагалдиев" className="about-image" />
              <div className="about-image-border"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <div className="about-content-top">
              <div className="about-header-block reveal-element">
                <p className="about-label">Давайте знакомиться</p>
                <h2 className="about-title">Привет, я Владислав.</h2>
                <p className="about-lead">Провожу свадьбы спокойно, современно и без шаблонов.</p>
              </div>

              <div className="about-editorial-columns reveal-element">
                <div className="about-editorial-col">
                  <p className="about-highlight-text">
                    Без неловких конкурсов. Без давления на гостей. Без сценариев, которые все уже видели десятки раз.
                  </p>
                  <p className="about-plain-text">
                    Вместо этого — лёгкая атмосфера, живые эмоции и вечер, который отражает именно вашу историю.
                  </p>
                </div>
                <div className="about-editorial-col">
                  <p className="about-plain-text">
                    Каждая свадьба создаётся индивидуально: от первой встречи до финала праздника. Моя задача проста — сделать так, чтобы вы наслаждались своим днём, а не переживали за его организацию.
                  </p>
                  <p className="about-plain-text">
                    Именно поэтому большинство моих пар вспоминают не программу вечера, а то ощущение лёгкости, тепла и комфорта, которое сопровождало их весь праздник.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-advantages-block reveal-element">
              <ul className="about-advantages-list">
                {advantages.map((item, idx) => (
                  <li key={idx} className="about-advantage-item">
                    <span className="about-advantage-icon-wrapper">
                      <svg className="about-advantage-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="about-advantage-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

