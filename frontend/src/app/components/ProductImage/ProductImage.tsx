import React from 'react'
import Image from 'next/image'
import styles from './ProductImage.module.css'
import { data } from '@/app/api/dummyData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination, Scrollbar, FreeMode } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

const ProductImage = () => {
  return (
    <Swiper 
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper:any) => console.log(swiper)}
        mousewheel={{
          forceToAxis: true
        }}
        scrollbar={{
          hide: true,
        }}
        freeMode={{
          sticky: true,
          momentumBounce: true,
          momentumBounceRatio: 0.1,
          momentumRatio: 0.5,
          momentumVelocityRatio: 0.5,
          minimumVelocity: 0.1,
          
        }}
        // pagination={{
        //   type: 'fraction',
        // }}
        modules={[Mousewheel, Scrollbar, Pagination, FreeMode]}>
        {data.map((item) => (
          <SwiperSlide key={item.title}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width:'100%', aspectRatio: '1/1.25', marginTop: '15px'}}>
          <Image
            className={styles.img}
            // src={'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/c9895524-274f-46d7-88c3-0470f6ec5d52/M+NK+TCH+FLC+FZ+WR+HDY+MAX+VOL.png'}
            src={item.thumbnail}
            alt='product image'
            layout='fill'
            objectFit='cover'
          />

          </div>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default ProductImage