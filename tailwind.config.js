/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'brand-green': '#22D486',
				'brand-black': '#323C46',
				error: '#F40000',
				tertiary: '#A7A7B9',
			},
			textColor: {
				primary: '#000000',
				secondary: '#72727B',
				'primary-white': '#FFFFFF',
			},
			backgroundColor: {
				primary: '#F9F9FB',
				secondary: '#FFFFFF',
				disabled: '#E4E4EA',
				error: '#F40000',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
