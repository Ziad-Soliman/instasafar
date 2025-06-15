
import { colors } from './colors';
import { keyframes, animation } from './animations';

export const themeExtensions = {
  colors,
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)'
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    cairo: ['Cairo', 'sans-serif'],
    tajawal: ['Tajawal', 'sans-serif'],
    arabic: ['Cairo', 'Tajawal', 'sans-serif'],
  },
  maxWidth: {
    container: "80rem",
  },
  keyframes,
  animation,
  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    'saudi-gradient': 'linear-gradient(135deg, hsl(140, 100%, 20%) 0%, hsl(140, 50%, 45%) 100%)',
    'saudi-gradient-light': 'linear-gradient(135deg, hsl(140, 50%, 45%) 0%, hsl(140, 30%, 70%) 100%)'
  },
  boxShadow: {
    'shadow-500': '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'shadow-100': '0px 5px 14px rgba(112, 144, 176, 0.08)',
    'saudi': '0 4px 14px 0 hsl(140, 100%, 20%, 0.15)',
    'saudi-lg': '0 10px 25px -3px hsl(140, 100%, 20%, 0.2), 0 4px 6px -2px hsl(140, 100%, 20%, 0.05)',
    'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    'elevated': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
    'floating': '0 16px 48px 0 rgba(0, 0, 0, 0.18)',
    glow: "0 -16px 128px 0 hsla(var(--brand-foreground) / 0.5) inset, 0 -16px 32px 0 hsla(var(--brand) / 0.5) inset",
  },
};
