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
              <img src="/vladik.webp" alt="Владислав Дагалдиев" className="about-image" />
              <div className="about-image-border"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content">
            <div className="about-content-top">
              <div className="about-header-block reveal-element">
                <p className="about-label">Давайте знакомиться</p>
                <h2 className="about-title">Привет, я Владислав</h2>
                <p className="about-lead">
                  {"Уже 5\u00a0лет я\u00a0провожу мероприятия так, чтобы гостям было легко, весело и\u00a0по-настоящему комфортно!"}
                </p>
              </div>

              <div className="about-editorial-columns reveal-element">
                <div className="about-editorial-col">
                  <p className="about-highlight-text">
                    {"Я\u00a0не делаю праздник «по\u00a0шаблону»."}
                  </p>
                  <p className="about-plain-text">
                    {"Каждое событие собирается под\u00a0вас: под\u00a0вашу историю, характер, ваших гостей и\u00a0то настроение, которое вы\u00a0хотите сохранить в\u00a0памяти."}
                  </p>
                  <p className="about-plain-text">
                    {"Моя задача\u00a0— не\u00a0просто провести вечер по\u00a0таймингу. Моя задача\u00a0— сделать так, чтобы вы\u00a0выдохнули, расслабились и\u00a0прожили этот день с\u00a0удовольствием, а\u00a0не с\u00a0тревогой: «всё\u00a0ли идёт по\u00a0плану?»"}
                  </p>
                </div>
                <div className="about-editorial-col">
                  <p className="about-plain-text">
                    {"Я\u00a0беру на\u00a0себя атмосферу, динамику, настроение зала и\u00a0все те\u00a0мелочи, из\u00a0которых складывается хороший праздник."}
                  </p>
                  <p className="about-plain-text">
                    {"Поэтому мои пары чаще всего вспоминают не\u00a0конкретные конкурсы или\u00a0блоки программы. Они вспоминают ощущение: как\u00a0было легко, тепло, искренне и\u00a0«по-настоящему про\u00a0нас»."}
                  </p>
                  <p className="about-highlight-text">
                    {"Именно ради\u00a0этого я\u00a0и работаю."}
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

