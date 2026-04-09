import { black, neutral, transparent, white } from 'tailwindcss/colors';

export const colors = {
  primary: {
    300: '#726BEA',
    400: '#6159E8',
    500: '#4F46E5',
    700: '#473FCE',
  },
  alert: {
    success: '#10B981',
    error: '#EF4444',
  },
  lightBackground: '#EEEEEE',
  neutral,
  white,
  black,
  transparent,
} as const;
