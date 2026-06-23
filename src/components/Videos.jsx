import { useState, useRef, useEffect } from 'react';
import './Videos.css';

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showNavigation, setShowNavigation] = useState(false);
  const sliderRef = useRef(null);

  // References and variables for high-quality interactive carousel drag
  const marqueeRef = useRef(null);
  const trackRef = useRef(null); // Ref for marquee-track to apply transform directly
  const isDragging = useRef(false);
  const dragged = useRef(false); // Flag to distinguish clicks from drags
  const isHovered = useRef(false);
  const startX = useRef(0);
  const startTranslateX = useRef(0); // Store initial translate on drag start
  const translateXRef = useRef(0); // Store current translate
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const currentSpeedRef = useRef(0.8); // Default autoScrollSpeed
  const wrapWidthRef = useRef(0); // Exact pixel width of one photo set including gaps
  const isMarqueeVisibleRef = useRef(true); // Track marquee viewport visibility

  const getVideoUrl = (path) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return path;
    }
    return `https://media.githubusercontent.com/media/egorbagramyan0-bot/vladislav_dagaldiev/main/public${path}`;
  };

  const videoClips = [
    {
      id: 1,
      title: "Зачем ходить на\u00a0встречу с\u00a0ведущим",
      category: "Полезно знать",
      videoUrl: "/video/video1.mp4",
      posterUrl: "/pre1.webp"
    },
    {
      id: 2,
      title: "Что ведущий должен делать на\u00a0встрече",
      category: "Подготовка",
      videoUrl: "/video/video2.mp4",
      posterUrl: "/pre2.webp"
    },
    {
      id: 3,
      title: "Какие интерактивы будут на\u00a0мероприятии",
      category: "Программа вечера",
      videoUrl: "/video/video3.mp4",
      posterUrl: "/pre3.webp"
    },
    {
      id: 4,
      title: "Церемония",
      category: "Подарок",
      videoUrl: "/video/ceremony.mp4",
      posterUrl: "/vid4.webp"
    }
  ];

  const photoSlides = [
    { id: 1, src: '/gallery/6932b3bd-d4a6-4984-b892-e95dacbf01d8.webp', title: 'Эмоции', desc: 'Живой смех и\u00a0искренние улыбки гостей' },
    { id: 2, src: '/gallery/81de910e-fd63-4473-9677-58d0d891eba7.webp', title: 'Детали', desc: 'Каждая деталь имеет значение' },
    { id: 3, src: '/gallery/a3f9d227-c77e-423c-b4d1-ed58b1fa9bb1.webp', title: 'Регистрация', desc: 'Волнительный момент в\u00a0начале события' },
    { id: 4, src: '/gallery/c23ed83a-6fa7-4f68-963a-4f1be6b55fc1.webp', title: 'Внимание', desc: 'Индивидуальный подход к\u00a0каждому гостю' },
    { id: 5, src: '/gallery/d2ccf93b-f40e-4301-9e54-e7582bcf1225.webp', title: 'Презентация', desc: 'Современные и\u00a0яркие визуальные решения' },
    { id: 6, src: '/gallery/dba17edd-4515-434a-8d58-0ac597c91f04.webp', title: 'Коннект', desc: 'Лёгкое общение и\u00a0дружеская атмосфера' },
    { id: 7, src: '/gallery/banket-253.webp', title: 'Атмосфера', desc: 'Стильное оформление вечернего зала' },
    { id: 8, src: '/gallery/banket-256.webp', title: 'Вечер', desc: 'Уютное и\u00a0теплое семейное торжество' },
    { id: 9, src: '/gallery/banket-325.webp', title: 'Динамика', desc: 'Держим темп и\u00a0настроение праздника' },
    { id: 10, src: '/gallery/banket-398.webp', title: 'Интерактив', desc: 'Улыбки, живой смех и\u00a0сплочение гостей' },
    { id: 11, src: '/gallery/banket-52.webp', title: 'Событие', desc: 'Яркие эмоции на\u00a0протяжении всего вечера' },
    { id: 12, src: '/gallery/banket-73.webp', title: 'Танцпол', desc: 'Искренние эмоции героев вечера на\u00a0танцах' },
    { id: 13, src: '/gallery/banket-79.webp', title: 'Финал', desc: 'Красивое и\u00a0запоминающееся завершение праздника' }
  ];

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  const openLightbox = (video) => {
    setActiveVideo(video);
  };

  const closeLightbox = () => {
    setActiveVideo(null);
  };

  // Measure exact wrap boundary based on the position of the first element of duplicate set
  const updateWrapWidth = () => {
    if (trackRef.current) {
      const track = trackRef.current;
      const len = photoSlides.length;
      if (track.children && track.children.length >= len + 1) {
        wrapWidthRef.current = track.children[len].offsetLeft;
      } else {
        wrapWidthRef.current = track.scrollWidth / 2;
      }
    }
  };

  // High-quality drag and momentum functions
  const handleDragStart = (clientX) => {
    isDragging.current = true;
    dragged.current = false;
    startX.current = clientX;
    startTranslateX.current = translateXRef.current;
    velocity.current = 0;
    lastX.current = clientX;
    lastTime.current = performance.now();
    if (marqueeRef.current) {
      marqueeRef.current.classList.add('grabbing');
    }
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current || !trackRef.current) return;
    const track = trackRef.current;
    const dx = clientX - startX.current;
    
    if (Math.abs(dx) > 5) {
      dragged.current = true;
    }
    
    let targetTranslate = startTranslateX.current - dx;
    const W = wrapWidthRef.current || (track.scrollWidth / 2);

    if (W > 0) {
      if (targetTranslate >= W) {
        targetTranslate -= W;
        startTranslateX.current = targetTranslate;
        startX.current = clientX;
      } else if (targetTranslate < 0) {
        targetTranslate += W;
        startTranslateX.current = targetTranslate;
        startX.current = clientX;
      }
      translateXRef.current = targetTranslate;
      // Round translate3d pixel value to completely eliminate subpixel rendering stutters
      track.style.transform = `translate3d(${-Math.round(targetTranslate)}px, 0, 0)`;
    }

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      // Calculate velocity in pixels per frame
      const instantVelocity = (lastX.current - clientX) / (dt / 16.667);
      velocity.current = velocity.current * 0.65 + instantVelocity * 0.35;
    }
    lastX.current = clientX;
    lastTime.current = now;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (marqueeRef.current) {
      marqueeRef.current.classList.remove('grabbing');
    }
    const maxVel = 20;
    const limitedVelocity = Math.max(-maxVel, Math.min(maxVel, velocity.current));
    currentSpeedRef.current = limitedVelocity;

    // Retain dragged state for a small timeout (50ms) to allow the click handler
    // to intercept the native click immediately after a drag event.
    if (dragged.current) {
      setTimeout(() => {
        dragged.current = false;
      }, 50);
    }
  };

  const handlePhotoClick = (photo) => {
    if (dragged.current) return; // Ignore clicks resulting from drags
    setActivePhoto(photo);
  };

  const onMouseDown = (e) => {
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e) => {
    handleDragMove(e.clientX);
  };
  const onMouseUp = () => {
    handleDragEnd();
  };
  const onMouseLeave = () => {
    isHovered.current = false;
    handleDragEnd();
  };
  const onMouseEnter = () => {
    isHovered.current = true;
  };

  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      let ticking = false;
      const throttledCheckScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (sliderRef.current) {
              const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
              setCanScrollLeft(scrollLeft > 10);
              setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
              setShowNavigation(scrollWidth > clientWidth + 10);
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      slider.addEventListener('scroll', throttledCheckScroll);
      throttledCheckScroll();
      
      // Delay initial check to ensure DOM rendering completes
      const timer = setTimeout(throttledCheckScroll, 300);

      window.addEventListener('resize', throttledCheckScroll);
      return () => {
        slider.removeEventListener('scroll', throttledCheckScroll);
        window.removeEventListener('resize', throttledCheckScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  // Update wrapWidth boundaries on mount/resize
  useEffect(() => {
    updateWrapWidth();
    window.addEventListener('resize', updateWrapWidth);
    
    // Safety triggers after rendering
    const timer1 = setTimeout(updateWrapWidth, 400);
    const timer2 = setTimeout(updateWrapWidth, 1000);

    return () => {
      window.removeEventListener('resize', updateWrapWidth);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Intersection Observer to monitor marquee container visibility
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isMarqueeVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(marquee);

    return () => {
      observer.disconnect();
    };
  }, []);

  // requestAnimationFrame continuous auto-scroll loop with deceleration support
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId;
    const autoScrollSpeed = 0.8;

    const loop = () => {
      // Completely pause loop execution when the marquee is out of view (task/battery/performance efficiency)
      if (isMarqueeVisibleRef.current && !isDragging.current) {
        const W = wrapWidthRef.current;
        if (W > 0) {
          let nextTranslate = translateXRef.current + currentSpeedRef.current;
          if (nextTranslate >= W) {
            nextTranslate -= W;
          } else if (nextTranslate < 0) {
            nextTranslate += W;
          }
          translateXRef.current = nextTranslate;
          // Round translate3d pixel value to completely eliminate subpixel rendering stutters
          track.style.transform = `translate3d(${-Math.round(nextTranslate)}px, 0, 0)`;
        }

        // Softly decelerate to a stop on hover, or accelerate/decelerate to default speed on hover leave
        const targetSpeed = isHovered.current ? 0 : autoScrollSpeed;
        if (Math.abs(currentSpeedRef.current - targetSpeed) > 0.05) {
          currentSpeedRef.current = currentSpeedRef.current * 0.95 + targetSpeed * 0.05;
        } else {
          currentSpeedRef.current = targetSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
        setActivePhoto(null);
      }
    };

    if (activeVideo || activePhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo, activePhoto]);

  return (
    <section id="videos" className="videos-section">
      <div className="container">
        <div className="videos-header reveal-element">
          <span className="videos-label">Media</span>
          <h2 className="videos-title">Фото и видео</h2>
        </div>
        <div className="videos-carousel-wrapper reveal-element">
          {showNavigation && (
            <>
              <button 
                className={`video-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`} 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Назад"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-arrow-svg">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                className={`video-nav-btn next ${!canScrollRight ? 'disabled' : ''}`} 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Вперед"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-arrow-svg">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}

          <div className="videos-carousel" ref={sliderRef}>
            {videoClips.map((video) => (
              <div 
                key={video.id} 
                className="video-carousel-card"
                onClick={() => openLightbox(video)}
              >
                <div className="video-card-inner">
                  {/* Poster/Thumbnail */}
                  <img src={video.posterUrl} alt={video.title} className="video-card-poster" />
                  
                  {/* Dark overlay & Play Button */}
                  <div className="video-card-overlay">
                    <div className="video-play-btn-circle">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="video-play-btn-svg">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="video-card-caption">
                    <span className="video-card-category">{video.category}</span>
                    <h3 className="video-card-title">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery Marquee Section - Full width infinite scroll */}
      <div className="photos-gallery-section reveal-element">
        <div className="container">
          <div className="gallery-header">
            <span className="gallery-category">Галерея</span>
            <h2 className="gallery-title">{"Атмосфера в\u00a0деталях"}</h2>
          </div>
        </div>
        
        <div 
          className="marquee-container"
          ref={marqueeRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="marquee-track" ref={trackRef}>
            {/* First set of photos */}
            {photoSlides.map((photo) => (
              <div 
                key={`p1-${photo.id}`} 
                className="gallery-card"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="gallery-card-inner">
                  <img 
                    src={photo.src} 
                    alt={photo.title} 
                    className="gallery-img"
                    draggable="false"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('img-error');
                    }}
                  />
                  <div className="gallery-placeholder-content">
                    <div className="placeholder-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <span className="placeholder-label">{photo.title}</span>
                  </div>
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-zoom-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set of photos for seamless infinite scroll */}
            {photoSlides.map((photo) => (
              <div 
                key={`p2-${photo.id}`} 
                className="gallery-card"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="gallery-card-inner">
                  <img 
                    src={photo.src} 
                    alt={photo.title} 
                    className="gallery-img"
                    draggable="false"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('img-error');
                    }}
                  />
                  <div className="gallery-placeholder-content">
                    <div className="placeholder-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <span className="placeholder-label">{photo.title}</span>
                  </div>
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-zoom-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Video Player Modal */}
      {activeVideo && (
        <div className="video-lightbox" onClick={closeLightbox}>
          <div className="lightbox-backdrop"></div>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lightbox-close-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="lightbox-content">
              <video 
                src={getVideoUrl(activeVideo.videoUrl)} 
                controls 
                autoPlay 
                playsInline
                className="lightbox-player"
              />
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Photo Viewer Modal */}
      {activePhoto && (
        <div className="video-lightbox" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-backdrop"></div>
          <div className="lightbox-container photo-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lightbox-close-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="lightbox-content">
              <div className="lightbox-photo-wrapper">
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.title} 
                  className="lightbox-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('img-error');
                  }}
                />
                <div className="gallery-placeholder-content lightbox-placeholder">
                  <div className="placeholder-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <span className="placeholder-label">{activePhoto.title}</span>
                  <span className="placeholder-desc">{activePhoto.desc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
