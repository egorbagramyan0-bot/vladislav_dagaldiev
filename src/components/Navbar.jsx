import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Manage body scroll lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  // Highlight active section on scroll - setup with safety timeout to ensure DOM mounting
  useEffect(() => {
    const sections = ['about', 'videos', 'quiz', 'reviews', 'faq', 'contacts'];
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -45% 0px', // More responsive detection window in upper half of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Run setup inside a brief timeout to guarantee sibling DOM nodes have mounted
    const timerId = setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 300);

    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__inner container">
          <a className="header__logo" href="#hero" onClick={() => handleNavClick('')}>
            Ведущий мероприятий
          </a>

          <nav className="header__nav" aria-label="Primary">
            <ul role="list" className="nav-list">
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'about' ? 'active' : ''}`} 
                  href="#about"
                  onClick={() => handleNavClick('about')}
                >
                  Обо мне
                </a>
              </li>
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'videos' ? 'active' : ''}`} 
                  href="#videos"
                  onClick={() => handleNavClick('videos')}
                >
                  Фото и видео
                </a>
              </li>
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'quiz' ? 'active' : ''}`} 
                  href="#quiz"
                  onClick={() => handleNavClick('quiz')}
                >
                  Стоимость
                </a>
              </li>
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'reviews' ? 'active' : ''}`} 
                  href="#reviews"
                  onClick={() => handleNavClick('reviews')}
                >
                  Отзывы
                </a>
              </li>
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'faq' ? 'active' : ''}`} 
                  href="#faq"
                  onClick={() => handleNavClick('faq')}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  className={`nav-list__link ${activeSection === 'contacts' ? 'active' : ''}`} 
                  href="#contacts"
                  onClick={() => handleNavClick('contacts')}
                >
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          <div className="header__controls">
            <div className="header__social">
              <ul role="list" className="social social--bare">
                <li>
                  <a 
                    className="social__link" 
                    href="https://t.me/VladislavDagaldiev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Telegram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.578.192l-8.533 7.701-.33 4.955c.488 0 .702-.223.974-.488l2.338-2.275 4.866 3.59c.897.495 1.542.24 1.765-.83l3.188-15.024c.327-1.31-.5-1.9-.136-1.422z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    className="social__link" 
                    href="https://wa.me/79185132940" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="WhatsApp"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                      <path d="M12.004 0C5.374 0 0 5.373 0 12.001c0 2.112.551 4.165 1.597 5.978L0 24l6.19-1.623c1.762.961 3.743 1.468 5.811 1.469 6.63 0 12.003-5.373 12.003-12.001C24.004 5.373 18.63 0 12.004 0zm0 22.02c-1.801 0-3.57-.482-5.115-1.396l-.367-.218-3.793.995 1.012-3.7-.238-.379c-.997-1.587-1.523-3.425-1.522-5.32 0-5.524 4.495-10.019 10.023-10.019 2.673 0 5.187 1.041 7.078 2.932 1.89 1.89 2.929 4.404 2.927 7.087-.004 5.526-4.5 10.018-10.025 10.018z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <button 
              type="button" 
              className="header__toggle" 
              onClick={() => setMenuOpen(true)} 
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Zero-JS style mobile menu overlay rendered cleanly in React */}
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <a 
          className="mobile-menu__logo" 
          href="#hero" 
          onClick={() => handleNavClick('')}
        >
          Ведущий мероприятий
        </a>
        <button 
          type="button" 
          className="mobile-menu__close" 
          onClick={() => setMenuOpen(false)} 
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/>
            <line x1="18.5" y1="5.5" x2="5.5" y2="18.5"/>
          </svg>
        </button>

        <nav className="mobile-menu__nav" aria-label="Mobile">
          <ul role="list">
            <li>
              <a href="#about" onClick={() => handleNavClick('about')}>Обо мне</a>
            </li>
            <li>
              <a href="#videos" onClick={() => handleNavClick('videos')}>Фото и видео</a>
            </li>
            <li>
              <a href="#quiz" onClick={() => handleNavClick('quiz')}>Стоимость</a>
            </li>
            <li>
              <a href="#reviews" onClick={() => handleNavClick('reviews')}>Отзывы</a>
            </li>
            <li>
              <a href="#faq" onClick={() => handleNavClick('faq')}>FAQ</a>
            </li>
            <li>
              <a href="#contacts" onClick={() => handleNavClick('contacts')}>Контакты</a>
            </li>
          </ul>
        </nav>

        <div className="mobile-menu__footer">
          <div className="mobile-menu__social">
            <ul role="list" className="social social--bare">
              <li>
                <a 
                  className="social__link" 
                  href="https://t.me/VladislavDagaldiev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Telegram"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.578.192l-8.533 7.701-.33 4.955c.488 0 .702-.223.974-.488l2.338-2.275 4.866 3.59c.897.495 1.542.24 1.765-.83l3.188-15.024c.327-1.31-.5-1.9-.136-1.422z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  className="social__link" 
                  href="https://wa.me/79185132940" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M12.004 0C5.374 0 0 5.373 0 12.001c0 2.112.551 4.165 1.597 5.978L0 24l6.19-1.623c1.762.961 3.743 1.468 5.811 1.469 6.63 0 12.003-5.373 12.003-12.001C24.004 5.373 18.63 0 12.004 0zm0 22.02c-1.801 0-3.57-.482-5.115-1.396l-.367-.218-3.793.995 1.012-3.7-.238-.379c-.997-1.587-1.523-3.425-1.522-5.32 0-5.524 4.495-10.019 10.023-10.019 2.673 0 5.187 1.041 7.078 2.932 1.89 1.89 2.929 4.404 2.927 7.087-.004 5.526-4.5 10.018-10.025 10.018z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
