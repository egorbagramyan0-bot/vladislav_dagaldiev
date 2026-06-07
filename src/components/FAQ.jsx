import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const faqData = [
    {
      q: "Что будет на первой встрече с вами?",
      a: "Вначале мы с вами просто знакомимся и общаемся, ведь очень важно почувствовать коннект. Если вы уже знаете, какую свадьбу хотите — я помогу воплотить ваши идеи и подскажу, как их лучше реализовать. Если идей пока нет, мы определимся с форматом: нужны ли традиции, конкурсы или лучше обойтись без них. Я расскажу о структуре вечера и о том, как буду работать с вашими гостями."
    },
    {
      q: "Будут ли перерывы на танцы и свободное общение?",
      a: "Обязательно! Я соблюдаю строгий баланс между программой и свободным временем. Прекрасно понимаю, что гостям нужно потанцевать, поболтать друг с другом, выйти подышать воздухом. Программа будет гармоничной, чтобы никто не устал и все отдохнули с удовольствием."
    },
    {
      q: "У нас будет и молодежь, и старшее поколение. Как объединить гостей?",
      a: "Я подбираю интерактивы и темы для общения так, чтобы комфортно чувствовали себя абсолютно все. Мой юмор понятен каждому поколению, а программа исключает неловкие моменты. На празднике будет весело и молодежи, и вашим родителям, дедушкам и бабушкам."
    },
    {
      q: "Какую музыку будет включать DJ?",
      a: "Исключительно ту, которую любите вы и ваши гости. Свадьба — ваш праздник, поэтому плейлист создается с учетом ваших предпочтений (вы можете передать список любимых треков и ограничений заранее). Если конкретных пожеланий нет, наш диджей сам отлично подстроится под настроение танцпола."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container faq-container">
        <div className="faq-header reveal-element">
          <p className="faq-label">Questions</p>
          <h2 className="faq-title">Часто задаваемые вопросы</h2>
          <div className="faq-title-line"></div>
        </div>

        <div className="faq-accordion-list">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className={`faq-accordion-item reveal-element ${isOpen ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleAccordion(idx)}>
                  <span className="faq-question-text">{item.q}</span>
                  <span className="faq-icon-trigger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="faq-svg-icon">
                      <line x1="12" y1="5" x2="12" y2="19" className="faq-line-v" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '600px' : '0' }}>
                  <div className="faq-answer-content">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
