'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ProductsOuter.module.css'
import { Button, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setSelectedTab } from '../redux/sidebarSlice'
import ProudctsInner from '../ProudctsInner/ProudctsInner'
import InfiniteScroll from 'react-infinite-scroll-component'
import { headers } from 'next/headers'


interface Dimentions {
  x:number;
  y:number;
}
const ProductsOuter = () => {
  const dispatch = useAppDispatch()
  const {dimensions, scrollOffsetY, navVisible} = useAppSelector(state => state.globalSlice)
  const {selectedTab} = useAppSelector(state => state.sidebarSlice)
  const [windowDimensions, setWindowDimension] = useState<Dimentions>({x:window.innerWidth, y:window.innerHeight})
  const header = useRef<HTMLDivElement>(null)
  const subHeader = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null);
  const [headerIsSticky, setHeaderIsSticky] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;

      const rect = stickyRef.current.getBoundingClientRect();
      if (header.current && subHeader.current) {
        if (rect.top <= 24) {
          setHeaderIsSticky(true)
        } else {
          setHeaderIsSticky(false)
        }
      }
    };

    // Add scroll event listener to window or specific container
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    dimensions && setWindowDimension(dimensions)
  }, [dimensions])

  useEffect(() => {
    scrollOffsetY > 96 && !navVisible && setHeaderIsSticky(true)
  }, [scrollOffsetY, navVisible])

  const categories = [
    {category: selectedTab === 'Hoodies' ? 'Featured' : 'Hoodies'},
    {category: selectedTab === 'T-Shirts' ? 'Featured' : 'T-Shirts'},
    {category: selectedTab === 'Joggers' ? 'Featured' : 'Joggers'},
    {category: selectedTab === 'Shorts' ? 'Featured' : 'Shorts'}
  ]

  const handleTabChange = (newTab:string) => {
    dispatch(setSelectedTab(newTab))
    if (subHeader.current) {
      subHeader.current.classList.add(styles.subHeaderAnimation)
      const animationEndHandler = () => {
        subHeader.current?.classList.remove(styles.subHeaderAnimation);
        subHeader.current?.removeEventListener('animationend', animationEndHandler);
      };
  
      subHeader.current.addEventListener('animationend', animationEndHandler);
    }
  }

  return (
    <div className={styles.container}>
      <div 
        style={{height: navVisible ? '233px' : windowDimensions.x < 960 ? '123px' : '84px'}}
        className={styles.coverDiv}/>
      <InfiniteScroll
         dataLength={10}
         next={() => {}}
         hasMore={false}
         loader={<></>}
         style={{overflow:'visible', padding: '0 20px'}}>
        <div 
          ref={stickyRef}
          className={styles.headerContainer}
          style={{
            top: navVisible ? '120px' : '20px',
          }}>
          <h1 ref={header} className={styles.header} style={{fontSize: headerIsSticky ? '24px' : '40px'}}>Clothing</h1>
          <h1 ref={subHeader} className={styles.subHeader}>{selectedTab}</h1>
        </div>
        <div 
          className={styles.mainContainer}
          >
          { windowDimensions.x < 960 ?
          <>
            <div
              style={{
                top: navVisible ? '200px' : '90px',
              }}
              className={styles.sideScrollContainer}>
              {categories.map((item, i) => (
                <button
                  key={i} 
                  className={styles.categoryBtn}
                  onClick={() => handleTabChange(item.category)}
                >{item. category}</button>
              ))}
            </div> 
            <ProudctsInner/>
          </>
          : 
          <>
          <div className={styles.desktopContainer}>
            {categories.map((item, i) => (
              <button 
              key={i}
              className={styles.categoryBtn}
              onClick={() => handleTabChange(item.category)}
              >{item.category}</button>
              ))}
          </div>
          <ProudctsInner/>
          </>
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ProductsOuter