import { Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '../components/redux/store';
import { setDimensions } from '../components/redux/globalSlice';
import { useEffect } from 'react';

// export const updateViewportDimensions = (dispatch: Dispatch) => {
//   const handleResize = () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     dispatch(setDimensions({ x: width, y: height }));
//   };

//   // Set dimensions on page load
//   handleResize();

//   // Update dimensions on resize
//   window.addEventListener('resize', handleResize);

//   // Cleanup the event listener on unmount
//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// };





export const useWindowDimensions = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const dimension = { x: window.innerWidth, y: window.innerHeight };
      dispatch(setDimensions(dimension));
    };

    // Set initial dimensions
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
};
