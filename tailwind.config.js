/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				geist: ['Geist-Medium', 'sans-serif'],
			},
			colors: {
				background: 'var(--background)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
				text: 'var(--text)',
				placeholder: 'var(--placeholder)',
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
				modalBg: 'var(--modal-background)',
			},
			animation: {
				shakeHorizontal:
					'shakeHorizontal 0.82s cubic-bezier(.36,.07,.19,.97) both',
				shakeVertical: 'shakeVertical 1.2s ease-in-out both',
				shine: 'shine var(--duration) infinite linear',
			},
			keyframes: {
				shakeHorizontal: {
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
				shakeVertical: {
					'0%': {
						transform: 'translateY(0)',
					},
					'20%': {
						transform: 'translateY(-5px)',
					},
					'40%': {
						transform: 'translateY(5px)',
					},
					'60%': {
						transform: 'translateY(-3px)',
					},
					'80%': {
						transform: 'translateY(3px)',
					},
					'100%': {
						transform: 'translateY(0)',
					},
				},
				shine: {
					'0%': {
						'background-position': '0% 0%',
					},
					'50%': {
						'background-position': '100% 100%',
					},
					to: {
						'background-position': '0% 0%',
					},
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
