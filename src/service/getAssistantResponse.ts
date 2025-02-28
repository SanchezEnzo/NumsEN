	export function getAssistantResponse(response: string, numberText: string) {
		const responseArray = response.split('')
		const numberTextArray = numberText.split('')

		// Generar el splitResponse con la comparación de caracteres
		const splitResponse: [string, boolean][] = responseArray.map(
			(char, index) => [
				char,
				char === ' ' || (char !== ' ' && char === numberTextArray[index]),
			]
		)

		return splitResponse
	}