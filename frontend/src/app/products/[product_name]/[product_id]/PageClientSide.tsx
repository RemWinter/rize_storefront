'use client'
import Navbar from '@/app/components/Navbar/Navbar'
import ProductActions from '@/app/components/ProductActions/ProductActions'
import ProductHeader from '@/app/components/ProductHeader/ProductHeader'
import ProductImage from '@/app/components/ProductImage/ProductImage'
import { globalSlice } from '@/app/components/redux/globalSlice'
import { store, useAppDispatch, useAppSelector } from '@/app/components/redux/store'
import { useWindowDimensions } from '@/app/utils/helperFns'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import styles from './page.module.css'

const PageClientSide = () => {

  return (
    <Provider store={store}>
      <Content/>
    </Provider>
  )
}

const Content = () => {
  const dispatch = useAppDispatch()
  const {dimensions} = useAppSelector(state => state.globalSlice)

  useWindowDimensions()

  return (
    <>
      {dimensions &&
        <>
          <Navbar/>
          {dimensions && dimensions.x >= 960 ? 
            <Desktop/>
            :
            <Mobile/>}
          
        </>
      }
    </>
  )
}

const Mobile = () => (
  <>
    <ProductHeader/>
    <ProductImage page={'mobile'}/>
    <ProductActions/>
  </>
)
const Desktop = () => (
  <div className={styles.desktopContainer}>
    <ProductImage page={'desktop'}/>
    <div className={styles.containerRight}>
      <ProductHeader/>
      <ProductActions/>
    </div>
  </div>
)

export default PageClientSide