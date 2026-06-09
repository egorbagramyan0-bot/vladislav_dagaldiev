import { useState, useRef } from 'react';
import './Reviews.css';

export default function Reviews() {
  const reviewsList = [
    {
      img: "/reviews/evgeniya.jpg",
      quote: "Огромное спасибо за\u00a0такой веселый и\u00a0замечательный праздник. Мало того, что\u00a0все гости вспоминают, как\u00a0здорово и\u00a0весело было, и\u00a0просят повторить, так\u00a0еще у\u00a0них создалось впечатление, что\u00a0мы старые друзья.",
      names: "Вячеслав и Евгения"
    },
    {
      img: "/reviews/verinoca.jpg",
      quote: "Огромное спасибо за\u00a0то, что\u00a0прислушался ко\u00a0всем просьбам. Ты\u00a0самый лучший ведущий. Все\u00a0гости были довольны. Все\u00a0писали мне, что\u00a0хотели бы\u00a0ещё раз\u00a0повторить этот вечер.",
      names: "Александр и Вероника"
    },
    {
      img: "/reviews/jiznvoram.jpg",
      quote: "Владислав, спасибо за\u00a0Вашу работу! Получилось все\u00a0очень хорошо! Гости были довольны и\u00a0передавали вам большой привет 👋🏼 Вы\u00a0чувствовали гостей и\u00a0не давили конкурсами, чтобы была реализована главная цель — крутой отдых для\u00a0наших ребят. Спасибо еще\u00a0раз! С\u00a0наступающим Новым Годом",
      names: ""
    },
    {
      img: "/reviews/oksi.png",
      quote: "Хочу выразить огромную благодарность Владиславу!!!! Владислав сразу\u00a0же ответил на\u00a0мое сообщение. Вышли с\u00a0ним на\u00a0видео\u00a0связь, обговорили все\u00a0нюансы, и\u00a0пошла подготовка… но\u00a0не от\u00a0меня, а\u00a0от самого Владислава. Он\u00a0общался с\u00a0моими гостями в\u00a0чате, готовили мне\u00a0сюрпризы, а\u00a0я просто отдыхала. Все\u00a0было на\u00a0высшем уровне, Владислав нашел к\u00a0каждому подход. Все\u00a0прошло очень эмоционально, энергично, весело, все\u00a0были задействованы в\u00a0программе. Осталось такое впечатление, что\u00a0мы с\u00a0ним знакомы всю\u00a0жизнь.",
      names: "Оксана"
    },
    {
      img: "/reviews/denis.jpg",
      quote: "Смотрели много ведущих и\u00a0в\u00a0основном выбирали интуитивно. С\u00a0тобой было комфортно общаться, всё\u00a0доступно и\u00a0понятно объяснял, отвечал на\u00a0все наши нормальные и\u00a0ненормальные вопросы. Обратная связь от\u00a0тебя очень радовала, мы\u00a0с\u00a0тобой общались бесконечно много днями и\u00a0ночами, ты\u00a0помогал во\u00a0всем как\u00a0до\u00a0мероприятия, так\u00a0и\u00a0на\u00a0самом вечере, это\u00a0было супер🫶 На\u00a0празднике мы\u00a0уже всё\u00a0отпустили и\u00a0просто кайфовали☺️ Интересный был\u00a0интерактив с\u00a0вопросами, было прикольно наблюдать, как\u00a0и\u00a0что\u00a0решат гости о\u00a0нас, на\u00a0некоторые вопросы даже у\u00a0нас не\u00a0было ответов, а\u00a0они нашли😄 Гости сказали, что\u00a0было всё: и\u00a0слезы, и\u00a0смех — это\u00a0то, чего мы\u00a0и\u00a0хотели🫶",
      names: "Денис и Элеонора"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // Initialize end with start
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // minimum distance in px
    if (diffX > swipeThreshold) {
      handleNext();
    } else if (diffX < -swipeThreshold) {
      handlePrev();
    }
    // reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container reviews-container">
        <div className="reviews-header reveal-element">
          <p className="reviews-label">Reviews</p>
          <h2 className="reviews-title">{"Читаю это перед\u00a0сном"}</h2>
          {reviewsList.length > 1 && (
            <div className="reviews-nav-arrows">
              <button className="arrow-btn" onClick={handlePrev}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow-svg">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button className="arrow-btn" onClick={handleNext}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="arrow-svg">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div 
          className="reviews-slider-wrapper reveal-element"
          onTouchStart={reviewsList.length > 1 ? handleTouchStart : undefined}
          onTouchMove={reviewsList.length > 1 ? handleTouchMove : undefined}
          onTouchEnd={reviewsList.length > 1 ? handleTouchEnd : undefined}
        >
          <div className="reviews-slider">
            {reviewsList.map((item, idx) => (
              <div key={idx} className={`review-slide ${idx === currentIndex ? 'active' : ''}`}>
                <div className="review-grid">
                  {/* Visual Portrait */}
                  <div className="review-visual">
                    <div className="review-image-wrapper">
                      <img src={item.img} alt={item.names} className="review-image" />
                    </div>
                  </div>
                  {/* Quote content */}
                  <div className="review-content">
                    <div className="quote-icon">“</div>
                    <blockquote className="review-quote-text">
                      {item.quote}
                    </blockquote>
                    <div className="review-author-meta">
                      {item.names && <h4 className="review-author-names">{item.names}</h4>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
