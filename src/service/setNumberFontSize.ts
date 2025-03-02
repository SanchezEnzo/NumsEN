export const setNumberFontSize = (number: number) => {
	const numberLenght = number.toString().length
	switch (numberLenght) {
		case 4:
		case 5:
			return 'max-sm:text-[7rem]'
		case 6:
			return 'max-sm:text-[6rem]'
		case 7:
		case 8:
			return 'max-sm:text-[5rem]'
		default:
			return
	}
}
