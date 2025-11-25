/**
 * Animation timing constants
 * Centralized timing values for consistent animations across the app
 */

// Intro Animation
export const INTRO_ANIMATION = {
  TYPING_SPEED: 50, // ms per character
  PAUSE_AFTER_TYPING: 800, // ms
  LOGO_TRANSITION_DURATION: 1000, // ms
  BACKGROUND_SLIDE_DURATION: 800, // ms
} as const;

// Animated Intro Overlay
export const INTRO_OVERLAY = {
  STATIC_DURATION: 5000, // Initial wait time before word animation starts
  STAGGER_DELAY: 300, // Delay between each word start (ms)
  MOVE_DURATION: 0.8, // Duration for each word movement (seconds)
  FADE_OUT_DELAY: 200, // Delay before fadeout after last word arrives (ms)
} as const;

// Service Card Animations
export const SERVICE_CARD = {
  Y_OFFSET_HOVER: -30, // Upward movement on hover (px)
  Y_OFFSET_OTHER: 70, // Downward movement when other card hovered (px)
  Y_OFFSET_DEFAULT_B2C: 70, // Default offset for B2C card (px)
  HOVER_DURATION: 0.6, // Animation duration when hovering (seconds)
  DEFAULT_DURATION: 0.5, // Default animation duration (seconds)
  INITIAL_DURATION: 0.5, // Initial appearance animation duration (seconds)
} as const;

// About Section Animations
export const ABOUT_SECTION = {
  FADE_IN_DURATION: 0.8, // Title fade in duration (seconds)
  FADE_IN_DELAY: 0.1, // Title fade in delay (seconds)
  SCALE_DURATION: 0.3, // Divider scale duration (seconds)
  SCALE_DELAY: 0.1, // Divider scale delay (seconds)
} as const;
