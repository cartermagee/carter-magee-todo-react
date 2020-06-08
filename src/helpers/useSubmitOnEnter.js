import { useEffect } from 'react';

export const useSubmitOnEnter = (handler, condition) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // submit if enter key pressed
      if (condition) {
        if (e.keyCode === 13) return handler();
      } else if (e.keyCode === 13) return handler();
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
};
