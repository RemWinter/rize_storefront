import React from 'react'
import styles from './HeroSection.module.css'
import UnderlineDivAnimated from '../common/UnderlineDivAnimated/UnderlineDivAnimated'

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
          <UnderlineDivAnimated style={{width:'50%'}} gap={4} reduceWidthBy={30} color='var(--color-warm-beige)'>
            <button className={styles.btn}>Explore the Collection</button>
          </UnderlineDivAnimated>
          <UnderlineDivAnimated style={{width:'50%'}} gap={4} reduceWidthBy={30}>
            <button className={styles.btn} style={{backgroundColor: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)'}}>Join the Rize</button>
          </UnderlineDivAnimated>
        </div>
      </div>

    </div>
  )
}

export default HeroSection