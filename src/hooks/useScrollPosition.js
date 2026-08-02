import { useEffect, useState } from 'react';

export function useScrollPosition(threshold = 16) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > threshold);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, [threshold]);

  return hasScrolled;
}
