import { RESPONSE_STATE } from '@/constants/responseState'
import getNewRandomNumber from '@/service/getRandomNumber'
import { isInputValid } from '@/service/isInputInvalid'
import { numberToText } from '@/service/numberToString'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRange } from './useRange'

export function useForm({
	number,
	changeNumber,
}: {
	number: number
	changeNumber: (number: number) => void
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	const [response, updateResponse] = useState(RESPONSE_STATE.INIT)
	const { range } = useRange()

	function reseatToInitialValues() {
		updateResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (isResponseChange.current === inputRef.current?.value) return
		isResponseChange.current = inputRef.current?.value

		const response = inputRef.current?.value || ''
		if (!isInputValid(response)) return updateResponse(RESPONSE_STATE.INVALID)
		const isCorrect = numberToText(number) === response.trim().toLowerCase()

		updateResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
		
		if (isCorrect) {
			setTimeout(() => {
				changeNumber(getNewRandomNumber({range}))
				reseatToInitialValues()
			}, 2500)
		}
	}
	useEffect(() => {
		if (response === RESPONSE_STATE.INIT) return
		if (response === RESPONSE_STATE.RIGHT) setTimeout(() => updateResponse(RESPONSE_STATE.INIT), 2500)
		setTimeout(() => updateResponse(RESPONSE_STATE.INIT), 1800)
	}, [response, updateResponse])

	return {
		response,
		handleSubmit,
		inputRef,
		
		reseatToInitialValues,
	}
}
