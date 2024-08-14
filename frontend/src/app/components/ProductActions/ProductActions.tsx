import React, { useEffect, useRef, useState } from 'react'
import styles from './ProductActions.module.css'
import useInView from '@/app/utils/hooks'

const ProductActions = () => {
  const availableSizes = [
    'xs', 's', 'm', 'l', 'xl', 'xxl'
  ]
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [sizeNotSelectedError, setSizeNotSelectedError] = useState<boolean>(false)
  const [divRef, isDivInView] = useInView<HTMLDivElement>({
    threshold: 0.45, // % of the element that should be visible
  });
  const sizesDiv = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  
  useEffect(() => {
    selectedSize && setSizeNotSelectedError(false)
  }, [selectedSize])

  useEffect(() => {
    sizeNotSelectedError ? 
      sizesDiv.current?.classList.add(styles.error) : sizesDiv.current?.classList.remove(styles.error)
  }, [sizeNotSelectedError])

  const handleAddToBag = () => {
    if (selectedSize) {

    }
    else {
      !isDivInView && divRef.current?.scrollIntoView({behavior: 'smooth'})
      setSizeNotSelectedError(true)
    }
  }

  const handleSizeSelect = (size:string) => {
    setSelectedSize(size)
  }


  return (
    <div className={styles.container}>
      <div className={styles.productSizesContainer}>
        <h2 className={sizeNotSelectedError ? styles.error : ''}>Select Size</h2>
        <div ref={sizesDiv} className={styles.sizesBtnContainer}>
          {availableSizes.map((item) => (
            <button 
              key={item}
              className={`${styles.sizeBtn} ${selectedSize === item && styles.sizeBtnActive}`}
              // style={{borderColor: selectedSize === item ? 'var(--text-primary)' : 'var(--text-tertiary)'}}
              onClick={() => handleSizeSelect(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        {sizeNotSelectedError &&
         <h2 className={styles.error}>Please select a size.</h2>
        }
      </div>
      {loaded &&
        <div className={styles.containerCTA} ref={divRef}>
          { !isDivInView &&
            <button 
              className={`${styles.btnCTA} ${styles.bagBtnFixed}`}
              onClick={handleAddToBag}
            >
            Add to Bag
            </button>
          }
          <button 
            className={`${styles.btnCTA} ${styles.bagBtn} ${isDivInView && styles.bagBtnInView}`}
            onClick={handleAddToBag}
          >
            Add to Bag
          </button>
          <button className={`${styles.btnCTA} ${styles.favBtn}`}>
            Favourite
          </button>
        </div>
      }
    </div>
  )
}

export default ProductActions