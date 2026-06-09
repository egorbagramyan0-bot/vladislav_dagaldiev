import React from 'react';
import './About.css';

export default function About() {
  const advantages = [
    "Без навязчивых конкурсов",
    "Современный сценарий",
    "Индивидуальная подготовка",
    "Работа по\u00a0договору",
    "Всегда на\u00a0связи",
    "Главные на\u00a0празднике — Вы\u00a0и\u00a0гости"
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
                <p className="about-lead">{"Провожу мероприятия спокойно, современно и\u00a0без\u00a0шаблонов."}</p>
              </div>

              <div className="about-editorial-columns reveal-element">
                <div className="about-editorial-col">
                  <p className="about-highlight-text">
                    {"Без неловких конкурсов. Без давления на\u00a0гостей. Без сценариев, которые все уже видели десятки раз."}
                  </p>
                  <p className="about-plain-text">
                    {"Вместо этого — лёгкая атмосфера, живые эмоции и\u00a0вечер, который отражает именно вашу историю."}
                  </p>
                </div>
                <div className="about-editorial-col">
                  <p className="about-plain-text">
                    {"Каждое мероприятие создаётся индивидуально: от\u00a0первой встречи до\u00a0финала праздника. Моя задача проста — сделать так, чтобы вы\u00a0наслаждались своим днём, а\u00a0не переживали за\u00a0его организацию."}
                  </p>
                  <p className="about-plain-text">
                    {"Именно поэтому большинство моих пар вспоминают не\u00a0программу вечера, а\u00a0то ощущение лёгкости, тепла и\u00a0комфорта, которое сопровождало их\u00a0весь праздник."}
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

