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
					primary: 'var(--outline-primary)',
					secondary: 'var(--outline-secondary)',
				},
			},
			animation: {
				shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
			},
			keyframes: {
				shake: {
					'10%, 90%': {
						transform: 'translate3d(-1px, 0, 0)',
					},
					'20%, 80%': {
						transform: 'translate3d(2px, 0, 0)',
					},
					'30%, 50%, 70%': {
						transform: 'translate3d(-4px, 0, 0)',
					},
					'40%, 60%': {
						transform: 'translate3d(4px, 0, 0)',
					},
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
