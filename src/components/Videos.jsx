import React, { useState, useRef, useEffect } from 'react';
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

  const videoClips = [
    {
      id: 1,
      title: "Зачем ходить на встречу с ведущим",
      category: "Полезно знать",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-a-forest-41604-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Что ведущий должен делать на встрече",
      category: "Подготовка",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-couple-dancing-at-their-wedding-reception-41618-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Какие интерактивы будут на мероприятии",
      category: "Программа вечера",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-groomsmen-and-groom-having-fun-before-wedding-41608-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Церемония",
      category: "Атмосфера праздника",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-41602-large.mp4",
      posterUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const photoSlides = [
    { id: 1, src: '/photo1.jpg', title: 'Регистрация', desc: 'Самый волнительный и трогательный момент свадебного дня' },
    { id: 2, src: '/photo2.jpg', title: 'Первый танец', desc: 'Искренние эмоции молодоженов на танцполе' },
    { id: 3, src: '/photo3.jpg', title: 'Интерактивы', desc: 'Улыбки, живой смех и сплочение гостей всех возрастов' },
    { id: 4, src: '/photo4.jpg', title: 'Детали вечера', desc: 'Особое внимание к декору и элементам оформления' },
    { id: 5, src: '/photo5.jpg', title: 'Объединение', desc: 'Лёгкая и тёплая атмосфера семейного торжества' },
    { id: 6, src: '/photo6.jpg', title: 'Яркий финал', desc: 'Красивое завершение вечера с бенгальскими огнями' },
  ];

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setShowNavigation(scrollWidth > clientWidth + 10);
    }
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (video) => {
    setActiveVideo(video);
  };

  const closeLightbox = () => {
    setActiveVideo(null);
  };

  // Measure exact wrap boundary based on the position of the 7th element (first of duplicate set)
  const updateWrapWidth = () => {
    if (trackRef.current) {
      const track = trackRef.current;
      if (track.children && track.children.length >= 7) {
        wrapWidthRef.current = track.children[6].offsetLeft;
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
        startTranslateX.current -= W;
        targetTranslate -= W;
        startX.current = clientX;
      } else if (targetTranslate < 0) {
        startTranslateX.current += W;
        targetTranslate += W;
        startX.current = clientX;
      }
      translateXRef.current = targetTranslate;
      track.style.transform = `translate3d(${-targetTranslate}px, 0, 0)`;
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
      slider.addEventListener('scroll', checkScroll);
      checkScroll();
      
      // Delay initial check to ensure DOM rendering completes
      const timer = setTimeout(checkScroll, 300);

      window.addEventListener('resize', checkScroll);
      return () => {
        slider.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
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

  // requestAnimationFrame continuous auto-scroll loop with deceleration support
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId;
    const autoScrollSpeed = 0.8;

    const loop = () => {
      if (!isDragging.current) {
        const W = wrapWidthRef.current || (track.scrollWidth / 2);
        if (W > 0) {
          let nextTranslate = translateXRef.current + currentSpeedRef.current;
          if (nextTranslate >= W) {
            nextTranslate -= W;
          } else if (nextTranslate < 0) {
            nextTranslate += W;
          }
          translateXRef.current = nextTranslate;
          track.style.transform = `translate3d(${-nextTranslate}px, 0, 0)`;
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
            <h3 className="gallery-title">Атмосфера в деталях</h3>
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
                src={activeVideo.videoUrl} 
                controls 
                autoPlay 
                playsInline
                className="lightbox-player"
              />
              <div className="lightbox-meta">
                <span className="lightbox-meta-category">{activeVideo.category}</span>
                <h4 className="lightbox-meta-title">{activeVideo.title}</h4>
              </div>
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
              <div className="lightbox-meta">
                <span className="lightbox-meta-category">Фотография</span>
                <h4 className="lightbox-meta-title">{activePhoto.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
