import type { Config } from "tailwindcss";
import { themeExtensions } from "./src/config/tailwind/theme-extensions";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

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
			...themeExtensions,
			colors: {
				...themeExtensions.colors,
				background: "var(--background)",
				foreground: "var(--foreground)",
				skeleton: "var(--skeleton)",
				'btn-border': "var(--btn-border)",
			},
			boxShadow: {
				...themeExtensions.boxShadow,
				input: [
					"0px 2px 3px -1px rgba(0, 0, 0, 0.1)",
					"0px 1px 0px 0px rgba(25, 28, 33, 0.02)",
					"0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
				].join(", "),
			},
			animation: {
				...themeExtensions.animation,
				ripple: "ripple 2s ease calc(var(--i, 0) * 0.2s) infinite",
				orbit: "orbit calc(var(--duration) * 1s) linear infinite",
			},
			keyframes: {
				...themeExtensions.keyframes,
				ripple: {
					"0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
					"50%": { transform: "translate(-50%, -50%) scale(0.9)" },
				},
				orbit: {
					"0%": {
						transform:
							"rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
					},
					"100%": {
						transform:
							"rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
					},
				}
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwindcss-rtl'),
		addVariablesForColors,
	],
} satisfies Config;
