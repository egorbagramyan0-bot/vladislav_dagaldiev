import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const faqData = [
    {
      q: "Что будет на\u00a0первой встрече с\u00a0вами?",
      a: "Вначале мы с\u00a0вами просто знакомимся и\u00a0общаемся, ведь очень важно почувствовать коннект. Если вы уже знаете, какое мероприятие хотите — я\u00a0помогу воплотить ваши идеи и\u00a0подскажу, как\u00a0их лучше реализовать. Если идей пока нет, мы\u00a0определимся с\u00a0форматом: нужны ли\u00a0традиции, конкурсы или\u00a0лучше обойтись без\u00a0них. Я\u00a0расскажу о\u00a0структуре вечера и\u00a0о\u00a0том, как\u00a0буду работать с\u00a0вашими гостями."
    },
    {
      q: "Будут ли\u00a0перерывы на\u00a0танцы и\u00a0свободное общение?",
      a: "Обязательно! Я\u00a0соблюдаю строгий баланс между программой и\u00a0свободным временем. Прекрасно понимаю, что\u00a0гостям нужно потанцевать, поболтать друг с\u00a0другом, выйти подышать воздухом. Программа будет гармоничной, чтобы никто не\u00a0устал и\u00a0все отдохнули с\u00a0удовольствием."
    },
    {
      q: "У\u00a0нас будет и\u00a0молодежь, и\u00a0старшее поколение. Как\u00a0объединить гостей?",
      a: "Я\u00a0подбираю интерактивы и\u00a0темы для\u00a0общения так, чтобы комфортно чувствовали себя абсолютно все. Мой юмор понятен каждому поколению, а\u00a0программа исключает неловкие моменты. На\u00a0празднике будет весело и\u00a0молодежи, и\u00a0вашим родителям, дедушкам и\u00a0бабушкам."
    },
    {
      q: "Какую музыку будет включать DJ?",
      a: "Исключительно ту, которую любите вы\u00a0и\u00a0ваши гости. Мероприятие — ваш\u00a0праздник, поэтому плейлист создается с\u00a0учетом ваших предпочтений (вы\u00a0можете передать список любимых треков и\u00a0ограничений заранее). Если конкретных пожеланий нет, наш\u00a0диджей сам\u00a0отлично подстроится под\u00a0настроение танцпола."
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

        <div className="faq-accordion-list reveal-element">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleAccordion(idx)}>
                  <span className="faq-question-text">{item.q}</span>
                  <span className="faq-icon-trigger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="faq-svg-icon">
                      <line x1="12" y1="5" x2="12" y2="19" className="faq-line-v" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div className="faq-answer-wrapper">
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
