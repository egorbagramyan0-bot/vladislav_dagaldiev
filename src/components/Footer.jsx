import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      {/* Pre-footer CTA section */}
      <section className="prefooter-cta-section reveal-element">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Начнём подготовку вашего идеального вечера</h2>
            <p className="cta-description">
              Расскажите о вашем мероприятии, а я помогу сделать его именно таким, каким вы его представляете.
            </p>
            <div className="cta-actions">
              <a href="#quiz" className="btn btn-primary cta-btn">
                Узнать стоимость
              </a>
              <a 
                href="https://t.me/VladislavDagaldiev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary cta-btn telegram-cta-btn"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer section */}
      <footer id="contacts" className="footer-section">
        <div className="container">
          <div className="footer-grid reveal-element">
            {/* Left Column: Brand Info */}
            <div className="footer-col footer-brand">
              <span className="footer-brand-title">Владислав / Свадебный ведущий</span>
              <p className="footer-brand-signature">
                Современные свадьбы без шаблонов и навязчивых конкурсов.
              </p>
            </div>

            {/* Center Column: Navigation */}
            <div className="footer-col footer-nav">
              <span className="footer-label">Навигация</span>
              <ul className="footer-nav-list">
                <li><a href="#about" className="footer-link">Обо мне</a></li>
                <li><a href="#about" className="footer-link">Формат работы</a></li>
                <li><a href="#quiz" className="footer-link">Стоимость</a></li>
                <li><a href="#videos" className="footer-link">Фото и видео</a></li>
                <li><a href="#contacts" className="footer-link">Контакты</a></li>
              </ul>
            </div>

            {/* Right Column: Contacts */}
            <div className="footer-col footer-contacts">
              <span className="footer-label">Контакты</span>
              <ul className="footer-contact-list">
                <li>
                  <a href="tel:+79185132940" className="footer-link footer-contact-phone">
                    8 (918) 513-29-40
                  </a>
                </li>
                <li>
                  <a href="https://t.me/VladislavDagaldiev" target="_blank" rel="noopener noreferrer" className="footer-link">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/79185132940" target="_blank" rel="noopener noreferrer" className="footer-link">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/vladislavdagaldiev" target="_blank" rel="noopener noreferrer" className="footer-link">
                    Instagram*
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section with legal notes and copyright */}
          <div className="footer-bottom">
            <div className="footer-bottom-info">
              <p className="copyright-text">
                © 2026 Владислав. Все права защищены.
              </p>
              <p className="instagram-note">
                *Компания Meta признана экстремистской на территории РФ
              </p>
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy" className="footer-bottom-link">Политика конфиденциальности</a>
              <span className="bullet-separator">•</span>
              <a href="#consent" className="footer-bottom-link">Согласие на обработку персональных данных</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

