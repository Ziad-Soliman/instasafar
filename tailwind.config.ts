
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced Saudi Green Color Palette
				'saudi-green': {
					DEFAULT: 'hsl(140, 100%, 20%)', // #006C35
					50: 'hsl(140, 100%, 96%)',
					100: 'hsl(140, 100%, 90%)',
					200: 'hsl(140, 100%, 80%)',
					300: 'hsl(140, 100%, 70%)',
					400: 'hsl(140, 100%, 50%)',
					500: 'hsl(140, 100%, 30%)',
					600: 'hsl(140, 100%, 20%)', // Main Saudi Green
					700: 'hsl(140, 100%, 15%)',
					800: 'hsl(140, 100%, 12%)',
					900: 'hsl(140, 100%, 8%)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-in',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
				'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
				'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
				'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
				'slide-out-to-left': 'slide-out-to-left 0.3s ease-in',
				'slide-out-to-right': 'slide-out-to-right 0.3s ease-in',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-in',
				'float': 'float 6s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-saudi': 'pulse-saudi 2s infinite'
			},
			fontFamily: {
				arabic: ['var(--font-arabic)', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'saudi-gradient': 'linear-gradient(135deg, hsl(140, 100%, 20%) 0%, hsl(140, 50%, 45%) 100%)',
				'saudi-gradient-light': 'linear-gradient(135deg, hsl(140, 50%, 45%) 0%, hsl(140, 30%, 70%) 100%)'
			},
			boxShadow: {
				'saudi': '0 4px 14px 0 hsl(140, 100%, 20%, 0.15)',
				'saudi-lg': '0 10px 25px -3px hsl(140, 100%, 20%, 0.2), 0 4px 6px -2px hsl(140, 100%, 20%, 0.05)',
				'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
				'elevated': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
				'floating': '0 16px 48px 0 rgba(0, 0, 0, 0.18)',
			},
			backgroundPattern: {
				'dots': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
				'grid': 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwindcss-rtl'),
	],
} satisfies Config;
