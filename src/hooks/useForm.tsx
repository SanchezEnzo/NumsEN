import { RESPONSE_STATE } from '@/constants/responseState'
import { isInputValid } from '@/service/isInputInvalid'
import { numberToText } from '@/service/numberToString'
import { FormEvent, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRange } from './useRange'
import { useAssistant } from './useAssistant'
import { POWER_BUTTON_STATES } from '@/components/ui/PowerToggleButton'
import { useResponse } from './useResponse'
import { getAssistantResponse } from '@/service/getAssistantResponse'
import getRandomNumber from '@/service/getRandomNumber'

export function useForm({
	number,
	changeNumber,
}: {
	number: number
	changeNumber: (number: number) => void
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const isResponseChange = useRef(inputRef.current?.value)
	const { response, updateResponse } = useResponse()
	const { range } = useRange()
	const { assistant, updateAssistantResponse } = useAssistant()

	const reseatFormValues = useCallback(() => {
		updateResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
		isResponseChange.current = ' '
	}, [updateResponse])

	const numberInText = useMemo(() => numberToText(number), [number])

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// Check if response changed
		if (isResponseChange.current === inputRef.current?.value) return
		isResponseChange.current = inputRef.current?.value
		const response = inputRef.current?.value || ''

		// Check if response is valid
		if (!isInputValid(response)) return updateResponse(RESPONSE_STATE.INVALID)
		
		// Check if response is correct
		const tunedResponse = response.trim().toLowerCase()
		const isCorrect = numberInText === tunedResponse

		// update response
		updateResponse(isCorrect ? RESPONSE_STATE.RIGHT : RESPONSE_STATE.WRONG)
		
		// Split response if assistant is on
		if (assistant === POWER_BUTTON_STATES.ON) {
			if (inputRef.current) {
				inputRef.current.placeholder = ''
			}
			updateAssistantResponse(getAssistantResponse(tunedResponse, numberInText))
		}
	}

	useEffect(() => {
		if (response === RESPONSE_STATE.INIT) return
		if (response === RESPONSE_STATE.RIGHT) {
			setTimeout(() => {
				updateResponse(RESPONSE_STATE.INIT)
				changeNumber(getRandomNumber({range}))
				reseatFormValues()
			}, 2500)
		}
		setTimeout(() => updateResponse(RESPONSE_STATE.INIT), 1800)
	}, [
		response,
		updateResponse,
		changeNumber,
		range,
		reseatFormValues,
	])

	return {
		response,
		handleSubmit,
		inputRef,
		reseatFormValues,
	}
}
