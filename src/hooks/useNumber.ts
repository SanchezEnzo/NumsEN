import getNewRandomNumber from "@/service/getRandomNumber"
import { useState } from "react"
import { useRange } from "./useRange"


export function useNumber () {
	const {range} = useRange()
	const [number, setNumber] = useState(
				() => getNewRandomNumber({ range })
	)
	const changeNumber = (number: number) => setNumber(number)

	return { number, changeNumber }
}