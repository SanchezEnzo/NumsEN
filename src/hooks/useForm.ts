import { RESPONSE_STATE } from "@/constants/responseState"
import getNewRandomNumber from "@/service/getRandomNumber"
import { isInputValid } from "@/service/isInputInvalid"
import { numberToText } from "@/service/numberToString"
import { FormEvent, useRef, useState } from "react"

export function useForm ({number, changeNumber}: {number: number, changeNumber: (number: number) => void}) {
		const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	
	
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
					changeNumber(getNewRandomNumber())
				}, 2500)
			}
	}

	const updateResponse = (response: RESPONSE_STATE) => setResponse(response)
	
	return {
		response,
		updateResponse,
		handleSubmit,
		inputRef,
	}
}