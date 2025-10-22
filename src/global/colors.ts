import { black, neutral, transparent, white } from 'tailwindcss/colors';

export const colors = {
  primary: {
    400: '#6366F1',
    500: '#4F46E5',
    600: '#4338CA',
  },
  alert: {
    success: '#10B981',
    error: '#EF4444',
  },
  neutral,
  white,
  black,
  transparent,
} as const;
