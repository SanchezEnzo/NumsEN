export const isInputValid = (response: string): boolean => {
	return /^[a-zA-Z\s-]+$/.test(response.trim())
}
