'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './HeroSection.module.css'
import UnderlineDivAnimated from '../common/UnderlineDivAnimated/UnderlineDivAnimated'

const HeroSection = () => {
  const taglines:string[] = [
    'Step Into Your Unique Style ',
    'New Cloud9 Collection Available ',
    'Global Shipping '
  ]
  const [currentTagline, setCurrentTagline] = useState<string>(taglines[0])
  const [currentTaglineText, setCurrentTaglineText] = useState<string>('')
  const [showCaret, setShowCaret] = useState<boolean>(false)
  const currentTaglineRef = useRef<string>('')
  const currentTaglineTextRef = useRef<string>('')
  const subHeaderCompleteRef = useRef<boolean>(false)
  const subHeaderRefreshRef = useRef<boolean>(false)
  const subHeaderIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    currentTaglineRef.current = currentTagline
  }, [currentTagline])
  
  useEffect(() => {
    currentTaglineTextRef.current = currentTaglineText
  }, [currentTaglineText])

  const handleTaglineChangeFWD = () => {
    const currentLength = currentTaglineTextRef.current.length
    const maxLength = currentTaglineRef.current.length
    if (currentLength < maxLength) {
      const newTagline = currentTaglineRef.current.substring(0, currentLength + 1)
      setCurrentTaglineText(newTagline)
    }
    else {
      if (!subHeaderCompleteRef.current) {
        subHeaderCompleteRef.current = true
        setTimeout(() => {
          subHeaderRefreshRef.current = true
        }, 2000);
      }
      else if (subHeaderRefreshRef.current) {
        clearInterval(subHeaderIntervalRef.current)
        const totalTaglines = taglines.length
        const currentTaglineIndex = taglines.indexOf(currentTaglineRef.current)
        const newTaglineIndex = currentTaglineIndex !== totalTaglines - 1 ? currentTaglineIndex + 1 : 0
        // setCurrentTaglineText('')
        // setCurrentTagline(taglines[newTaglineIndex])
        subHeaderCompleteRef.current = false
        subHeaderRefreshRef.current = false
        subHeaderIntervalRef.current = setInterval(handleTaglineChangeRV, 50)
      }

    }
  }

  const handleTaglineChangeRV = () => {
    const currentLength = currentTaglineTextRef.current.length
    const maxLength = currentTaglineRef.current.length
    if (currentLength > 0) {
      const newTagline = currentTaglineRef.current.substring(0, currentLength - 1)
      setCurrentTaglineText(newTagline)
    }
    else if (currentLength === 0) {
      clearInterval(subHeaderIntervalRef.current)
      const totalTaglines = taglines.length
      const currentTaglineIndex = taglines.indexOf(currentTaglineRef.current)
      const newTaglineIndex = currentTaglineIndex !== totalTaglines - 1 ? currentTaglineIndex + 1 : 0
      setCurrentTaglineText('')
      setCurrentTagline(taglines[newTaglineIndex])
      subHeaderIntervalRef.current = setInterval(handleTaglineChangeFWD, 100)
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowCaret(true)
      subHeaderIntervalRef.current = setInterval(handleTaglineChangeFWD, 100)
    }, 1500);
    return(() => {
      clearTimeout(timeOut)
      clearInterval(subHeaderIntervalRef.current)
    })
  }, [])

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroImageContainer} 
      // style={{backgroundImage: "url('/hero.webp')"}}
      >
        <div className={styles.videoContainer}>
          <video className={styles.video} src="/clouds_mountain_anim_compressed.mp4" autoPlay loop muted ></video>
        </div>
      </div>
      <div className={styles.heroTextContainer}>
        <h2 className={styles.subTagline}>{currentTaglineTextRef.current}{showCaret && <span className={styles.cursor}/>}</h2>
        <div className={styles.headingContainer}>
          <h1 className={styles.heroText}>Elevate your look with</h1>
          <h1 className={styles.heroText}>Rize Apparel</h1>
        </div>
        <div className={styles.btnContainer}>
          <UnderlineDivAnimated style={{width:'50%'}} gap={4} reduceWidthBy={30} color='var(--color-warm-beige)'>
            <button className={`${styles.btn} ${styles.btnLeft}`} onClick={() => window.location.assign('/products')}>Explore the Collection</button>
          </UnderlineDivAnimated>
          <UnderlineDivAnimated style={{width:'50%'}} gap={4} reduceWidthBy={30}>
            <button className={`${styles.btn} ${styles.btnRight}`} style={{backgroundColor: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)'}} onClick={() => window.location.assign('/register')}>Join the Rize</button>
          </UnderlineDivAnimated>
        </div>
      </div>

    </div>
  )
}

export default HeroSection