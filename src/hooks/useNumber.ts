import { useState } from "react"

export function useNumber(){
	const [number, setNumber] = useState(
				() => Math.floor(Math.random() * 9) + 1
	)
	
	const changeNumber = (number: number) => setNumber(number)
	return { number, changeNumber }
}