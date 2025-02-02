const units = [
	'',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
]
const teens = [
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
]
const tens = [
	'',
	'ten',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
]
const hundreds = [
	'',
	'one hundred',
	'two hundred',
	'three hundred',
	'four hundred',
	'five hundred',
	'six hundred',
	'seven hundred',
	'eight hundred',
	'nine hundred',
]

export function numberToText(num: number): string {
	if (num === 0) return 'zero'
	if (num === 10000000) return 'ten million'

	function convertHundreds(n: number): string {
		if (n === 0) return ''
		if (n < 10) return units[n]
		if (n >= 11 && n <= 19) return teens[n - 11]
		if (n < 100) {
			return `${tens[Math.floor(n / 10)]}${
				n % 10 !== 0 ? '-' + units[n % 10] : ''
			}`
		}
		return `${hundreds[Math.floor(n / 100)]}${
			n % 100 !== 0 ? ' and ' + convertHundreds(n % 100) : ''
		}`
	}

	function convertThousands(n: number): string {
		if (n < 1000) return convertHundreds(n)
		const thousands = Math.floor(n / 1000)
		const remainder = n % 1000
		return `${convertHundreds(thousands)} thousand${
			remainder !== 0 ? ' ' + convertHundreds(remainder) : ''
		}`
	}

	function convertMillions(n: number): string {
		if (n < 1000000) return convertThousands(n)
		const millions = Math.floor(n / 1000000)
		const remainder = n % 1000000
		return `${convertHundreds(millions)} million${
			remainder !== 0 ? ' ' + convertThousands(remainder) : ''
		}`
	}

	return convertMillions(num)
}


