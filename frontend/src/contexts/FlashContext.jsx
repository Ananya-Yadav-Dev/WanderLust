import { createContext, useState, useCallback } from 'react';

export const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState({ message: '', type: '' });

  const showFlash = useCallback((message, type = 'success') => {
    setFlash({ message, type });
    setTimeout(() => {
      setFlash({ message: '', type: '' });
    }, 5000);
  }, []);

  const clearFlash = useCallback(() => {
    setFlash({ message: '', type: '' });
  }, []);

  const value = {
    flash,
    showFlash,
    clearFlash
  };

  return (
    <FlashContext.Provider value={value}>
      {children}
    </FlashContext.Provider>
  );
};
