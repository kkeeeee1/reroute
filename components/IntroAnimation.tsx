'use client'

import {motion, AnimatePresence} from 'framer-motion'
import Image from 'next/image'
import {useEffect, useState, useRef} from 'react'

const TEXT_LINES = [
  "WE DON'T JUST",
  "SOLVE PROBLEMS,",
  "WE REROUTE THEM"
]
const TYPING_SPEED = 50 // ms per character
const PAUSE_AFTER_TYPING = 800 // ms
const LOGO_TRANSITION_DURATION = 1000 // ms
const BACKGROUND_SLIDE_DURATION = 800 // ms

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [displayedLines, setDisplayedLines] = useState<string[]>(['', '', ''])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [startLogoTransition, setStartLogoTransition] = useState(false)
  const [startBackgroundSlide, setStartBackgroundSlide] = useState(false)
  const [logoPosition, setLogoPosition] = useState({top: 0, left: 0, width: 0, height: 0})
  const hasShownRef = useRef(false)

  useEffect(() => {
    // Only show on actual page load/refresh, not on client-side navigation
    if (hasShownRef.current) {
      return
    }

    hasShownRef.current = true
    setIsVisible(true)

    // Get header logo position for transition target
    const updateLogoPosition = () => {
      const headerLogo = document.getElementById('header-logo')
      if (headerLogo) {
        const img = headerLogo.querySelector('img')
        if (img) {
          const rect = img.getBoundingClientRect()
          setLogoPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          })
        }
      }
    }

    // Update position initially and on resize
    updateLogoPosition()
    window.addEventListener('resize', updateLogoPosition)

    // Typing animation for multiple lines
    let lineIndex = 0
    let charIndex = 0
    
    const typingInterval = setInterval(() => {
      const currentLine = TEXT_LINES[lineIndex]
      
      if (charIndex < currentLine.length) {
        // Type next character
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[lineIndex] = currentLine.slice(0, charIndex + 1)
          return newLines
        })
        setCurrentLineIndex(lineIndex)
        charIndex++
      } else if (lineIndex < TEXT_LINES.length - 1) {
        // Move to next line
        lineIndex++
        charIndex = 0
        setCurrentLineIndex(lineIndex)
      } else {
        // All lines complete
        clearInterval(typingInterval)
        setIsTypingComplete(true)
        
        // Step 1: Typing complete, pause, then start logo transition
        setTimeout(() => {
          // Update logo position right before transition
          updateLogoPosition()
          setStartLogoTransition(true)
          
          // Step 2: After logo reaches position, start background slide
          setTimeout(() => {
            setStartBackgroundSlide(true)
            
            // Step 3: Hide intro after background slides up
            setTimeout(() => {
              setIsVisible(false)
            }, BACKGROUND_SLIDE_DURATION + 100)
          }, LOGO_TRANSITION_DURATION)
        }, PAUSE_AFTER_TYPING)
      }
    }, TYPING_SPEED)

    return () => {
      clearInterval(typingInterval)
      window.removeEventListener('resize', updateLogoPosition)
    }
  }, [])

  if (!isVisible) return null

  // Calculate transform for logo transition
  const getLogoTransform = () => {
    if (!startLogoTransition) return {x: 0, y: 0, scale: 1}
    
    // Get the current position of the intro logo (after being pushed by text)
    const introLogo = document.querySelector('[data-intro-logo="true"]') as HTMLElement
    if (!introLogo) return {x: 0, y: 0, scale: 1}
    
    const introRect = introLogo.getBoundingClientRect()
    const introCenterX = introRect.left + introRect.width / 2
    const introCenterY = introRect.top + introRect.height / 2
    
    // Target: center of header logo
    const targetCenterX = logoPosition.left + logoPosition.width / 2
    const targetCenterY = logoPosition.top + logoPosition.height / 2
    
    // Calculate translation from intro logo's CURRENT position to header logo position
    const deltaX = targetCenterX - introCenterX
    const deltaY = targetCenterY - introCenterY
    
    // Calculate scale
    const scale = logoPosition.width / introRect.width
    
    return {x: deltaX, y: deltaY, scale}
  }

  const transform = getLogoTransform()

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Background that fades out - only after logo reaches position */}
          <motion.div
            initial={{opacity: 1}}
            animate={{opacity: startBackgroundSlide ? 0 : 1}}
            exit={{opacity: 0}}
            transition={{
              opacity: {
                duration: BACKGROUND_SLIDE_DURATION / 1000,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-[100] bg-navy"
          />

          {/* Content container - above background */}
          <motion.div
            initial={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 z-[110] flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center justify-center gap-8 px-5 md:gap-12 lg:gap-16">
              {/* 인트로 로고 - starts small, grows to header size while moving to position */}
              <motion.div
                data-intro-logo="true"
                initial={{opacity: 0, scale: 0.8}}
                animate={
                  startBackgroundSlide
                    ? {
                        // When background fades, use absolute positioning to keep logo fixed
                        opacity: 0,
                        position: 'fixed',
                        top: logoPosition.top,
                        left: logoPosition.left,
                        width: logoPosition.width,
                        height: logoPosition.height,
                        scale: 1,
                        x: 0,
                        y: 0,
                      }
                    : {
                        opacity: 1,
                        scale: transform.scale,
                        x: transform.x,
                        y: transform.y,
                      }
                }
                transition={{
                  opacity: {duration: 0.3, delay: 0},
                  scale: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  x: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    duration: LOGO_TRANSITION_DURATION / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  top: {duration: 0},
                  left: {duration: 0},
                  width: {duration: 0},
                  height: {duration: 0},
                }}
              >
                <Image
                  src="/images/logo_white.png"
                  alt="Reroute"
                  width={214}
                  height={59}
                  className="h-auto w-[80px] md:w-[120px] lg:w-[160px]"
                  priority
                />
              </motion.div>

              {/* 인트로 텍스트 - 3 lines, fades when logo starts moving */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: startLogoTransition ? 0 : 1}}
                transition={{duration: 0.3}}
                className="text-center"
              >
                {TEXT_LINES.map((line, index) => (
                  <p
                    key={index}
                    className="text-[30px] font-bold leading-[40px] text-white md:text-[60px] md:leading-[80px] lg:text-[90px] lg:leading-[120px]"
                  >
                    {displayedLines[index]}
                    {!isTypingComplete && currentLineIndex === index && (
                      <motion.span
                        animate={{opacity: [1, 0]}}
                        transition={{duration: 0.5, repeat: Infinity, repeatType: 'reverse'}}
                        className="inline-block"
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
