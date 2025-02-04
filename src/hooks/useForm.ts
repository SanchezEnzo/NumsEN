import { RESPONSE_STATE } from '@/constants/responseState'
import getNewRandomNumber from '@/service/getRandomNumber'
import { isInputValid } from '@/service/isInputInvalid'
import { numberToText } from '@/service/numberToString'
import { FormEvent, useEffect, useRef, useState } from 'react'

export function useForm({
	number,
	changeNumber,
}: {
	number: number
	changeNumber: (number: number) => void
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	const [ response, updateResponse ] = useState(RESPONSE_STATE.INIT)

	function reseatToInitialValues() {
		updateResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log(isResponseChange.current, inputRef.current?.value)
		if (isResponseChange.current === inputRef.current?.value) return
		const response = inputRef.current?.value || ''

		if (!isInputValid(response)) return updateResponse(RESPONSE_STATE.INVALID)
		const isCorrect = numberToText(number) === response.trim().toLowerCase()
		

		console.log('llega aca?', isCorrect)
		updateResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
		isResponseChange.current = inputRef.current?.value

		if (isCorrect) {
			setTimeout(() => {
				changeNumber(getNewRandomNumber())
				reseatToInitialValues()
			}, 2500)
		}
	}
	useEffect(() => {
		if (response === RESPONSE_STATE.RIGHT || response === RESPONSE_STATE.INIT) return
		setTimeout(() => updateResponse(RESPONSE_STATE.INIT), 1200)
	}, [response, updateResponse])

	return {
		response,
		handleSubmit,
		inputRef,
		
		reseatToInitialValues,
	}
}
