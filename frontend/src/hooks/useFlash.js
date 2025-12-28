import { useContext } from 'react';
import { FlashContext } from '../contexts/FlashContext';

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};
