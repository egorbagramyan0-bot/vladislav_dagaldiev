import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import PageTransitionLoader from './components/PageTransitionLoader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Videos from './components/Videos'
import Quiz from './components/Quiz'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import PrivacyPage from './components/PrivacyPage'
import ConsentPage from './components/ConsentPage'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with premium expo-out easing curve
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false, // Keep native touch scrolling on mobile to respect gestures
      infinite: false,
    })

    // 2. Setup ResizeObserver with debounce to update Lenis when the page height changes (e.g. FAQ accordions open/close, images load, etc.) without layout thrashing
    let resizeTimeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        lenisInstance.resize()
      }, 100)
    })
    resizeObserver.observe(document.body)

    // 3. Setup the native requestAnimationFrame rendering loop for Lenis
    // to align scroll calculations with the browser's refresh rate and event timestamps.
    let rafId
    const updateScroll = (time) => {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(updateScroll)
    }
    rafId = requestAnimationFrame(updateScroll)

    // 4. Intercept link clicks to route inside the app or scroll smoothly
    const handleLinkClick = (e) => {
      const targetLink = e.target.closest('a')
      if (!targetLink) return

      const href = targetLink.getAttribute('href')
      if (!href) return

      if (href.startsWith('#')) {
        if (href === '#') return
        if (window.location.pathname !== '/') {
          e.preventDefault()
          window.history.pushState({}, '', '/')
          setCurrentPath('/')
          setTimeout(() => {
            const targetEl = document.querySelector(href)
            if (targetEl && lenisInstance) {
              lenisInstance.scrollTo(targetEl, {
                offset: 0,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
              })
            }
          }, 100)
        } else {
          const targetEl = document.querySelector(href)
          if (targetEl) {
            e.preventDefault()
            lenisInstance.scrollTo(targetEl, {
              offset: 0,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            })
          }
        }
      } else if (href.startsWith('/')) {
        e.preventDefault()
        window.history.pushState({}, '', href)
        setCurrentPath(href)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    document.addEventListener('click', handleLinkClick)
    window.addEventListener('popstate', handlePopState)

    // 5. Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimeout)
      lenisInstance.destroy()
      resizeObserver.disconnect()
      document.removeEventListener('click', handleLinkClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // 6. Setup Intersection Observer for premium scroll reveals on path change
  // (ensures elements are re-observed when components remount on navigation back to '/')
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          revealObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -8% 0px'
    })

    // Delay scan slightly to let all React DOM components render completely
    const timerId = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-element')
      elements.forEach((el) => revealObserver.observe(el))
    }, 250)

    return () => {
      clearTimeout(timerId)
      revealObserver.disconnect()
    }
  }, [currentPath])

  return (
    <>
      <PageTransitionLoader />
      {currentPath !== '/privacy' && currentPath !== '/consent' && <Navbar />}
      {currentPath === '/privacy' ? (
        <PrivacyPage setCurrentPath={setCurrentPath} />
      ) : currentPath === '/consent' ? (
        <ConsentPage setCurrentPath={setCurrentPath} />
      ) : (
        <main>
          <Hero />
          <About />
          <Videos />
          <Quiz />
          <Reviews />
          <FAQ />
        </main>
      )}
      <Footer />
    </>
  )
}

export default App

