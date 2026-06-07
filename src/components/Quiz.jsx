import React, { useState } from 'react';
import './Quiz.css';

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gift: '',
    date: '',
    venue: '',
    guests: '',
    messenger: '',
    name: '',
    phone: '',
    consent: true
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 4;

  const includedItems = [
    "Проведение свадьбы с юмором",
    "Работа профессионального DJ",
    "Написание, постановка и проведение церемонии",
    "Монтаж видео-подарка вместе с вашими друзьями",
    "Встречи и консультации без ограничений"
  ];

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните имя и телефон.");
      return;
    }
    setSubmitted(true);
  };

  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <section id="quiz" className="quiz-section">
      <div className="container quiz-container">
        <div className="quiz-header reveal-element">
          <p className="quiz-label">Quiz & Cost</p>
          <h2 className="quiz-title">Рассчитайте стоимость вашего события</h2>
          <p className="quiz-subtitle">Ответьте на 4 вопроса, зафиксируйте дату и выберите ваш подарок.</p>
        </div>

        {!submitted ? (
          <form className="quiz-form-card reveal-element" onSubmit={handleSubmit}>
            <div className="quiz-main-grid">
              <div className="quiz-left-panel">
                {/* Progress Bar Container */}
                <div className="quiz-progress-container">
              <span className="quiz-progress-text">Шаг {step} из {totalSteps}</span>
              <div className="quiz-progress-track">
                <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Step 1: Select Gift */}
            {step === 1 && (
              <div className="quiz-step animate-step">
                <h3 className="step-title">1. Выберите ваш подарок к мероприятию</h3>
                <div className="options-grid">
                  <div 
                    className={`option-card ${formData.gift === 'Подготовка сюрприза с гостями' ? 'selected' : ''}`}
                    onClick={() => handleSelect('gift', 'Подготовка сюрприза с гостями')}
                  >
                    <div className="option-circle"></div>
                    <span className="option-label">Подготовка сюрприза с гостями</span>
                  </div>
                  <div 
                    className={`option-card ${formData.gift === 'Видеоролик про пару и друзей' ? 'selected' : ''}`}
                    onClick={() => handleSelect('gift', 'Видеоролик про пару и друзей')}
                  >
                    <div className="option-circle"></div>
                    <span className="option-label">Видеоролик про пару и друзей</span>
                  </div>
                  <div 
                    className={`option-card ${formData.gift === 'Подарок не нужен' ? 'selected' : ''}`}
                    onClick={() => handleSelect('gift', 'Подарок не нужен')}
                  >
                    <div className="option-circle"></div>
                    <span className="option-label">Подарок не нужен</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Venue */}
            {step === 2 && (
              <div className="quiz-step animate-step">
                <h3 className="step-title">2. Укажите дату и место проведения</h3>
                <div className="inputs-grid">
                  <div className="input-wrapper">
                    <label className="input-label">Планируемая дата</label>
                    <input 
                      type="date" 
                      className="quiz-input" 
                      value={formData.date} 
                      onChange={(e) => handleSelect('date', e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label className="input-label">Место проведения (город / площадка)</label>
                    <input 
                      type="text" 
                      placeholder="Например, Villa Borghese" 
                      className="quiz-input" 
                      value={formData.venue} 
                      onChange={(e) => handleSelect('venue', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Guest Count */}
            {step === 3 && (
              <div className="quiz-step animate-step">
                <h3 className="step-title">3. Количество гостей на вашем празднике</h3>
                <div className="options-grid grid-2x2">
                  {['10-30', '30-50', '50-100', '>100'].map((gRange) => (
                    <div 
                      key={gRange} 
                      className={`option-card ${formData.guests === gRange ? 'selected' : ''}`}
                      onClick={() => handleSelect('guests', gRange)}
                    >
                      <div className="option-circle"></div>
                      <span className="option-label">{gRange} гостей</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Contacts & Submit */}
            {step === 4 && (
              <div className="quiz-step animate-step">
                <h3 className="step-title">4. Кому отправить подробную смету стоимости?</h3>
                
                <div className="messenger-selector">
                  {['Telegram', 'WhatsApp', 'ВКонтакте', 'Позвонить лично'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`messenger-btn ${formData.messenger === m ? 'active' : ''}`}
                      onClick={() => handleSelect('messenger', m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="inputs-grid">
                  <div className="input-wrapper">
                    <label className="input-label">Ваше имя</label>
                    <input 
                      type="text" 
                      placeholder="Александр" 
                      className="quiz-input" 
                      required
                      value={formData.name} 
                      onChange={(e) => handleSelect('name', e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label className="input-label">Номер телефона</label>
                    <input 
                      type="tel" 
                      placeholder="+7 (999) 000-00-00" 
                      className="quiz-input" 
                      required
                      value={formData.phone} 
                      onChange={(e) => handleSelect('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="consent-wrapper">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    checked={formData.consent} 
                    onChange={(e) => handleSelect('consent', e.target.checked)}
                    required
                  />
                  <label htmlFor="consent" className="consent-label">
                    Я даю согласие на обработку персональных данных в соответствии с <a href="#privacy" className="privacy-link">Политикой конфиденциальности</a>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="quiz-nav">
              {step > 1 && (
                <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                  Назад
                </button>
              )}
              
              {step < totalSteps ? (
                <button type="button" className="btn btn-primary" onClick={handleNext} disabled={step === 1 && !formData.gift}>
                  Далее
                </button>
              ) : (
                <button type="submit" className="btn btn-gold">
                  Рассчитать стоимость
                </button>
              )}
            </div>
          </div>

          <div className="quiz-right-panel">
              <h3 className="included-title">В стоимость входит</h3>
              <ul className="included-list">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="included-item">
                    <span className="included-num">0{idx + 1}</span>
                    <span className="included-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
        ) : (
          <div className="quiz-success-card reveal-element animate-step">
            <div className="success-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="success-svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="success-title">Спасибо за ваш интерес!</h3>
            <p className="success-desc">
              Ваш расчет и выбранный подарок успешно зафиксированы. Владислав свяжется с вами в течение короткого времени выбранным способом: {formData.messenger || "По телефону"}.
            </p>
            <p className="success-subdesc">А пока вы можете продолжить изучение сайта.</p>
          </div>
        )}
      </div>
    </section>
  );
}
