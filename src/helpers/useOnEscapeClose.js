import { useEffect, useCallback } from 'react';

export const useOnEscapeClose = (handler) => {
  const handleKeyPress = useCallback(
    (e) => {
      // Toggle open if escape or tab key is pressed
      if (e.keyCode === 9 || e.keyCode === 27) return handler();
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
};
