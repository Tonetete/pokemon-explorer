import { useCallback } from 'react'

/**
 * useScrollToY - Custom hook to scroll to a specific Y position smoothly.
 * @param {number} defaultY - Optional default Y position to scroll to.
 * @param {boolean} smooth - Whether to enable smooth scrolling (default: true).
 * @returns {Function} - Function to trigger the scroll effect.
 */
export function useScrollToY(defaultY: number = 0, smooth: boolean = true) {
  const scrollToY = useCallback(
    (y: number = defaultY) => {
      if (typeof window === 'undefined') return

      requestAnimationFrame(() => {
        window.scrollTo({
          top: y,
          behavior: smooth ? 'smooth' : 'instant',
        })
      })
    },
    [defaultY, smooth]
  )

  return scrollToY
}
