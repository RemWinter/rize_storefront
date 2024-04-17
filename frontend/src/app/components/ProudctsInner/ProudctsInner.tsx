'use client'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './ProductsInner.module.css'
import Image from 'next/image'

const ProudctsInner = () => {
  const data = [
    {
      tagline: '',
      title: 'Nike Sportswear Club Fleece',
      description: "Men's Full-Zip Hoodie",
      colors: 4,
      price: 69.99,
      discountPrice: null,
      thumbnail: '/nike1.jpeg'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Club Fleece',
      description: 'Pullover Hoodie',
      colors: 1,
      price: 59.99,
      discountPrice: null,
      thumbnail: '/nike2.png'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 3,
      price: 109.99,
      discountPrice: 76.99,
      thumbnail: '/nike3.jpeg'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 5,
      price: 109.99,
      discountPrice: 54.99,
      thumbnail: '/nike4.png'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 3,
      price: 109.99,
      discountPrice: 76.99,
      thumbnail: '/nike3.jpeg'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 5,
      price: 109.99,
      discountPrice: 54.99,
      thumbnail: '/nike4.png'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 3,
      price: 109.99,
      discountPrice: 76.99,
      thumbnail: '/nike3.jpeg'
    },
    {
      tagline: 'BestSeller',
      title: 'Nike Sportswear Tech Fleece Windrunner',
      description: "Men's Full-Zip Hoodie",
      colors: 5,
      price: 109.99,
      discountPrice: 54.99,
      thumbnail: '/nike4.png'
    },
  ]
  return (
    <div className={styles.container}>
      {/* <InfiniteScroll
        style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}
        dataLength={10}
        next={() => {}}
        hasMore={false}
        loader={<></>}> */}
          {data.map((item, index) => (
            <div style={{
              flexBasis:'50%', 
              minHeight: '339px', 
              maxHeight: '568px',
              height: '100%',
              // paddingLeft: index%2 === 0 ? '0' : '3px',
              // paddingRight: index%2 === 0 ? '3px' : '0',
              marginBottom: '18px',
              display: 'flex',
              flexDirection: 'column',
            }}>
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
                <h2 className={`${styles.h2} ${styles.price}`}>{item.price}</h2>
              </div>
            </div>
          ))}
      {/* </InfiniteScroll> */}
    </div>
  )
}

export default ProudctsInner