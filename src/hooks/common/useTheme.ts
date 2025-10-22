import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const loadTheme = async () => {
    const saved = await getItemAsync('theme');
    if (saved) {
      setColorScheme(saved as 'light' | 'dark');
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme);
    await setItemAsync('theme', newTheme);
  };

  return {
    isDark: colorScheme === 'dark',
    toggleTheme,
  };
};
