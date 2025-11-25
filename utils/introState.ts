/**
 * Intro animation state management utility
 * Centralizes sessionStorage access for intro animation state
 */

const INTRO_STORAGE_KEY = 'introAnimationPlayed';

/**
 * Intro animation state manager
 */
export const introState = {
  /**
   * Clear the intro played flag (call when intro starts on refresh)
   */
  clear: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(INTRO_STORAGE_KEY);
    }
  },

  /**
   * Mark that intro animation has completed
   */
  markComplete: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    }
  },

  /**
   * Check if intro animation has played in this session
   * @returns true if intro has played, false otherwise
   */
  hasPlayed: (): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true';
  },
};
