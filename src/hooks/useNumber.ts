import getNewRandomNumber from "@/service/getRandomNumber"
import { useState } from "react"

	export interface RangeProps {
		min: number
		max: number
	}
export function useNumber(){
	const [range, setRange] = useState<RangeProps>({ min: 1, max: 1000 })
	const [number, setNumber] = useState(
				() => getNewRandomNumber({ range })
	)

	
	const changeNumber = (number: number) => setNumber(number)

	return { number, changeNumber, range, setRange }
}