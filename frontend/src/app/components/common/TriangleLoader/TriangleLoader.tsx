import { Modal } from '@mui/material';
import React from 'react'
import { Triangle } from 'react-loader-spinner';
import styles from './TriangleLoader.module.css'

interface TriangleLoaderProps {
  open:boolean;
  onClose: () => void;
  loaderText?: string;
  loaderTextColor?: string;
  loaderColor?: string;
}

const TriangleLoader: React.FC<TriangleLoaderProps> = ({open, onClose, loaderText, loaderTextColor, loaderColor}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
          <Triangle
            visible={open}
            height="80"
            width="80"
            color={loaderColor ? loaderColor : "#4fa94d"}
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p 
            className={styles.loaderText} 
            style={{color: loaderTextColor ? loaderTextColor : 'var(--text-primary)' }}>
              {loaderText ? loaderText : 'Loading...'}
          </p>
        </div>
    </Modal>
  )
}

export default TriangleLoader