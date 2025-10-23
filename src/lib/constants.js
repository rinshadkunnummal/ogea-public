// Shared animation configurations
export const fadeInUpVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
}

// Common transition settings
export const easeOutTransition = {
  duration: 0.6,
  ease: "easeOut"
}

// Stat configuration
export const STAT_CONFIG = {
  DURATION: 1.5,
  DELAY_MULTIPLIER: 0.1
}
