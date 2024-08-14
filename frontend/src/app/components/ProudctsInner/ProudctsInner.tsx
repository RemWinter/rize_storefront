'use client'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './ProductsInner.module.css'
import Image from 'next/image'
import { data } from '@/app/api/dummyData'

const ProudctsInner = () => {
  return (
    <div className={styles.container}>
      {/* <InfiniteScroll
        style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}
        dataLength={10}
        next={() => {}}
        hasMore={false}
        loader={<></>}> */}
          {data.map((item, index) => (
            <div 
              style={{
                flexBasis:'50%', 
                minHeight: '339px', 
                maxHeight: '568px',
                height: '100%',
                // paddingLeft: index%2 === 0 ? '0' : '3px',
                // paddingRight: index%2 === 0 ? '3px' : '0',
                display: 'flex',
                flexDirection: 'column',
              }}
              key={index}
            >
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width:'100%', aspectRatio: '1/1'}}>
                <Image
                  className={styles.img}
                  src={item.thumbnail}
                  alt='product image'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <div style={{padding: '12px 12px 0 12px'}}>
                <h2 className={`${styles.h2} ${styles.tagline}`}>{item.tagline}</h2>
                <h2 className={`${styles.h2} ${styles.title}`}>{item.title}</h2>
                <h2 className={`${styles.h2} ${styles.description}`}>{item.description}</h2>
                <h2 className={`${styles.h2} ${styles.colors}`}>{item.colors} Colour{item.colors > 1 ? 's' : ''}</h2>
                {item.discountPrice ? <h2 className={`${styles.h2} ${styles.price}`}>£{item.discountPrice} <span className={styles.oldPrice}>£{item.price}</span></h2>
                : 
                <h2 className={`${styles.h2} ${styles.price}`}>£{item.price}</h2>}
              </div>
            </div>
          ))}
      {/* </InfiniteScroll> */}
    </div>
  )
}

export default ProudctsInner