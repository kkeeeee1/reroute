import { useEffect, useCallback } from 'react';

interface ScrollLockOptions {
  /**
   * Whether scroll lock is active
   */
  enabled: boolean;
}

/**
 * Hook to lock/unlock page scroll
 * @param options - Configuration options
 */
export function useScrollLock({ enabled }: ScrollLockOptions): void {
  const lockScroll = useCallback(() => {
    const html = document.documentElement;
    const body = document.body;
    
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = '0';
  }, []);

  const unlockScroll = useCallback(() => {
    const html = document.documentElement;
    const body = document.body;
    
    html.style.overflow = '';
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
  }, []);

  useEffect(() => {
    if (enabled) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Cleanup on unmount
    return () => {
      unlockScroll();
    };
  }, [enabled, lockScroll, unlockScroll]);
}
