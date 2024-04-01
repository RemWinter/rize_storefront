import React from 'react'
import styles from './HeroSection.module.css'

const HeroSection = () => {
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
        <h2 className={styles.subTagline}>Step Into Your Unique Style</h2>
        <div className={styles.headingContainer}>
          <h1 className={styles.heroText}>Elevate your look with</h1>
          <h1 className={styles.heroText}>Rize Apparel</h1>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btn}>Explore the Collection</button>
          <button className={styles.btn} style={{backgroundColor: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)'}}>Join the Rize</button>
        </div>
      </div>

    </div>
  )
}

export default HeroSection