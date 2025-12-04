import { useEffect, useState, RefObject } from 'react';

interface UseInViewOptions {
  /**
   * Element to observe
   */
  ref: RefObject<HTMLElement | Element | null>;
  /**
   * IntersectionObserver threshold
   * @default 0.4
   */
  threshold?: number;
  /**
   * Only trigger once
   * @default true
   */
  once?: boolean;
}

/**
 * Hook to detect when an element is in viewport
 * @param options - Configuration options
 * @returns boolean indicating if element is in view
 */
export function useInView({
  ref,
  threshold = 0.4,
  once = true,
}: UseInViewOptions): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, once]);

  return isInView;
}
