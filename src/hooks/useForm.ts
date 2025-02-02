import { RESPONSE_STATE } from "@/constants/responseState"
import getNewRandomNumber from "@/service/getRandomNumber"
import { isInputValid } from "@/service/isInputInvalid"
import { numberToText } from "@/service/numberToString"
import { FormEvent, useRef, useState } from "react"

export function useForm () {
		const inputRef = useRef<HTMLInputElement>(null)
		const isResponseChange = useRef(inputRef.current?.value)
		const [number, setNumber] = useState(
			() => Math.floor(Math.random() * 9) + 1
		)
	const [response, setResponse] = useState<RESPONSE_STATE>(RESPONSE_STATE.INIT)
	
		function handleSubmit(e: FormEvent<HTMLFormElement>) {
			e.preventDefault()
			if (isResponseChange.current === inputRef.current?.value) return
			const response = inputRef.current?.value || ''
	
			if (!isInputValid(response)) return setResponse(RESPONSE_STATE.INVALID)
			const isCorrect = numberToText(number) === response.trim().toLowerCase()
			setResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
			isResponseChange.current = inputRef.current?.value
	
			if (isCorrect) {
				setTimeout(() => {
					setNumber(getNewRandomNumber())
				}, 2500)
			}
	}

	const updateResponse = (response: RESPONSE_STATE) => setResponse(response)
	const changeNumber = (number: number) => setNumber(number)
	
	return {
		number,
		response,
		updateResponse,
		changeNumber,
		handleSubmit,
		inputRef,
	}
}