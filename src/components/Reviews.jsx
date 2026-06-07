import React, { useState, useRef } from 'react';
import './Reviews.css';
import coupleOne from '../assets/couple_one.png';
import coupleTwo from '../assets/couple_two.png';
import coupleThree from '../assets/couple_three.png';

export default function Reviews() {
  const reviewsList = [
    {
      img: coupleOne,
      quote: "Спасибо большое за то, что прекрасно провел нашу свадьбу. Не давал заскучать гостям, выполнял роль друга и ведущего одновременно. Угодил своей харизмой абсолютно всем гостям!",
      names: "Владислав и Евгения",
      date: "Свадьба • 18.08.2025"
    },
    {
      img: coupleTwo,
      quote: "Мы очень долго искали ведущего, который учтет все наши пожелания! Все было очень здорово! Правильные конкурсы, адекватные вопросы, суперский коннект. Ты действительно был, как наш близкий друг, и все было на высоте!",
      names: "Денис и Юлия",
      date: "Свадьба • 07.06.2025"
    },
    {
      img: coupleThree,
      quote: "Огромное спасибо за то, что прислушался ко всем просьбам. Ты самый лучший ведущий. Все гости были довольны. Все писали мне, что хотели бы ещё раз повторить этот незабываемый вечер.",
      names: "Александр и Вероника",
      date: "Свадьба • 12.09.2025"
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
          <h2 className="reviews-title">Читаю это перед сном</h2>
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
        </div>

        <div 
          className="reviews-slider-wrapper reveal-element"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="reviews-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviewsList.map((item, idx) => (
              <div key={idx} className="review-slide">
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
                      <h4 className="review-author-names">{item.names}</h4>
                      <p className="review-date">{item.date}</p>
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
