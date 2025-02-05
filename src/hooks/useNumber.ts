import getNewRandomNumber from "@/service/getRandomNumber"
import { useState } from "react"

export function useNumber(){
	const [range, setRange] = useState<RangeProps>({ min: 1, max: 1000 })
	const [number, setNumber] = useState(
				() => getNewRandomNumber({ range })
	)
		interface RangeProps {
			min: number
			max: number
		}
	
	const changeNumber = (number: number) => setNumber(number)

	return { number, changeNumber, range, setRange }
}