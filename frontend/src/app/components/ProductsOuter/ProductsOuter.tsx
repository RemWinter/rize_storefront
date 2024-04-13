'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ProductsOuter.module.css'
import { Button, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setSelectedTab } from '../redux/sidebarSlice'


interface Dimentions {
  x:number;
  y:number;
}
const ProductsOuter = () => {
  const dispatch = useAppDispatch()
  const {dimensions} = useAppSelector(state => state.globalSlice)
  const {selectedTab} = useAppSelector(state => state.sidebarSlice)
  const [windowDimensions, setWindowDimension] = useState<Dimentions>({x:window.innerWidth, y:window.innerHeight})
  const subHeader = useRef<HTMLDivElement>(null)
  useEffect(() => {
    dimensions && setWindowDimension(dimensions)
  }, [dimensions])

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
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Clothing</h1>
        <h1 ref={subHeader} className={styles.subHeader}>{selectedTab}</h1>
      </div>
      <div style={{display:'flex', flexDirection: 'column', position:'relative', height: '100%'}}>
        { windowDimensions.x < 960 ?
        <div className={styles.sideScrollContainer}>
          {categories.map((item, i) => (
            <button
              key={i} 
              className={styles.categoryBtn}
              onClick={() => handleTabChange(item.category)}
            >{item. category}</button>
          ))}
        </div> 
        : 
        <div className={styles.desktopContainer}>
          {categories.map((item, i) => (
            <button 
              key={i}
              className={styles.categoryBtn}
              onClick={() => handleTabChange(item.category)}
            >{item.category}</button>
          ))}
        </div>
        }
      </div>
    </div>
  )
}

export default ProductsOuter