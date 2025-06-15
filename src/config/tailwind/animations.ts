
export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' }
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' }
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' }
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' }
  },
  'fade-in-up': {
    from: { 
      opacity: '0',
      transform: 'translateY(20px)'
    },
    to: { 
      opacity: '1',
      transform: 'translateY(0)'
    }
  },
  'slide-in-from-right': {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' }
  },
  'slide-out-to-left': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-100%)' }
  },
  'slide-in-from-left': {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' }
  },
  'slide-out-to-right': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(100%)' }
  },
  'slide-in-from-top': {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' }
  },
  'slide-in-from-bottom': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' }
  },
  'scale-in': {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' }
  },
  'scale-out': {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.95)', opacity: '0' }
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' }
  },
  'bounce-gentle': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-5px)' }
  },
  'shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
  'pulse-saudi': {
    '0%, 100%': { 
      boxShadow: '0 0 0 0 hsl(140, 100%, 20%, 0.7)' 
    },
    '70%': { 
      boxShadow: '0 0 0 10px hsl(140, 100%, 20%, 0)' 
    }
  },
  aurora: {
    from: {
      backgroundPosition: "50% 50%, 50% 50%",
    },
    to: {
      backgroundPosition: "350% 50%, 350% 50%",
    },
  },
};

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'fade-in': 'fade-in 0.3s ease-out',
  'fade-out': 'fade-out 0.3s ease-in',
  'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
  'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
  'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
  'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
  'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
  'slide-out-to-left': 'slide-out-to-left 0.3s ease-in',
  'slide-out-to-right': 'slide-out-to-right 0.3s ease-in',
  'scale-in': 'scale-in 0.5s ease-out forwards',
  'scale-out': 'scale-out 0.2s ease-in',
  'float': 'float 6s ease-in-out infinite',
  'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
  'shimmer': 'shimmer 2s linear infinite',
  'pulse-saudi': 'pulse-saudi 2s infinite',
  aurora: "aurora 60s linear infinite",
};
