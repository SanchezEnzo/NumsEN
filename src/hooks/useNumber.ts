import { useState } from "react";

export function useNumber () {
	const [number, setNumber] = useState(() => Math.floor(Math.random() * 9) + 1)

	function generateNumber() {
		setNumber(Math.floor(Math.random() * 999) + 1)
	}

	return {number, generateNumber}
	

}