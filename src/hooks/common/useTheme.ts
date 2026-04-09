import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

import { storage } from '@/utils/storage';

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const loadTheme = () => {
    const saved = storage.getString('theme');
    if (saved) {
      setColorScheme(saved as 'light' | 'dark');
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    storage.set('theme', newTheme);
  };

  return {
    isDark: colorScheme === 'dark',
    toggleTheme,
  };
};
