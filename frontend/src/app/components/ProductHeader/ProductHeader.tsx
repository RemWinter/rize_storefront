import React from 'react'
import styles from './ProductHeader.module.css'
import { data } from '@/app/api/dummyData'

const ProductHeader = () => {
  const testData = data[2]

  const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => (
    Math.round(100-100*discountPrice/originalPrice)
  )

  return (
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>{testData.title}</h2>
        <h2 className={styles.description}>{testData.description}</h2>
      </div>
      <div className={styles.pricingDiv}>
        {testData.discountPrice ? 
        <>
         <h2 className={styles.price}>£{testData.discountPrice}</h2>
         <h2 className={`${styles.discountActive} ${styles.price}`}>£{testData.price}</h2>
         <h2 className={styles.discountPercentage}>{calculateDiscountPercentage(testData.price, testData.discountPrice)}% off</h2>
        </>
         : 
         <h2 className={styles.price}>£{testData.price}</h2>
        }
      </div>
    </div>
  )
}

export default ProductHeader