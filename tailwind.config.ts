import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class", "dark"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "#1f6feb",
					foreground: "#ffffff",
				},
				secondary: {
					DEFAULT: "#f1f5f9",
					foreground: "#0f172a",
				},
				destructive: {
					DEFAULT: "#ef4444",
					foreground: "#ffffff",
				},
				muted: "#f4f4f5",
				card: "#ffffff",
				"card-foreground": "#0f172a",
				accent: "#f8fafc",
				"accent-foreground": "#0f172a",
				ring: "#1f6feb",
				input: "#e2e8f0",
			},
			borderRadius: {
				lg: "0.5rem",
				md: "0.375rem",
				sm: "0.25rem",
			},
		},
	},
	plugins: [],
};

export default config;


