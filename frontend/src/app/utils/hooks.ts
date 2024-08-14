import { useEffect, useRef, useState, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 }
): [RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [ref, isIntersecting];
}

export default useInView;
