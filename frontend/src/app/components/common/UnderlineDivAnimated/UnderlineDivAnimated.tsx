'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styles from './UnderlineDivAnimated.module.css'

interface UnderlineDivAnimatedProps extends React.HTMLProps<HTMLDivElement> {
  animationDuration?: string;
  gap?: number;
  reduceWidthBy?: number
  color?: string
}


const UnderlineDivAnimated: React.FC<UnderlineDivAnimatedProps> = (props) => {
  const { animationDuration, gap, reduceWidthBy, color, children, ...divProps } = props;
  const underlineDiv = useRef<HTMLDivElement>(null)

  function wrapTextWithDiv(children: ReactNode): ReactNode {
    return React.Children.map(children, child => {
      if (typeof child === 'string') {
        // Wrap and append div to text
        return (
          <React.Fragment>
            <span style={{position:'relative', top:'2px'}}>{child}</span>
            <div ref={underlineDiv} className={styles.navUnderline} style={{top: gap ? `${gap}px` : '0', maxWidth: reduceWidthBy ? `calc(100% - ${reduceWidthBy}px)`: '100%', backgroundColor: color ? color : 'white'}}/>
          </React.Fragment>
        );
      } else if (React.isValidElement(child) && child.props.children) {
        // Recursively handle child components that have children
        return React.cloneElement(child, {
          ...child.props,
          children: wrapTextWithDiv(child.props.children)
        });
      }
      return child;
    });
  }

  const handleNavHover = (isHovered:boolean) => {
    if (underlineDiv.current) {
      isHovered ? underlineDiv.current.classList.add(styles.navUnderlineActive) : underlineDiv.current.classList.remove(styles.navUnderlineActive)
    }
  }
  return (
    <div 
          {...divProps}
          className={styles.container}
          onMouseOver={() => handleNavHover(true)}
          onMouseOut={() => handleNavHover(false)}
          >
            {wrapTextWithDiv(children)}
        </div>
  )
}

export default UnderlineDivAnimated