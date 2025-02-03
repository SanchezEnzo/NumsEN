/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			// borderRadius: {
			// 	lg: 'var(--radius)',
			// 	md: 'calc(var(--radius) - 2px)',
			// 	sm: 'calc(var(--radius) - 4px)'
			// },
			colors: {
				background: 'var(--background)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
				// input: 'var(--input)',
				text: 'var(--text)',
				button: {
					primary: 'var(--button-primary)',
					secondary: 'var(--button-secondary)',
				},
				buttonText: {
					primary: 'var(--buttonText-primary)',
					secondary: 'var(--buttonText-secondary)',
				},
				outline: {
					primary:'var(--outline-primary)',
					secondary:'var(--outline-secondary)'
				}
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
