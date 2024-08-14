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
      <Navbar/>
      {dimensions && dimensions.x >= 960 ? 
        <Desktop/>
        :
        <Mobile/>
      }
    </>
  )
}

const Mobile = () => (
  <>
    <ProductHeader/>
    <ProductImage/>
    <ProductActions/>
  </>
)
const Desktop = () => (
  <>
    <h1>Dekstop</h1>
  </>
)

export default PageClientSide