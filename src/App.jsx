import React, { useEffect } from 'react'
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

function App() {
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with premium expo-out easing curve
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.9,
      smoothTouch: false, // Keep native touch scrolling on mobile to respect gestures
      infinite: false,
    })

    // 2. Setup the requestAnimationFrame rendering loop
    let rafId;
    function raf(time) {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // 3. Setup Intersection Observer for premium scroll reveals
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

    // 4. Intercept anchor links navigation to slide dynamically via Lenis scroll
    const handleAnchorClick = (e) => {
      const targetLink = e.target.closest('a[href^="#"]')
      if (!targetLink) return

      const href = targetLink.getAttribute('href')
      if (href === '#') return

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

    document.addEventListener('click', handleAnchorClick)

    // 5. Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
      lenisInstance.destroy()
      revealObserver.disconnect()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <>
      <PageTransitionLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Videos />
        <Quiz />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App

