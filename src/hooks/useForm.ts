import { RESPONSE_STATE } from '@/constants/responseState'
import getNewRandomNumber from '@/service/getRandomNumber'
import { isInputValid } from '@/service/isInputInvalid'
import { numberToText } from '@/service/numberToString'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRange } from './useRange'
import { useAssistant } from './useAssistant'
import { POWER_STATES } from '@/components/ui/PowerButton'

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
	const {assistant, updateSplitResponse,} = useAssistant()

	function reseatToInitialValues() {
		updateResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
		isResponseChange.current = ' '
	}

	function getSplitResponse({response, number}: {response: string, number: string}) {
		const responseArray = response.split('')
		const numberArray = number.split('')
		const correctChars = responseArray.filter((char, index) => char === numberArray[index])
		return [correctChars.join(''), responseArray.slice(correctChars.length).join('')]
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// Check if response changed
		if (isResponseChange.current === inputRef.current?.value) return
		isResponseChange.current = inputRef.current?.value
		const response = inputRef.current?.value || ''

		// Check if response is valid
		if (!isInputValid(response)) return updateResponse(RESPONSE_STATE.INVALID)
		
		// Check if response is correct
		const numberInText = numberToText(number)
		const tunedResponse = response.trim().toLowerCase()
		const isCorrect = numberInText === tunedResponse
		updateResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
		
		// Change number if response is correct
		if (isCorrect) {
			setTimeout(() => {
				changeNumber(getNewRandomNumber({range}))
				reseatToInitialValues()
			}, 2500)
		} else {
			if (assistant === POWER_STATES.ON) {
				const [correctChars, wrongChars] = getSplitResponse({
					response: tunedResponse,
					number: numberInText,
				})
				updateSplitResponse([correctChars, wrongChars])
			}
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
