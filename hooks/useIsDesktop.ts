import { BREAKPOINTS } from '@/constants/breakpoints';
import { useMediaQuery } from './useMediaQuery';

/**
 * Hook to detect if viewport is desktop size (>= md breakpoint)
 * @returns boolean indicating if viewport is desktop size
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
}
